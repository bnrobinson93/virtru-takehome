import { Button } from "@/components/ui/button";
import { statusColorBg } from "@/lib/statusColor";
import { cn } from "@/lib/utils";
import HideItem from "./HideItem";
import { Checkbox } from "@/components/ui/checkbox";
import { Share2 } from "lucide-react";
import { useState } from "react";

type Props = {
  serviceName: string;
  status: Status;
  checked: { [K in string]: boolean };
  setChecked: React.Dispatch<React.SetStateAction<{ [K in string]: boolean }>>;
};

function ListItem({ serviceName, status, checked, setChecked }: Props) {
  const color = statusColorBg(status);

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

      <span className="flex gap-1">
        <Button variant="link" className="font-semibold text-primary-300">
          <Share2 />
          Share
        </Button>
        <HideItem serviceName={serviceName} />
      </span>
    </li>
  );
}

export default ListItem;
