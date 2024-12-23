import { createContext, useEffect, useMemo, useState } from "react";
import DateTime from "./DateTime";
import HiddenItems from "./HiddenItems";
import ItemizedStatus from "./ItemizedStatus";
import OverallStatus from "./OverallStatus";

const StatusContext = createContext<{
  currentStatuses: ServicesHealth | null;
  previousStatuses: ServicesHealth | null;
  hiddenItems: ServiceStatus[] | null;
  oldTimestamp: number;
} | null>(null);

type Props = {
  data: ServicesHealth | null;
  error: string | null;
  loading: boolean;
};

function ServiceMonitor({ data, error, loading }: Props) {
  const [currentStatuses, setCurrentStatuses] = useState<ServicesHealth | null>(
    null,
  );
  const [previousStatuses, setPreviousStatuses] =
    useState<ServicesHealth | null>(null);
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

  return (
    <StatusContext.Provider
      value={{ currentStatuses, previousStatuses, hiddenItems, oldTimestamp }}
    >
      <OverallStatus />
      <ItemizedStatus />
      <HiddenItems />
      <DateTime />
    </StatusContext.Provider>
  );
}

export default ServiceMonitor;
