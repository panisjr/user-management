import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { AuthProps, User } from "../types";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useState } from "react";
import Swal from "sweetalert2";

const DataTable: React.FC<AuthProps> = ({ users, setUsers }) => {
  const [newUsername, setNewUsername] = useState<string>("");
  const [handleUser, setHandleUser] = useState<string>("");

  // Delete User
  const handleDeleteUser = (username: string) => {
    const findUser = users.find((a) => a.username === username);
    if(findUser){
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setUsers(users.filter((a) => a.username !== username));

          setHandleUser("");
          setNewUsername("");
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    }
  };
  // Start editing a user
  const handleEditUser = (username: string) => {
    setHandleUser(username);
    setNewUsername(username);
  };
  // Update User
  const handleUpdateUser = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.username === handleUser
              ? { ...user, username: newUsername }
              : user
          )
        );

        setHandleUser("");
        setNewUsername("");
        Swal.fire({
          title: "Update!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "Username",
      // cell: ({ row }) => {
      //   const user = row.original;
      //   return handleUser === user.username ? (
      //     <input
      //       value={newUsername}
      //       onChange={(e) => setNewUsername(e.target.value)}
      //       className="border p-1 w-full"
      //       autoFocus
      //     />
      //   ) : (
      //     user.username
      //   );
      // },
    },
    {
      accessorKey: "date",
      header: "Date Created",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <button onClick={() => handleEditUser(user.username)}>
              <CiEdit className="w-5 h-5 hover:text-yellow-500 cursor-pointer duration-300" />
            </button>
            <button onClick={() => handleDeleteUser(user.username)}>
              <CiTrash className="w-5 h-5 hover:text-red-500 cursor-pointer duration-300" />
            </button>
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data: users, // Fix: Use "data" instead of "users"
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4 poppins-regular">
      <table className="border w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="p-2 border cursor-pointer"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " 🔼"
                    : header.column.getIsSorted() === "desc"
                    ? " 🔽"
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-2">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {handleUser ? (
        <div className="w-full flex items-center justify-center">
          <div className="absolute flex flex-col items-center justify-between bg-white p-10 border border-gray-200 rounded-md shadow-lg shadow-gray-300">
            <div className="border border-blue-900 rounded-md px-3 py-2 flex items-center gap-3">
              <input
                type="text"
                name="newUsername"
                id="newUsername"
                className="outline-none"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div className="w-full flex items-center justify-end py-5 gap-5 text-white">
              <button
                className="px-5 py-2 rounded-md bg-green-400 cursor-pointer hover:bg-green-500 duration-300"
                onClick={() => handleUpdateUser()}
              >
                Update
              </button>
              <button
                className="px-5 py-2 rounded-md bg-red-400 cursor-pointer hover:bg-red-500 duration-300"
                onClick={() => {
                  setHandleUser("");
                  setNewUsername(""); // Reset newUsername state
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DataTable;
