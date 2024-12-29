import {
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";

type Props = { filterBy: string; setFilterBy: (filterBy: string) => void };

function Filter({ filterBy, setFilterBy }: Props) {
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={filterBy} onValueChange={setFilterBy}>
        <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="healthy">Healthy</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="unhealthy">
          Unhealthy
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="updated">Updated</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  );
}

export default Filter;
