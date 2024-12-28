import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import StatusContext from "@/contexts/Statuses";
import DateTime from "./DateTime";
import OverallStatus from "./OverallStatus";
import ItemizedStatus from "./ItemizedStatus";
import HiddenItems from "./HiddenItems";
import { filterData } from "@/lib/filter";
import logger from "@/lib/logger";

function readHiddenItems(): Components {
  const hiddenItems = localStorage.getItem("HIDDEN_ITEMS");
  if (hiddenItems === null) return {};
  const parsed = JSON.parse(hiddenItems) as string[];

  const components: Components = {};
  parsed.map(
    (serviceName) =>
      (components[serviceName] = { status: "healthy", message: "" }),
  );

  return components;
}

type Props = {
  data: ServicesHealth | null;
  error: string | null;
  loading: boolean;
  paused: boolean;
};

function ServiceMonitor({ data, error: err, loading, paused }: Props) {
  const [error, setError] = useState<string>("");
  const [oldTimestamp, setOldTimestamp] = useState<number>(Date.now());
  const [currentStatus, setCurrentStatus] = useState(data);
  const [previousStatus, setPreviousStatus] = useState<ServicesHealth | null>(
    null,
  );
  const [hiddenItems, setHiddenItems] = useState<Components>({});

  // Prevent rerender loop since this runs before the useEffect
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  useEffect(() => {
    if (searchParams.size === 0) return;
    console.log("Found a query string", searchParams);
  }, [searchParams]);

  // Using layout effect to avoid a hidden items section from popping in late
  useLayoutEffect(() => setHiddenItems(readHiddenItems()), []);

  useEffect(() => {
    if (err) return setError(err);
    setError("");
    setPreviousStatus(currentStatus);
    setCurrentStatus(data);
    setOldTimestamp(Date.now());
  }, [data, err, currentStatus]);

  const filteredData = useMemo(
    () => filterData(currentStatus, hiddenItems),
    [currentStatus, hiddenItems],
  );

  const addHiddenItem = (serviceNames: string[]) => {
    if (currentStatus === null) return;

    logger(`Adding ${serviceNames}`);
    serviceNames.map((serviceName) => {
      if (hiddenItems[serviceName] !== undefined) return;
      const newComponent = currentStatus.components[serviceName];

      setHiddenItems((old) => {
        const newState = { ...old, [serviceName]: newComponent };
        const keys = Object.keys(newState);
        localStorage.setItem("HIDDEN_ITEMS", JSON.stringify(keys));
        return newState;
      });
    });
  };

  const removeHiddenItem = (serviceNames: string[]) => {
    if (currentStatus === null) return;
    if (serviceNames.length === 0) {
      logger(`Removing all hidden items ${serviceNames}`);
      localStorage.removeItem("HIDDEN_ITEMS");
      setHiddenItems({});
      return;
    }

    logger(`Removing ${serviceNames}`);
    serviceNames.map((serviceName) => {
      if (hiddenItems[serviceName] === undefined) return;

      setHiddenItems((old) => {
        const newState = old;
        delete newState[serviceName];
        const keys = Object.keys(newState);
        localStorage.setItem("HIDDEN_ITEMS", JSON.stringify(keys));
        return newState;
      });
    });
  };

  const updateHiddenItems = (
    serviceNames: string[],
    action: "add" | "remove",
  ) => {
    if (action === "add") addHiddenItem(serviceNames);
    if (action === "remove") removeHiddenItem(serviceNames);
  };

  return (
    <StatusContext.Provider
      value={{
        currentStatus: filteredData,
        previousStatus: previousStatus,
        hiddenItems,
        updateHiddenItems,
        oldTimestamp,
        paused,
      }}
    >
      <div className="mb-4 flex flex-col justify-between space-y-4">
        <DateTime />
        <OverallStatus />
        <ItemizedStatus />
        <HiddenItems />
      </div>
    </StatusContext.Provider>
  );
}

export default ServiceMonitor;
