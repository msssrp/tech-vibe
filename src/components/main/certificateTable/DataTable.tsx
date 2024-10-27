"use client";
import React, { useEffect, useState } from "react";
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
import Filter from "./Filter";
import { TbArrowsSort } from "react-icons/tb";
import RevokeBtn from "@/app/(admin)/admin-dashboard/certificates/component/RevokeBtn";
import { columnDefProps } from "@/types/article/article";

type dataTableProps = {
  certificates: any[];
};

const DataTable: React.FC<dataTableProps> = ({ certificates }) => {
  const [data, setData] = useState<columnDefProps[]>();

  useEffect(() => {
    if (certificates && certificates.length > 0) {
      const mappedData = certificates.map((item) => ({
        tokenId: item[0] as number,
        ownerAddress: item[1] as string,
        ownerName: item[2] as string,
        certificateTitle: item[3] as string,
        certificateImageHash: item[4] as string,
        blogName: item[5] as string,
        timestamp: item[6] as number,
      }));
      setData(mappedData);
    }
  }, [certificates]);
  const columns: ColumnDef<columnDefProps>[] = [
    {
      accessorKey: "tokenId",
      header: "Token ID",
    },
    {
      accessorKey: "certificateTitle",
      header: "Certificate Title",
    },
    {
      accessorKey: "blogName",
      header: "Blog Name",
    },
    {
      accessorKey: "ownerName",
      header: "Owner",
    },
    {
      accessorKey: "ownerAddress",
      header: "Owner Address",
      cell: ({ row }) => {
        const truncateAddress = `${row.original.ownerAddress.slice(
          0,
          4
        )}...${row.original.ownerAddress.slice(-4)}`;
        return <p>{truncateAddress}</p>;
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        return <RevokeBtn tokenId={row.original.tokenId} setData={setData} />;
      },
    },
  ];
  const [columnFilters, setColumFilters] = useState<
    {
      id: string;
      value: string;
    }[]
  >([]);
  const [activePage, setPage] = useState(1);
  const table = useReactTable({
    data: data ? data : [],
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
