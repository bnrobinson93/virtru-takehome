import { useContext, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import StatusContext from "@/contexts/Statuses";
import { Button } from "@/components/ui/button";
import ListItem from "./ListItem";
import { cn } from "@/lib/utils";

function HiddenItems() {
  const [isOpen, setIsOpen] = useState(false);
  const [isResetting, setIsRestting] = useState(false);
  const [checked, setChecked] = useState<{ [K in string]: boolean }>({});
  const context = useContext(StatusContext);

  if (!context || !context.hiddenItems) {
    return <div />;
  }

  const { hiddenItems, updateHiddenItems } = context;
  if (Object.keys(hiddenItems).length === 0) return <div />;

  const ToggleIcon = isOpen ? ChevronUp : ChevronDown;

  const showRestoreButton = Object.values(checked).filter((x) => x).length > 0;
  const restoreSelected = () => {
    setIsRestting(true);
    updateHiddenItems(Object.keys(checked), "remove");
    setChecked({});
    setIsRestting(false);
  };

  const restoreAll = () => {
    setIsRestting(true);
    updateHiddenItems([], "remove");
    setIsOpen(false);
    setIsRestting(false);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="relative rounded-lg bg-gray-400 p-6 shadow outline-dashed outline-2 outline-gray-500 dark:bg-gray-600"
    >
      <div
        className={cn("absolute right-12 top-6 z-10 items-center", {
          flex: !showRestoreButton,
          hidden: showRestoreButton,
        })}
      >
        {showRestoreButton ? (
          <Button
            variant="link"
            className="flex-1 text-primary-300 dark:text-primary-700"
            onClick={restoreSelected}
          >
            Restore Selected
          </Button>
        ) : (
          <>
            <div
              className={cn(
                "-mr-1 hidden h-3 w-3 animate-spin rounded-full border-b-2 border-primary-300",
                { block: isResetting },
              )}
            />
            <Button
              variant="link"
              className="flex-1 text-primary-300 dark:text-primary-700"
              onClick={restoreAll}
              disabled={isResetting}
            >
              Restore All
            </Button>
          </>
        )}
      </div>
      <CollapsibleTrigger asChild>
        <div className="flex cursor-pointer items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold text-secondary-300">
            Hidden Items
          </h2>
          <div>
            <Button variant="link">
              <ToggleIcon size={20} />
            </Button>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="divide-y divide-gray-500">
          {Object.keys(hiddenItems).map((serviceName) => {
            const serviceDetails = hiddenItems[serviceName];
            const { status } = serviceDetails;

            return (
              <ListItem
                key={serviceName}
                serviceName={serviceName}
                status={status}
                checked={checked}
                setChecked={setChecked}
              />
            );
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default HiddenItems;
