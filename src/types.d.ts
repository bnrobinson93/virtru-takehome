type Status = "healthy" | "unhealthy";

type ServiceStatus = {
  status: Status;
  message: string;
};

type ServicesHealth = {
  status: Status;
  components: ServiceStatus[];
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
