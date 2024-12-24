import { useLayoutEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListItem from "./ListItem";

type Props = {
  startMaximixed?: "true" | "false";
  statuses: ServicesHealth["components"];
};

function DisplayStatuses({ statuses, startMaximixed }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    if (startMaximixed === "true") setIsOpen(true);
  }, [startMaximixed]);

  const ToggleIcon = isOpen ? ChevronUp : ChevronDown;

  const handleToggle = () => {
    // This uses the old value of the state so it may feel backwards
    localStorage.setItem("START_SERVICES_MAXIMIZED", isOpen ? "false" : "true");
    setIsOpen((old) => !old);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleToggle}
      className="rounded-lg bg-gray-50 p-6 shadow dark:bg-gray-900"
    >
      <CollapsibleTrigger asChild>
        <div className="flex cursor-pointer items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold">Services</h2>
          <Button variant="link">
            <ToggleIcon size={20} />
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="divide-y divide-gray-500">
          {Object.keys(statuses).map((serviceName) => {
            const serviceDetails = statuses[serviceName];
            const { status } = serviceDetails;

            return (
              <ListItem
                key={serviceName}
                serviceName={serviceName}
                status={status}
              />
            );
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default DisplayStatuses;
