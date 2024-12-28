import { Button } from "@/components/ui/button";
import { statusColorBg } from "@/lib/statusColor";
import { cn } from "@/lib/utils";
import HideItem from "./HideItem";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Share2 } from "lucide-react";

type Props = {
  serviceName: string;
  status: ServiceStatus;
  checked: { [K in string]: boolean };
  setChecked: React.Dispatch<React.SetStateAction<{ [K in string]: boolean }>>;
};

function ListItem({ serviceName, status, checked, setChecked }: Props) {
  const color = statusColorBg(status.status);

  return (
    <li key={serviceName} className="flex justify-between">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-4">
              <Checkbox
                id={serviceName}
                checked={checked[serviceName]}
                onCheckedChange={(checkedVal) =>
                  setChecked((old) => ({ ...old, [serviceName]: !!checkedVal }))
                }
              />
              <span className={cn("h-3 w-3 rounded-full", color)}>
                <span className="sr-only">{status.status}</span>
              </span>
              <label htmlFor={serviceName} className="first-letter:uppercase">
                {serviceName}
              </label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{status.message || "Healthy"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex gap-1">
        <Button variant="link" className="font-semibold text-primary-300">
          <Share2 />
          Share
        </Button>
        <HideItem serviceName={serviceName} />
      </div>
    </li>
  );
}

export default ListItem;
