import { createContext } from "react";

const StatusContext = createContext<{
  currentStatus: ServicesHealth | null;
  previousStatus: ServicesHealth | null;
  hiddenItems: ServiceStatus[] | null;
  oldTimestamp: number;
  paused: boolean;
} | null>(null);

export default StatusContext;
