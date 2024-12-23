import { useContext } from "react";
import StatusContext from "@/contexts/Statuses";
import DisplayOverallStatus from "./DisplayOverallStatus";

function OverallStatus() {
  const context = useContext(StatusContext);

  if (!context) {
    return <DisplayOverallStatus status="unreachable" />;
  }

  const { paused, currentStatus, previousStatus } = context;

  // This will only occur until the first fetch completes
  // TODO parent loading state should render this effectively dead code
  if (currentStatus === null) return <DisplayOverallStatus status="pending" />;

  // This will occur until the second fetch completes
  if (previousStatus === null)
    return <DisplayOverallStatus status={currentStatus.status} />;

  // From the third fetch onwards, the status should reflect change
  const isNewStatus = previousStatus.status !== currentStatus.status;

  return (
    <DisplayOverallStatus
      status={currentStatus.status}
      highlight={isNewStatus}
      paused={paused}
    />
  );
}

export default OverallStatus;
