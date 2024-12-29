import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import HideItem from "./HideItem";
import { AccordionTrigger } from "@/components/ui/accordion";

type ActionButtonsProps = {
  serviceName: string;
  status: ServiceStatus;
  onShare?: (serviceName: string, status: ServiceStatus) => void;
};

function ActionButtons({ serviceName, status, onShare }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="link"
        className="font-semibold text-primary-300"
        onClick={() => onShare && onShare(serviceName, status)}
      >
        <Share2 />
        Share
      </Button>
      <HideItem serviceName={serviceName} />
      <AccordionTrigger title="More detail" />
    </div>
  );
}

export default ActionButtons;
