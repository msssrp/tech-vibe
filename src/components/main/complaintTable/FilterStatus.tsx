import { ArticleStatuses } from "@/libs/actions/article/article";
import { complaintStatuses } from "@/libs/actions/complaint/complaint";
import { FilterProps } from "@/types/article/article";
import { Button, Popover, Text } from "@mantine/core";
import React from "react";
import { FaFilter } from "react-icons/fa";

type statusBtnProps = {
  status: string;
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
  status,
  name,
  color,
  setColumFilters,
}) => (
  <Button
    color={color}
    onClick={() =>
      setColumFilters((prev) => {
        const existingFilter = prev.find(
          (filter) => filter.id === "complaint_status"
        );

        if (existingFilter?.value === status) {
          // If the status is already selected, remove the filter
          return prev.filter((filter) => filter.id !== "complaint_status");
        } else {
          // Otherwise, add the selected status filter
          return prev
            .filter((filter) => filter.id !== "complaint_status")
            .concat({ id: "complaint_status", value: status });
        }
      })
    }>
    {name}
  </Button>
);

const FilterStatus: React.FC<FilterProps> = ({
  setColumFilters,
  columnFilters,
}) => {
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
            {complaintStatuses.map((status) => (
              <StatusBtn
                status={status.status}
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
