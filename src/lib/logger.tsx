function logger(message: string, type: "debug" | "info" = "info") {
  if (process.env.NODE_ENV === "development") {
    if (type === "debug") console.debug(message);
    else console.log(message);
  }
}

export default logger;
