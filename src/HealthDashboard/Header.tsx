import { Filter, Pause, Play } from "lucide-react";
import { Button } from '@/components/ui/button';

type Props = {pause: () => void, resume: () => void, paused: boolean}

function Header({pause, resume, paused}: Props) {
  const action = paused ? resume : pause;
  const buttonText = paused ? "Resume Updates" : "Pause Updates";
  const Icon = paused ? <Play size={24} /> : <Pause size={24} />;

  return (
      <header className="flex gap-2 items-center justify-between top-0 px-4 py-2 bg-gray-100 dark:bg-gray-900 h-14">
        <div className="font-bold text-3xl">Health Check</div>
        <nav>
          <Button variant="secondary" className="text-primary-500 hover:text-primary-950 px-2">
            <Filter />
            <span className="hidden sm:inline-block -ml-1">Filter</span>
          </Button>
          <Button variant="secondary" className="text-primary-500 hover:text-primary-950 px-2" onClick={action}>
            {Icon}
            <span className="hidden sm:inline-block -ml-1">{buttonText}</span>
          </Button>
        </nav>
      </header>
  )
}

export default Header
