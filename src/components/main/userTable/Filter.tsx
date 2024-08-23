import React from "react";
import { Input } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { FilterProps } from "@/types/article/article";

const Filter: React.FC<FilterProps> = ({ setColumFilters, columnFilters }) => {
  const articleTitle =
    columnFilters.find((filter) => filter.id === "user_fullname")?.value || "";
  const onFilterChange = (id: string, value: string) =>
    setColumFilters((prev) =>
      prev.filter((filter) => filter.id !== id).concat({ id, value })
    );
  return (
    <Input
      placeholder="Search..."
      leftSection={<CiSearch size={16} />}
      radius={"md"}
      w={250}
      value={articleTitle}
      onChange={(event) => onFilterChange("user_fullname", event.target.value)}
    />
  );
};

export default Filter;
