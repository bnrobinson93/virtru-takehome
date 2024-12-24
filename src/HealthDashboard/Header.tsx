import { Filter, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { pause: () => void; resume: () => void; paused: boolean };

function Header({ pause, resume, paused }: Props) {
  const action = paused ? resume : pause;
  const buttonText = paused ? "Resume Updates" : "Pause Updates";
  const Icon = paused ? <Play size={24} /> : <Pause size={24} />;

  return (
    <header className="top-0 mb-4 flex h-14 items-center justify-between gap-2 bg-gray-400 px-4 py-2 dark:bg-gray-600">
      <div className="text-3xl font-bold">Health Check</div>
      <nav>
        <Button
          variant="secondary"
          className="px-2 text-primary-500 hover:text-primary-950"
          onClick={action}
        >
          {Icon}
          <span className="-ml-1 hidden sm:inline-block">{buttonText}</span>
        </Button>
        <Button
          variant="secondary"
          className="px-2 text-primary-500 hover:text-primary-950"
        >
          <Filter />
          <span className="-ml-1 hidden sm:inline-block">Filter</span>
        </Button>
      </nav>
    </header>
  );
}

export default Header;
