import { useContext } from "react";
import DisplayStatuses from "./DisplayStatuses";
import StatusContext from "@/contexts/Statuses";

function ItemizedStatus() {
  const context = useContext(StatusContext);

  if (!context || context.currentStatus === null) {
    return <DisplayStatuses statuses={[]} />;
  }

  const { currentStatus, previousStatus } = context;

  if (previousStatus === null) {
    return <DisplayStatuses statuses={currentStatus.components} />;
  }

  const startMaximixed = localStorage.getItem("START_SERVICES_MAXIMIZED") as
    | "true"
    | "false"
    | undefined;

  return (
    <DisplayStatuses
      startMaximixed={startMaximixed}
      statuses={currentStatus.components}
    />
  );
}

export default ItemizedStatus;
