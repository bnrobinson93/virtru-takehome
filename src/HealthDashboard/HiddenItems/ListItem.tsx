import { useContext, useState } from "react";
import { toast } from "@/hooks/use-toast";
import logger from "@/lib/logger";
import { statusColorBg } from "@/lib/statusColor";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import StatusContext from "@/contexts/Statuses";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  serviceName: string;
  status: Status;
  checked: { [K in string]: boolean };
  setChecked: React.Dispatch<React.SetStateAction<{ [K in string]: boolean }>>;
};

function ListItem({ serviceName, status, checked, setChecked }: Props) {
  const context = useContext(StatusContext);
  const color = statusColorBg(status);
  const [removing, setRemoving] = useState(false);

  const handleClick = () => {
    if (!context)
      return toast({
        title: "Unable to restore item to normal view",
        description: "Please try again later",
      });

    logger(`Restoring ${serviceName}`);
    setRemoving(true);

    const { updateHiddenItems } = context;
    updateHiddenItems([serviceName], "remove");

    setRemoving(false);
  };

  return (
    <li key={serviceName} className="flex items-center justify-between p-2">
      <div className="flex items-center space-x-4">
        <Checkbox
          id={serviceName}
          checked={checked[serviceName]}
          onCheckedChange={(checkedVal) =>
            setChecked((old) => ({ ...old, [serviceName]: !!checkedVal }))
          }
        />
        <span className={cn("h-3 w-3 rounded-full", color)}>
          <span className="sr-only">{status}</span>
        </span>
        <label htmlFor={serviceName} className="first-letter:uppercase">
          {serviceName}
        </label>
        <span className="hidden text-xs italic text-gray-700 first-letter:uppercase sm:inline-block">
          {status}
        </span>
      </div>

      <span className="flex items-center">
        <span
          className={cn(
            "hidden h-4 w-4 animate-spin rounded-full border-b-4 border-primary-300",
            removing && "block",
          )}
        />
        <Button
          variant="link"
          className="text-gray-800"
          onClick={handleClick}
          disabled={removing}
        >
          Restore
        </Button>
      </span>
    </li>
  );
}

export default ListItem;
