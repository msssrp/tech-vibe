import { ArticleStatuses } from "@/libs/actions/article/article";
import { FilterProps } from "@/types/article/article";
import { Button, Popover, Text } from "@mantine/core";
import React from "react";
import { FaFilter } from "react-icons/fa";

type statusBtnProps = {
  isActive: boolean;
  id: number;
  name: string;
  color: string;
  setColumFilters: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        value: string;
      }[]
    >
  >;
};

const StatusBtn: React.FC<statusBtnProps> = ({
  id,
  name,
  color,
  setColumFilters,
  isActive,
}) => (
  <Button
    color={color}
    onClick={() =>
      setColumFilters((prev) => {
        const statuses =
          prev.find((filter) => filter.id === "article_status")?.value || [];

        if (statuses.length === 0) {
          return prev.concat({ id: "article_status", value: [id.toString()] });
        }

        return prev.map((filter) =>
          filter.id === "article_status"
            ? {
                ...filter,
                value: isActive
                  ? statuses.filter((s) => s !== id.toString())
                  : statuses.concat(id.toString()),
              }
            : filter
        );
      })
    }
  >
    {name}
  </Button>
);

const FilterStatus: React.FC<FilterProps> = ({
  setColumFilters,
  columnFilters,
}) => {
  const filterStatuses =
    columnFilters.find((f) => f.id === "article_status")?.value || [];
  return (
    <Popover position="right-start" withArrow shadow="md">
      <Popover.Target>
        <Button>
          <FaFilter />
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">
          <div className="flex flex-col items-start justify-center space-y-2">
            <h1 className="text-lg font-medium">Filter By:</h1>
            <p className=" text-slate-800 text-base">status</p>
            {ArticleStatuses.map((status) => (
              <StatusBtn
                isActive={filterStatuses.includes(status.id)}
                id={status.id}
                setColumFilters={setColumFilters}
                key={status.id}
                name={status.name}
                color={status.color}
              />
            ))}
          </div>
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};

export default FilterStatus;
