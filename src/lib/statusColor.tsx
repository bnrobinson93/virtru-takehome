const statusColor = (status: Status) => {
  switch (status) {
    case "healthy":
      return "text-green-500";
    case "unhealthy":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const statusColorBg = (status: Status) => {
  switch (status) {
    case "healthy":
      return "bg-green-500";
    case "unhealthy":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export { statusColor, statusColorBg };
