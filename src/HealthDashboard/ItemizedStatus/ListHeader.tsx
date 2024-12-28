import { useContext, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import StatusContext from "@/contexts/Statuses";
import { type CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  checked: { [K in string]: boolean };
  setChecked: React.Dispatch<React.SetStateAction<{ [x: string]: boolean }>>;
};

function ListHeader({ checked, setChecked }: Props) {
  const [components, setComponents] = useState({});
  const [checkedState, setCheckedState] = useState<CheckedState>(false);
  const context = useContext(StatusContext);

  const numberChecked = Object.keys(checked).filter((x) => checked[x]).length;

  useEffect(() => {
    if (context) {
      const { currentStatus } = context;
      let totalNumberOfServices = -1;
      if (currentStatus) {
        setComponents(currentStatus.components);
        totalNumberOfServices = Object.keys(currentStatus.components).length;
      }
      if (numberChecked === totalNumberOfServices) return setCheckedState(true);
      if (numberChecked === 0) return setCheckedState(false);
      return setCheckedState("indeterminate");
    }
  }, [numberChecked, context]);

  return (
    <span className="my-2 flex justify-between border-b-2 py-2 text-sm text-gray-800">
      <div className="flex items-center space-x-4">
        <Checkbox
          className="border-gray-800"
          title="Select All"
          id="select-all"
          checked={checkedState}
          onCheckedChange={(checkedVal) => {
            setCheckedState(!!checkedVal);
            Object.keys(components).map((service) =>
              setChecked((old) => ({ ...old, [service]: !!checkedVal })),
            );
          }}
        />
        <span className="h-3 w-3 rounded-full">
          <span className="sr-only">Status</span>
        </span>
        <label
          htmlFor="select-all"
          className="cursor-pointer first-letter:uppercase"
        >
          Service Name
        </label>
      </div>
    </span>
  );
}

export default ListHeader;
