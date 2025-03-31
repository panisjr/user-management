import { AuthProps, User } from "../types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const DataTable: React.FC<AuthProps> = ({ users, setUsers }) => {
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);

  // Delete User
  const handleDeleteUser = () => {
    const findUser = users.find((a) => a.email === email);
    if (findUser) {
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
          setUsers(users.filter((a) => a.email !== email));

          setFirstname("");
          setLastname("");
          setEmail("");
          setViewModal(false);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    }
  };

  // Update User
  const handleUpdateUser = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!editingEmail) {
      Swal.fire({
        title: "Error",
        text: "No user selected for updating.",
        icon: "error",
      });
      return;
    }
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
            user.email === editingEmail
              ? {
                  ...user,
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                }
              : user
          )
        );

        setFirstname("");
        setLastname("");
        setEmail("");
        setViewModal(false);
        setIsEditing(false);
        Swal.fire({
          title: "Update!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // View User Modal
  const viewUser = (email: string) => {
    const findUser = users.find((a) => a.email === email);
    if (findUser) {
      setViewModal(true);
      setFirstname(findUser.firstname ?? "");
      setLastname(findUser.lastname ?? "");
      setEmail(findUser.email);
      setDate(findUser.date);
      setEditingEmail(findUser.email);
    }
  };
  // Close View User Modal
  const closeAddModal = () => {
    setViewModal(false);
    setEmail("");
    setDate("");
  };
  // Search function
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<User[]>(users);
  const searchItems = (searchInput: string) => {
    setSearchTerm(searchInput);

    if (!searchInput.trim()) {
      setFilteredItems(users);
    } else {
      setFilteredItems(
        users.filter(
          (item) =>
            item.firstname?.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.lastname?.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.email.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  };

  //  Sorting
  const sortedBy = (column: string) => {
    let newSortOrder: "ascending" | "descending" = "ascending";

    if (sortedColumn === column && sortOrder === "ascending") {
      newSortOrder = "descending";
    }

    const sortedUsers = [...users].sort((a, b) => {
      if (column === "firstname") {
        return newSortOrder === "ascending"
          ? a.firstname?.localeCompare(b.firstname || "") || 0
          : b.firstname?.localeCompare(a.firstname || "") || 0;
      } else if (column === "lastname") {
        return newSortOrder === "ascending"
          ? a.lastname?.localeCompare(b.lastname || "") || 0
          : b.lastname?.localeCompare(a.lastname || "") || 0;
      } else if (column === "email") {
        return newSortOrder === "ascending"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      } else if (column === "date") {
        return newSortOrder === "ascending"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      }
      return 0;
    });

    setUsers(sortedUsers);
    setSortOrder(newSortOrder);
    setSortedColumn(column);
  };

  useEffect(() => setFilteredItems(users));

  return (
    <div className="poppins-regular px-52 poppins-regular">
      <div className="flex items-center gap-3">
        <input
          className="h-8 p-3 text-sm peer border border-gray-300 rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          value={searchTerm}
          onChange={(e) => searchItems(e.target.value)}
          placeholder="Search user..."
        />
        {filteredItems.length === 0 && (
          <>
            <div>
              <i>No results found</i>
            </div>
          </>
        )}
      </div>

      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th
              className="border border-black bg-gray-800 text-white cursor-pointer p-2"
              onClick={() => sortedBy("firstname")}
            >
              <span className="flex items-center justify-center">
                First Name
                {sortOrder === "ascending" ? (
                  <IoMdArrowDropdown className="w-6 h-6" />
                ) : (
                  <IoMdArrowDropup className="w-6 h-6" />
                )}
              </span>
            </th>
            <th
              className="border border-black bg-gray-800 text-white cursor-pointer p-2"
              onClick={() => sortedBy("lastname")}
            >
              <span className="flex items-center justify-center">
                Last Name
                {sortOrder === "ascending" ? (
                  <IoMdArrowDropdown className="w-6 h-6" />
                ) : (
                  <IoMdArrowDropup className="w-6 h-6" />
                )}
              </span>
            </th>
            <th
              className="border border-black bg-gray-800 text-white cursor-pointer p-2"
              onClick={() => sortedBy("email")}
            >
              <span className="flex items-center justify-center">
                Email
                {sortOrder === "ascending" ? (
                  <IoMdArrowDropdown className="w-6 h-6" />
                ) : (
                  <IoMdArrowDropup className="w-6 h-6" />
                )}
              </span>
            </th>
            <th
              className="border border-black bg-gray-800 text-white cursor-pointer p-2"
              onClick={() => sortedBy("date")}
            >
              <span className="flex items-center justify-center">
                Date Created
                {sortedColumn === "date" &&
                  (sortOrder === "ascending" ? (
                    <IoMdArrowDropdown className="w-6 h-6" />
                  ) : (
                    <IoMdArrowDropup className="w-6 h-6" />
                  ))}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 &&
            filteredItems.map((item, index) => {
              // if (item.userID === userID) {
              return (
                <tr
                  key={index}
                  className="even:bg-gray-300 cursor-pointer hover:bg-black/20"
                  onClick={() => viewUser(item.email)}
                >
                  <td className="border text-center p-2">{item.firstname}</td>
                  <td className="border text-center p-2">{item.lastname}</td>
                  <td className="border text-center p-2">{item.email}</td>
                  <td className="border text-center p-2">{item.date}</td>
                </tr>
              );
              // }
            })}
        </tbody>
      </table>

      {viewModal && (
        <div className="w-full fixed inset-0 bg-black/30 flex flex-col items-center justify-center poppins-regular">
          <div className="relative inset top-0 p-5 bg-white shadow-md rounded-md w-full max-w-110">
            <div className="w-full flex items-center justify-end">
              <RxCross2
                className="w-5 h-5 cursor-pointer hover:text-red-500 duration-300"
                onClick={() => closeAddModal()}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <button
                  className="border bg-yellow-500 flex items-center px-3 py-2 rounded-md text-white hover:bg-white hover:text-yellow-500 duration-300 gap-2 cursor-pointer"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <p>Edit</p>
                  <CiEdit className="w-5 h-5" />
                </button>
                <button
                  className="border bg-red-500 flex items-center px-3 py-2 rounded-md text-white hover:bg-white hover:text-red-500 duration-300 gap-2 cursor-pointer"
                  onClick={() => handleDeleteUser()}
                >
                  <p>Delete</p>
                  <CiTrash className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleUpdateUser}>
                <span className="flex flex-col items-center gap-3">
                  <label htmlFor="firstname" className="font-bold w-full">
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="p-2 border rounded-md w-full"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    disabled={!isEditing}
                  />
                  <label htmlFor="lastname" className="font-bold w-full">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="p-2 border rounded-md w-full"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    disabled={!isEditing}
                  />
                </span>
                <span className="flex flex-col items-center gap-3 pt-2">
                  <label htmlFor="email" className="font-bold w-full">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="p-2 border rounded-md w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                  />
                </span>
                <span className="flex flex-col items-center gap-3 pt-2">
                  <label htmlFor="date" className="font-bold w-full">
                    Date Created:
                  </label>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    className="p-2 border rounded-md w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={!isEditing}
                  />
                </span>
                {isEditing ? (
                  <div className="w-full flex items-center justify-end p-5 gap-2">
                    <button
                      type="button"
                      className="bg-red-500 border border-red-500 px-4 py-2 text-white rounded-md cursor-pointer hover:bg-white hover:border-red-500 hover:text-red-500 duration-300"
                      onClick={() => {
                        closeAddModal(), setIsEditing(!isEditing);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 border border-green-500 px-4 py-2 text-white rounded-md cursor-pointer hover:bg-white hover:border-green-500 hover:text-green-500 duration-300"
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-end p-5"></div>
                )}
              </form>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
