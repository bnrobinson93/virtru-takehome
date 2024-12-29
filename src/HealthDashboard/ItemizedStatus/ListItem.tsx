import { statusColorBg } from "@/lib/statusColor";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Share2 } from "lucide-react";
import HideItem from "./HideItem";

type Props = {
  serviceName: string;
  status: ServiceStatus;
  checked: { [K in string]: boolean };
  setChecked?: React.Dispatch<React.SetStateAction<{ [K in string]: boolean }>>;
  lastStatus?: ServiceStatus;
  lastStatusTimestamp?: string;
  shareItem?: (serviceName: string, status: ServiceStatus) => void;
};

function MoreDetail(
  status: ServiceStatus,
  lastStatus: ServiceStatus | undefined,
  lastStatusTimestamp: string | undefined,
) {
  const classes = "text-gray-800 text-sm py-1";

  return (
    <>
      {status.status !== "healthy" ? (
        <>
          <p className={classes}>
            <span className="font-bold">Details: </span>
            {status.message}
          </p>
          <p className={classes}>
            For more information on how to resolve this issue, see the{" "}
            <a
              className="text-primary-300 underline"
              href="https://docs.virtru.com/docs/status"
              target="_blank"
            >
              Virtru Status documentation
            </a>
            .
          </p>
        </>
      ) : (
        <p className={classes}>This service is {status.status}</p>
      )}
      {lastStatus && lastStatus.status !== status.status && (
        <p className={`${classes} italic`}>
          <span className="font-semibold">Note:</span> Updated from{" "}
          {lastStatus.status} to {status.status}
          {lastStatusTimestamp && (
            <>
              {" "}
              since snapshot taken at{" "}
              <time dateTime={lastStatusTimestamp}>
                {new Date(lastStatusTimestamp).toLocaleString()}
              </time>
            </>
          )}
          .
        </p>
      )}
    </>
  );
}

function ListItem({
  serviceName,
  status,
  checked,
  setChecked,
  lastStatus,
  lastStatusTimestamp,
  shareItem,
}: Props) {
  const color = statusColorBg(status.status);

  const isUpdated = lastStatus && lastStatus.status !== status.status;

  return (
    <AccordionItem key={serviceName} value={serviceName}>
      <div
        className={cn("flex justify-between hover:bg-gray-300", {
          "bg-gradient-to-r": isUpdated,
          "from-transparent": isUpdated,
          "via-primary-100/50": isUpdated,
          "hover:via-primary-100/80": isUpdated,
          "to-transparent": isUpdated,
        })}
      >
        <div className="flex items-center space-x-4">
          {setChecked && (
            <Checkbox
              id={serviceName}
              checked={checked[serviceName]}
              onCheckedChange={(checkedVal) =>
                setChecked((old) => ({
                  ...old,
                  [serviceName]: !!checkedVal,
                }))
              }
            />
          )}
          <span className={cn("h-3 w-3 rounded-full", color)}>
            <span className="sr-only">{status.status}</span>
          </span>
          <label
            htmlFor={serviceName}
            className="cursor-pointer first-letter:uppercase"
          >
            {serviceName}
          </label>
          {isUpdated && (
            <div
              data-testid="update-badge"
              title={`Updated from ${lastStatus.status}`}
              className="size-2 rounded-full bg-primary-300"
            >
              <span className="sr-only">Updated from {lastStatus.status}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="link"
            className="font-semibold text-primary-300"
            onClick={() => shareItem && shareItem(serviceName, status)}
          >
            <Share2 />
            Share
          </Button>
          <HideItem serviceName={serviceName} />
          <AccordionTrigger title="More detail" />
        </div>
      </div>
      <AccordionContent>
        {MoreDetail(status, lastStatus, lastStatusTimestamp)}
      </AccordionContent>
    </AccordionItem>
  );
}

export default ListItem;
