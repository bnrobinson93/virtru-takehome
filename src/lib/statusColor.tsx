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

export { statusColor };
