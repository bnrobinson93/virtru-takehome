import { useContext, useState } from "react";
import DisplayStatuses from "./DisplayStatuses";
import StatusContext from "@/contexts/Statuses";
import { toast } from "@/hooks/use-toast";

type Props = { filterBy: string; forceMaximized?: boolean };

function ItemizedStatus({ filterBy, forceMaximized = false }: Props) {
  const context = useContext(StatusContext);
  const [checked, setChecked] = useState<{ [K in string]: boolean }>({});

  if (!context || context.currentStatus === null) {
    return <DisplayStatuses />;
  }

  const { currentStatus, previousStatus, updateHiddenItems, timestamp } =
    context;

  const startMaximized = forceMaximized
    ? String(forceMaximized)
    : (localStorage.getItem("START_SERVICES_MAXIMIZED") as MinimizedValues);

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
      startMaximized={startMaximized}
      statuses={currentStatus.components}
      prevStatuses={previousStatus ? previousStatus.data.components : undefined}
      timestamp={timestamp}
    />
  );
}

export default ItemizedStatus;
