"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { articlePropsWithUser } from "@/types/article/article";
import { Pagination, Table } from "@mantine/core";
import Image from "next/image";
import Filter from "./Filter";
import FilterStatus from "./FilterStatus";
import { TbArrowsSort } from "react-icons/tb";
import ApproveBtn from "@/app/(manage)/component/ApproveBtn";
import Link from "next/link";
type taskTableProps = {
  articlesWithUser: articlePropsWithUser[];
};

const columns: ColumnDef<articlePropsWithUser>[] = [
  {
    accessorKey: "article_cover",
    header: "",
    cell: ({ row }) => (
      <div className="h-24 w-40 relative">
        <Image
          src={row.original.article_cover}
          alt={row.original.article_title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    accessorKey: "article_title",
    header: "Articles",
    cell: ({ row }) => {
      const userWithHyphen = row.original.user.user_fullname
        .replace(/ /g, "-")
        .replace(/-$/, "");
      const articleTitleWithHypen = row.original.article_title
        .replace(/ /g, "-")
        .replace(/\//, "&");
      const firstArticleId = row.original.article_id.split("-")[0];
      const articleSlug = articleTitleWithHypen + "-" + firstArticleId;
      return (
        <>
          {row.original.article_status === "public" ? (
            <Link href={`/${userWithHyphen}/${articleSlug}`}>
              <span className="font-semibold">
                {row.original.article_title}
              </span>
            </Link>
          ) : row.original.article_status === "pending" ? (
            <Link href={`preview/${userWithHyphen}/${articleSlug}`}>
              <span className="font-semibold">
                {row.original.article_title}
              </span>
            </Link>
          ) : (
            <span className="font-semibold">{row.original.article_title}</span>
          )}
        </>
      );
    },
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
      const { article_status } = row.original;
      switch (article_status) {
        case "pending":
          return (
            <span className="bg-yellow-500 btn btn-sm text-white">
              In progress
            </span>
          );
        case "public":
          return (
            <span className="bg-green-500 btn btn-sm text-white">Approved</span>
          );
        case "complaint":
          return (
            <span className="bg-orange-500 btn btn-sm text-white">
              Complainted
            </span>
          );

        default:
          return (
            <span className="bg-red btn btn-sm text-white">Disapproved</span>
          );
      }
    },
  },
];

const DataTable: React.FC<taskTableProps> = ({ articlesWithUser }) => {
  const [data, setData] = useState<articlePropsWithUser[]>(
    articlesWithUser ? articlesWithUser : []
  );
  const [columnFilters, setColumFilters] = useState<
    {
      id: string;
      value: string;
    }[]
  >([]);
  const [activePage, setPage] = useState(1);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination: {
        pageIndex: activePage - 1,
        pageSize: 5,
      },
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
      <Table striped withTableBorder>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.Th key={header.id}>
                  <div className="flex items-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.columnDef.header &&
                      header.column.getCanSort() && (
                        <TbArrowsSort
                          className="ml-1 cursor-pointer"
                          onClick={header.column.getToggleSortingHandler()}
                        />
                      )}
                  </div>
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
      <Pagination
        mt={15}
        total={table.getPageCount()}
        color="cyan"
        size={"sm"}
        value={activePage}
        onChange={setPage}
        onNextPage={() => table.nextPage()}
        onPreviousPage={() => table.previousPage()}
      />
    </div>
  );
};

export default DataTable;
