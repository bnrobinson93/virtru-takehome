import { statusColor } from "@/lib/statusColor";
import { AlertTriangle, CheckCircle, PauseCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { status: Status; highlight?: boolean; paused?: boolean };

function DisplayOverallStatus({
  status,
  highlight = false,
  paused = false,
}: Props) {
  let styles = "bg-transparent";
  if (highlight) styles = "bg-yellow-200 rounded-sm";
  if (paused) styles = "text-yellow-700 dark:text-yellow-300";

  const color = statusColor(status);

  let Icon;
  switch (status) {
    case "healthy":
      Icon = CheckCircle;
      break;
    case "unhealthy":
      Icon = XCircle;
      break;
    default:
      Icon = AlertTriangle;
      break;
  }
  if (paused) Icon = PauseCircle;

  return (
    <section className="flex items-center justify-between rounded-lg bg-gray-50 p-6 shadow-md dark:bg-gray-900">
      <h1 className="text-2xl font-bold">Current Status</h1>
      {highlight && (
        <div
          data-testid="overall-updated"
          className="text-xs italic text-secondary-500"
        >
          Updated
        </div>
      )}
      <div
        className={cn("flex items-center p-1 align-middle", color, styles)}
        title={paused ? "Updates are paused" : `System is ${status}`}
      >
        <Icon size={16} strokeWidth={3} />
        <span
          data-testid="overall-status"
          className="ml-1 font-semibold first-letter:uppercase"
        >
          {status}
        </span>
      </div>
    </section>
  );
}

export default DisplayOverallStatus;
