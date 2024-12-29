import { Filter, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FilterMenu from "./Filter";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  pause: () => void;
  resume: () => void;
  paused: boolean;
  filterBy: string;
  setFilterBy: (filterBy: string) => void;
};

function Header({ pause, resume, paused, filterBy, setFilterBy }: Props) {
  const action = paused ? resume : pause;
  const buttonText = paused ? "Resume Updates" : "Pause Updates";
  const Icon = paused ? <Play size={24} /> : <Pause size={24} />;

  return (
    <header
      className={cn(
        "top-0 mb-4 flex h-14 items-center justify-between gap-2 bg-gray-400 px-4 py-2 shadow-md transition-all fade-out-60 dark:bg-gray-600",
        {
          "bg-pink-100": paused,
        },
      )}
    >
      <div className="text-3xl font-bold">Health Check</div>
      <nav>
        <Button
          variant="ghost"
          className="px-2 text-primary-500 hover:bg-inherit hover:text-primary-950"
          onClick={action}
        >
          {Icon}
          <span className="-ml-1 hidden sm:inline-block">{buttonText}</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="px-2 text-primary-500 hover:text-primary-950"
            >
              <Filter />
              <span className="-ml-1 hidden sm:inline-block">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <FilterMenu filterBy={filterBy} setFilterBy={setFilterBy} />
        </DropdownMenu>
      </nav>
    </header>
  );
}

export default Header;
