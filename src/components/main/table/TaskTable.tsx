"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { articlePropsWithUser } from "@/types/article/article";
import { Table } from "@mantine/core";
import Image from "next/image";
import Filter from "./Filter";
import FilterStatus from "./FilterStatus";

type taskTableProps = {
  articlesWithUser: articlePropsWithUser[];
};

const columns: ColumnDef<articlePropsWithUser>[] = [
  {
    accessorKey: "article_cover",
    header: "",
    cell: ({ row }) => (
      <Image
        src={row.original.article_cover}
        alt={row.original.article_title}
        width={150}
        height={150}
        className="rounded-lg"
      />
    ),
  },
  {
    accessorKey: "article_title",
    header: "Articles",
  },
  {
    accessorKey: "user.user_fullname",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      return formattedDate;
    },
  },
  {
    accessorKey: "article_status",
    header: "Status",
    cell: ({ row }) => {
      if (row.original.article_status === "pending") {
        return <span className="text-yellow-500">In progress</span>;
      } else if (row.original.article_status === "public") {
        return <span className="text-green-500">Approved</span>;
      } else {
        return <span className="text-red">Disapproved</span>;
      }
    },
  },
];

const TaskTable: React.FC<taskTableProps> = ({ articlesWithUser }) => {
  const [data, setData] = useState<articlePropsWithUser[]>(
    articlesWithUser ? articlesWithUser : []
  );
  const [columnFilters, setColumFilters] = useState<
    {
      id: string;
      value: string;
    }[]
  >([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-3">
        <Filter
          setColumFilters={setColumFilters}
          columnFilters={columnFilters}
        />
        <FilterStatus
          setColumFilters={setColumFilters}
          columnFilters={columnFilters}
        />
      </div>
      <Table w={1000} striped withTableBorder>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td>No result</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <button onClick={() => table.previousPage()}>back</button>
      <button onClick={() => table.nextPage()}>next</button>
    </div>
  );
};

export default TaskTable;
