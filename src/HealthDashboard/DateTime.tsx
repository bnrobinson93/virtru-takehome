type Props = { timestamp?: string };

function DateTime({ timestamp }: Props) {
  let now = new Date();
  if (timestamp) now = new Date(timestamp);

  const displayTime = `${now.toDateString()} ${now.toLocaleTimeString()}`;
  return (
    <div className="self-end text-xs">
      <span className="font-bold">Refresh time: </span>
      {displayTime}
    </div>
  );
}

export default DateTime;
