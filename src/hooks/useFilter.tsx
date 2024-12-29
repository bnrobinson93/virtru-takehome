import { useState } from "react";

function useFilter() {
  const [filterBy, setFilterBy] = useState("");

  const setFilterByFn = (filterBy: string) => {
    console.log("Setting filter to", filterBy);
    setFilterBy(filterBy);
  };

  return { filterBy, setFilterBy: setFilterByFn };
}

export default useFilter;
