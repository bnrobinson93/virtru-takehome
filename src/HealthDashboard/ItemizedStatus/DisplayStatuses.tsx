import { useContext, useLayoutEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListItem from "./ListItem";
import StatusContext from "@/contexts/Statuses";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Props = {
  startMaximixed?: "true" | "false";
  statuses?: ServicesHealth["components"];
};

function DisplayStatuses({ statuses, startMaximixed }: Props) {
  const context = useContext(StatusContext);
  const [isOpen, setIsOpen] = useState(startMaximixed === "true");
  const [checked, setChecked] = useState<{ [K in string]: boolean }>({});

  // Using layout effect to avoid rendiering incorrectly on first load
  useLayoutEffect(() => {
    if (startMaximixed === "true") setIsOpen(true);
  }, [startMaximixed]);

  if (statuses === undefined) return <div />;

  const ToggleIcon = isOpen ? ChevronUp : ChevronDown;

  const handleToggle = () => {
    // This uses the old value of the state so it may feel backwards
    localStorage.setItem("START_SERVICES_MAXIMIZED", isOpen ? "false" : "true");
    setIsOpen((old) => !old);
  };

  const showHideButton = Object.values(checked).filter((x) => x).length > 0;
  const hideChecked = () => {
    if (!context)
      return toast({ title: "Unable to hide items", variant: "destructive" });
    const { updateHiddenItems } = context;
    updateHiddenItems(Object.keys(checked), "add");
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleToggle}
      className="relative rounded-lg bg-gray-50 p-6 shadow dark:bg-gray-900"
    >
      <Button
        variant="link"
        className={cn(
          "absolute right-12 top-6 z-10 hidden items-center text-primary-300 dark:text-primary-700",
          { block: showHideButton },
        )}
        onClick={hideChecked}
      >
        Hide Selected
      </Button>
      <CollapsibleTrigger asChild>
        <div className="flex cursor-pointer items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold">Services</h2>
          <Button variant="link">
            <ToggleIcon size={20} />
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <>
          <p className="text-sm text-gray-800">
            Hover an item to view a more detailed status.
          </p>
          <ul className="divide-y divide-gray-500">
            {Object.keys(statuses).map((serviceName) => {
              const serviceDetails = statuses[serviceName];

              return (
                <ListItem
                  key={serviceName}
                  serviceName={serviceName}
                  status={serviceDetails}
                  checked={checked}
                  setChecked={setChecked}
                />
              );
            })}
          </ul>
        </>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default DisplayStatuses;
