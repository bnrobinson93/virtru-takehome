import { statusColorBg } from "@/lib/statusColor";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { AccordionContent, AccordionItem } from "@/components/ui/accordion";
import ActionButtons from "./ActionButtons";
import ServiceDetails from "./ServiceDetails";

type Props = {
  serviceName: string;
  status: ServiceStatus;
  checked: { [K in string]: boolean };
  setChecked?: React.Dispatch<React.SetStateAction<{ [K in string]: boolean }>>;
  lastStatus?: ServiceStatus;
  lastStatusTimestamp?: string;
  shareItem?: (serviceName: string, status: ServiceStatus) => void;
};

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

        <ActionButtons
          serviceName={serviceName}
          status={status}
          onShare={shareItem}
        />
      </div>
      <AccordionContent>
        <ServiceDetails
          status={status}
          lastStatus={lastStatus}
          lastStatusTimestamp={lastStatusTimestamp}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

export default ListItem;
