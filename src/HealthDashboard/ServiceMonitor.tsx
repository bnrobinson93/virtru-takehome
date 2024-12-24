import { useEffect, useMemo, useState } from "react";
import StatusContext from "@/contexts/Statuses";
import DateTime from "./DateTime";
import OverallStatus from "./OverallStatus";
import ItemizedStatus from "./ItemizedStatus";
import HiddenItems from "./HiddenItems";

type Props = {
  data: ServicesHealth | null;
  error: string | null;
  loading: boolean;
  paused: boolean;
};

function ServiceMonitor({ data, error: err, loading, paused }: Props) {
  const [error, setError] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState(data);
  const [previousStatus, setPreviousStatus] = useState<ServicesHealth | null>(
    null,
  );
  const [hiddenItems, setHiddenItems] = useState<ServiceStatus[]>([]);
  const [oldTimestamp, setOldTimestamp] = useState<number>(Date.now());

  // Prevent rerender loop since this runs before the useEffect
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  useEffect(() => {
    if (searchParams.size === 0) return;
    console.log("Found a query string", searchParams);
  }, [searchParams]);

  useEffect(() => {
    if (err) return setError(err);
    setError("");
    setPreviousStatus(currentStatus);
    setCurrentStatus(data);
  }, [data, err, currentStatus]);

  return (
    <StatusContext.Provider
      value={{
        currentStatus: currentStatus,
        previousStatus: previousStatus,
        hiddenItems,
        oldTimestamp,
        paused,
      }}
    >
      <div className="flex flex-col justify-between space-y-4">
        <DateTime />
        <OverallStatus />
        <ItemizedStatus />
        <HiddenItems />
      </div>
    </StatusContext.Provider>
  );
}

export default ServiceMonitor;
