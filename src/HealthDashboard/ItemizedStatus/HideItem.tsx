import { Button } from "@/components/ui/button";
import StatusContext from "@/contexts/Statuses";
import { useToast } from "@/hooks/use-toast";
import { useContext } from "react";

type Props = { serviceName: string };

function HideItem({ serviceName }: Props) {
  const context = useContext(StatusContext);
  const { toast } = useToast();

  const handleClick = () => {
    if (!context)
      return toast({
        title: "Unable to hide item",
        description: "Please try again later",
        variant: "destructive",
      });

    const { updateHiddenItems } = context;
    updateHiddenItems([serviceName], "add");
  };

  return (
    <Button onClick={handleClick} variant="link" className="text-gray-800">
      Hide
    </Button>
  );
}

export default HideItem;
