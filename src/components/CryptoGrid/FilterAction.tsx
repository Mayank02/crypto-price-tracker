import React, { useState, useEffect } from "react";
import gridStyles from "./CryptoGrid.module.css";

interface FilterActionProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export const FilterAction = ({ filter, setFilter }: FilterActionProps) => {
  const [debouncedFilter, setDebouncedFilter] = useState(filter);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(debouncedFilter);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedFilter, setFilter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedFilter(e.target.value);
  };

  return (
    <div className={gridStyles.filterInputContainer}>
      <label htmlFor="filter">Filter by Name : </label>
      <input
        type="text"
        id="filter"
        className={gridStyles.filterInput}
        value={debouncedFilter}
        placeholder="Filter cryptocurrencies"
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterAction;
