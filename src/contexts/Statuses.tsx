import { createContext } from "react";

const StatusContext = createContext<{
  currentStatus: ServicesHealth | null;
  previousStatus: PreviousStatus | null;
  hiddenItems: Components;
  updateHiddenItems: (
    newComponents: string[],
    action: "add" | "remove",
  ) => void;
  timestamp: string;
  paused: boolean;
  error: string | null;
} | null>(null);

export default StatusContext;
