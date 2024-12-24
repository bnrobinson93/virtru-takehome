import { useContext } from "react";
import StatusContext from "@/contexts/Statuses";

function DateTime() {
  const context = useContext(StatusContext);

  let now = new Date();
  if (context) now = new Date(context.oldTimestamp);

  const displayTime = `${now.toDateString()} ${now.toLocaleTimeString()}`;
  return <div className="self-end text-xs">Refresh time: {displayTime}</div>;
}

export default DateTime;
