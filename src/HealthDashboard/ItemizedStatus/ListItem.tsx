import { Button } from "@/components/ui/button";
import { statusColorBg } from "@/lib/statusColor";
import { cn } from "@/lib/utils";

type Props = { serviceName: string; status: Status };

function ListItem({ serviceName, status }: Props) {
  const color = statusColorBg(status);

  return (
    <li key={serviceName} className="flex items-center justify-between p-2">
      <div className="flex items-center space-x-4">
        <input type="checkbox" />
        <span className={cn("h-3 w-3 rounded-full", color)}>
          <span className="sr-only">{status}</span>
        </span>
        <span className="first-letter:uppercase">{serviceName}</span>
        <span className="hidden text-xs italic text-gray-700 first-letter:uppercase sm:inline-block">
          {status}
        </span>
      </div>

      <span className="flex gap-1">
        <Button variant="link" className="text-gray-800">
          Hide
        </Button>
        <Button variant="link" className="font-semibold text-primary-300">
          Share
        </Button>
      </span>
    </li>
  );
}

export default ListItem;
