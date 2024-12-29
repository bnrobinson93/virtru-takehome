type Status = "healthy" | "unhealthy" | "unreachable" | "pending";

type ServiceStatus = {
  status: Status;
  message: string;
};

type Components = {
  [key in T]: ServiceStatus;
};

type ServicesHealth = {
  status: Status;
  components: Components;
};

type PreviousStatus = {
  data: ServicesHealth;
  timestamp: string;
};

type UseFetchReturn = {
  lastUpdated: string;
  error: string | null;
  loading: boolean;
  data: ServicesHealth | null;
  paused: boolean;
  pause: () => void;
  resume: () => void;
};

type MinimizedValues = "true" | "false" | undefined;
