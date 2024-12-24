function DateTime() {
  const now = new Date();
  const displayTime = `${now.toDateString()} ${now.toLocaleTimeString()}`;
  return <div className="self-end text-xs">Refresh time: {displayTime}</div>;
}

export default DateTime;
