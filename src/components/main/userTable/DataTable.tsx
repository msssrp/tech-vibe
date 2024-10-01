"use client";
import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge, Pagination, Table } from "@mantine/core";
import Image from "next/image";
import Filter from "./Filter";
import FilterStatus from "./FilterStatus";
import { TbArrowsSort } from "react-icons/tb";
import { userWithRoleProps } from "@/types/user/user";
import UserInteract from "@/app/(admin)/component/UserInteract";
type taskTableProps = {
  user: userWithRoleProps[];
  userSessionId: string;
};

const DataTable: React.FC<taskTableProps> = ({ user, userSessionId }) => {
  const [data, setData] = useState<userWithRoleProps[]>(
    user.filter((user) => user.user_id !== userSessionId)
  );
  const [columnFilters, setColumFilters] = useState<
    {
      id: string;
      value: string;
    }[]
  >([]);
  const [activePage, setPage] = useState(1);
  const [roleSortOrder, setRoleSortOrder] = useState<
    "user" | "npru" | "moderator" | "admin"
  >("user");
  const handleSort = () => {
    console.log(roleSortOrder);
    setRoleSortOrder((prevOrder) => {
      switch (prevOrder) {
        case "user":
          return "npru";
        case "npru":
          return "moderator";
        case "moderator":
          return "admin";
        case "admin":
          return "user";
        default:
          return "user";
      }
    });
  };

  const sortRoles = (roles: any) => {
    if (roleSortOrder === "moderator") {
      return roles.sort((a: any, b: any) =>
        a.user_role_name === "moderator" ? -1 : 1
      );
    } else if (roleSortOrder === "npru") {
      return roles.sort((a: any, b: any) =>
        a.user_role_name === "npru" ? -1 : 1
      );
    } else if (roleSortOrder === "admin") {
      return roles.sort((a: any, b: any) =>
        a.user_role_name === "admin" ? -1 : 1
      );
    }
    return roles.sort((a: any, b: any) =>
      a.user_role_name === "user" ? -1 : 1
    );
  };

  const columns: ColumnDef<userWithRoleProps>[] = [
    {
      accessorKey: "user_profile",
      header: "",
      cell: ({ row }) => (
        <Image
          src={row.original.user_profile}
          alt={"Techvibe user"}
          width={40}
          height={40}
          className="rounded-full hidden lg:block"
        />
      ),
    },
    {
      accessorKey: "user_fullname",
      header: "Full Name",
      cell: ({ row }) => (
        <div className="text-nowrap w-20 lg:w-auto overflow-scroll lg:overflow-auto no-scrollbar">{row.original.user_fullname}</div>
      ),
    },
    {
      accessorKey: "user_provider",
      header: "User Provider",
    },
    {
      accessorKey: "user_email",
      header: "Email",
      cell: ({ row }) => (
        <div className="line-clamp-1 w-36 lg:w-auto overflow-scroll lg:overflow-auto no-scrollbar">{row.original.user_email}</div>
      ),
    },
    {
      accessorKey: "user_verify",
      header: "Verify",
    },
    {
      accessorKey: "user_role",
      header: () => (
        <div onClick={handleSort} style={{ cursor: "pointer" }} className="w-full">
          Roles
        </div>
      ),
      cell: ({ row }) => {
        const sortedRoles = sortRoles(row.original.user_role);
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
            {sortedRoles.map((role: any) => (
              <Badge
                className="even:justify-self-auto lg:even:justify-self-end xl:even:justify-self-auto w-full lg:w-min"
                key={role.user_role_id}
                color={`${
                  role.user_role_name === "admin"
                    ? "orange"
                    : role.user_role_name === "moderator"
                    ? "violet"
                    : role.user_role_name === "npru"
                    ? "rgba(255, 41, 41, 1)"
                    : "gray"
                }`}
              >
                {role.user_role_name}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        return <div className="line-clamp-1">{formattedDate}</div>;
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        return (
          <UserInteract
            userEmail={row.original.user_email}
            userFullname={row.original.user_fullname}
            userId={row.original.user_id}
            userProfile={row.original.user_profile}
            userRoles={row.original.user_role}
          />
        );
      },
    },
  ];
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
    <div className="mt-10 bg-[#F4F2FB]">
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
