import { createContext } from "react";

const StatusContext = createContext<{
  currentStatus: ServicesHealth | null;
  previousStatus: ServicesHealth | null;
  hiddenItems: Components;
  updateHiddenItems: (
    newComponents: string[],
    action: "add" | "remove",
  ) => void;
  timestamp: string;
  paused: boolean;
} | null>(null);

export default StatusContext;
