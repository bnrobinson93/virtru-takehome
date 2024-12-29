import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import StatusContext from "@/contexts/Statuses";
import { filterData } from "@/lib/filter";
import DateTime from "./DateTime";
import OverallStatus from "./OverallStatus";
import ItemizedStatus from "./ItemizedStatus";
import HiddenItems from "./HiddenItems";
import DisplayError from "./DisplayError";

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
  filterBy: string;
  initialData: PreviousStatus | null;
  data: ServicesHealth | null;
  error: string | null;
  loading: boolean;
  paused: boolean;
  timestamp: string;
};

function ServiceMonitor({
  filterBy,
  initialData, // this is only populated if there is a query string
  data,
  error: err,
  paused,
  timestamp,
}: Props) {
  const [error, setError] = useState<string>(err || "");

  // either the querystring timestamp or current time
  const [time, setTime] = useState(timestamp);

  const [currentStatus, setCurrentStatus] = useState(data);

  // this will either be the previous iteration of the data or static query string data
  const [previousStatus, setPreviousStatus] = useState(initialData);

  const [hiddenItems, setHiddenItems] = useState<Components>({});

  // This will only run if there is no querystring as that is the only time that timestamp changes
  useEffect(() => setTime(timestamp), [timestamp]);

  // Using layout effect to avoid a hidden items section from popping in late
  useLayoutEffect(() => setHiddenItems(readHiddenItems()), []);

  // Handle data rotation
  useEffect(() => {
    if (err) return setError(err);
    if (time === timestamp && initialData === null) return;
    setError("");

    if (initialData) setPreviousStatus(initialData);

    if (currentStatus !== null && !initialData) {
      // logger("Updating previous state");
      setPreviousStatus({
        data: currentStatus,
        timestamp,
      });
    }

    setCurrentStatus(data);
  }, [data, err, currentStatus, initialData, timestamp, time]);

  // Each time the data updates, filter based on the hidden items
  const filteredData = useMemo(() => {
    if (currentStatus === null) return null;

    let removeList = hiddenItems;

    // In the case of a query string, we should remove any items
    // that are NOT a part of the shared list
    if (initialData?.data.components) {
      const fullList = Object.keys(currentStatus.components);
      const diffList = {} as Components;
      fullList.map((serviceName) => {
        if (initialData.data.components[serviceName] === undefined)
          diffList[serviceName] = currentStatus.components[serviceName];
      });
      removeList = diffList;
    }

    return filterData(currentStatus, removeList);
  }, [currentStatus, hiddenItems, initialData]);

  /** Moves a service from the visible list to the hidden list */
  const addHiddenItem = (serviceNames: string[]) => {
    if (currentStatus === null) return;

    // logger(`Adding ${serviceNames}`);
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

  /** Moves a service from the hidden list to the visible list */
  const removeHiddenItem = (serviceNames: string[]) => {
    if (currentStatus === null) return;
    if (serviceNames.length === 0) {
      // logger(`Removing all hidden items ${serviceNames}`);
      localStorage.removeItem("HIDDEN_ITEMS");
      setHiddenItems({});
      return;
    }

    // logger(`Removing ${serviceNames}`);

    const newHiddenItems = hiddenItems;
    serviceNames.map((serviceName) => {
      if (hiddenItems[serviceName] === undefined) return;
      delete newHiddenItems[serviceName];
    });

    const keys = Object.keys(newHiddenItems);
    localStorage.setItem("HIDDEN_ITEMS", JSON.stringify(keys));

    setHiddenItems(newHiddenItems);
  };

  /** Handles the toggling of items in the hidden list */
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
        timestamp: time,
        paused,
        error,
      }}
    >
      <div className="mb-4 flex flex-col justify-between space-y-4">
        <DisplayError error={error} />
        <DateTime timestamp={time} />
        <OverallStatus />
        <ItemizedStatus
          filterBy={filterBy}
          forceMaximized={initialData !== null}
        />
        <HiddenItems />
      </div>
    </StatusContext.Provider>
  );
}

export default ServiceMonitor;
