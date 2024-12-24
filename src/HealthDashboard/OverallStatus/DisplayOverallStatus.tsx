import { statusColor } from "@/lib/statusColor";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { status: Status; highlight?: boolean; paused?: boolean };

function DisplayOverallStatus({
  status,
  highlight = false,
  paused = false,
}: Props) {
  let styles = "bg-transparent";
  if (highlight) styles = "bg-yellow-200 rounded-sm";
  if (paused) styles = "text-secondary-700 dark:text-secondary-300";

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

  return (
    <section className="flex items-center justify-between rounded-lg bg-gray-50 p-6 shadow dark:bg-gray-900">
      <h1 className="text-2xl font-bold">Current Status</h1>
      {highlight && (
        <div
          data-testid="overall-updated"
          className="text-xs italic text-secondary-500"
        >
          Updated
        </div>
      )}
      <div className={cn("flex items-center p-1 align-middle", color, styles)}>
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
