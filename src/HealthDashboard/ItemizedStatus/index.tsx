import { useContext, useLayoutEffect, useState } from "react";
import DisplayStatuses from "./DisplayStatuses";
import StatusContext from "@/contexts/Statuses";
import { toast } from "@/hooks/use-toast";

type Props = { filterBy: string; forceMaximized?: boolean };

function ItemizedStatus({ filterBy, forceMaximized }: Props) {
  const context = useContext(StatusContext);
  const [checked, setChecked] = useState<{ [K in string]: boolean }>({});
  const [isMaximized, setIsMaximized] = useState(false);

  useLayoutEffect(() => {
    if (forceMaximized === true) return setIsMaximized(true);
    const stored = localStorage.getItem("START_SERVICES_MAXIMIZED");
    if (stored === null) return setIsMaximized(false);
    setIsMaximized(stored === "true");
  }, [forceMaximized]);

  if (!context || context.currentStatus === null) {
    return <DisplayStatuses />;
  }

  const { currentStatus, previousStatus, updateHiddenItems, timestamp } =
    context;

  const hideChecked = () => {
    updateHiddenItems(Object.keys(checked), "add");
    setChecked({});
  };

  const shareSingleItem = (svcName: string, svcStatus: ServiceStatus) => {
    if (currentStatus === null)
      return toast({
        title: "Unable to determine current status",
        variant: "destructive",
      });

    const components = [{ [svcName]: svcStatus }];

    const querystring = new URLSearchParams();
    const status = currentStatus.status;
    querystring.append("status", status);
    querystring.append("components", JSON.stringify(components));
    querystring.append("timestamp", String(timestamp));

    const url = `${window.location.origin}/health?${querystring}`;
    navigator.clipboard.writeText(url);

    setChecked({});
    toast({ title: "Copied link to clipboard" });
  };
  const shareChecked = () => {
    const itemsToShare = Object.keys(checked);

    if (currentStatus === null)
      return toast({
        title: "Unable to determine current status",
        variant: "destructive",
      });

    const components = itemsToShare.map((svc) => {
      return { [svc]: currentStatus.components[svc] };
    });

    const querystring = new URLSearchParams();
    const status = currentStatus.status;
    querystring.append("status", status);
    querystring.append("components", JSON.stringify(components));
    querystring.append("timestamp", String(timestamp));

    const url = `${window.location.origin}/health?${querystring}`;
    navigator.clipboard.writeText(url);

    setChecked({});
    toast({ title: "Copied link to clipboard" });
  };

  return (
    <DisplayStatuses
      filterBy={filterBy}
      checked={checked}
      setChecked={setChecked}
      shareChecked={shareChecked}
      hideChecked={hideChecked}
      shareItem={shareSingleItem}
      startMaximized={isMaximized}
      statuses={currentStatus.components}
      prevStatuses={previousStatus ? previousStatus.data.components : undefined}
      timestamp={timestamp}
    />
  );
}

export default ItemizedStatus;
