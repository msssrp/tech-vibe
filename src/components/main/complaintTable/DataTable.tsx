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
import { Pagination, Table } from "@mantine/core";
import Image from "next/image";
import Filter from "./Filter";
import FilterStatus from "./FilterStatus";
import { TbArrowsSort } from "react-icons/tb";
import { compalintPropsWithArticleAndUser } from "@/types/complaint/complaint";
import ComplaintInteract from "@/app/(manage)/manage/complaint/component/ComplaintInteract";
import Link from "next/link";

type taskTableProps = {
  complaintWithArticelAndUser: compalintPropsWithArticleAndUser[];
};

const columns: ColumnDef<compalintPropsWithArticleAndUser>[] = [
  {
    accessorKey: "article_cover",
    header: "",
    cell: ({ row }) => (
      <div className="h-24 w-40 relative">
        <Image
          src={row.original.article.article_cover}
          alt={row.original.article.article_title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    accessorKey: "article.article_title",
    header: "Articles",
    cell: ({ row }) => {
      const userWithHyphen = row.original.article.user.user_fullname
        .replace(/ /g, "-")
        .replace(/-$/, "");
      const articleTitleWithHypen = row.original.article.article_title
        .replace(/ /g, "-")
        .replace(/\//, "&");
      const firstArticleId = row.original.article_id.split("-")[0];
      const articleSlug = articleTitleWithHypen + "-" + firstArticleId;
      return (
        <Link
          href={`/complaint-preview/${row.original.complaint_id}/${userWithHyphen}/${articleSlug}`}
        >
          <span className="font-semibold">
            {row.original.article.article_title}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "user.user_fullname",
    header: "Reporter Name",
  },
  {
    accessorKey: "complaint_description",
    header: "Complaint",
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
    accessorKey: "complaint_status",
    header: "Status",
    cell: ({ row }) => {
      const {
        complaint_status,
        article,
        article: { article_title, user_id },
      } = row.original;
      if (article.article_status === "complaint") {
        return (
          <button className="btn btn-sm bg-green-500 text-white">
            {article.article_status}
          </button>
        );
      }
      switch (complaint_status) {
        case "pending":
          return (
            <button className="btn btn-sm bg-orange-500 text-white">
              {complaint_status}
            </button>
          );
        default:
          return (
            <button className="btn btn-sm bg-red text-white">
              {complaint_status}
            </button>
          );
      }
    },
  },
  {
    accessorKey: "complaint_mod_comment",
    header: "Comment",
    cell: ({ row }) => {
      if (!row.original.complaint_mod_comment) return "-";
      return row.original.complaint_mod_comment;
    },
  },
];

const DataTable: React.FC<taskTableProps> = ({
  complaintWithArticelAndUser,
}) => {
  const [data, setData] = useState<compalintPropsWithArticleAndUser[]>(
    complaintWithArticelAndUser ? complaintWithArticelAndUser : []
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
