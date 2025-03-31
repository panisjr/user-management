import { AuthProps, User } from "../types";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useState } from "react";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";

const DataTable: React.FC<AuthProps> = ({ users, setUsers }) => {
  const [newUsername, setNewUsername] = useState<string>("");
  const [handleUser, setHandleUser] = useState<string>("");
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // Delete User
  const handleDeleteUser = (email: string) => {
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
  const handleEditUser = (email: string) => {
    setHandleUser(email);
    setNewUsername(email);
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
            user.email === handleUser
              ? { ...user, email: newUsername }
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

  // View User Modal
  const viewUser = (email: string) => {
    const findUser = users.find((a) => a.email === email);
    if (findUser) {
      setViewModal(true);
      setEmail(findUser.email);
      setDate(findUser.date);
    }
  };
  // Close View User Modal
  const closeAddModal = () => {
    setViewModal(false);
    setEmail("");
    setDate("");
  };
  return (
    <div className="p-4 poppins-regular px-52">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="border border-black bg-gray-800 text-white">Email</th>
            <th className="border border-black bg-gray-800 text-white">First Name</th>
            <th className="border border-black bg-gray-800 text-white">Last Name</th>
            <th className="border border-black bg-gray-800 text-white">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item, index) => (
              <tr key={index} className="even:bg-gray-200" onClick={() => setViewModal(true)}>
                <td className="border text-center">{item.email}</td>
                <td className="border text-center">{item.firstname}</td>
                <td className="border text-center">{item.lastname}</td>
                <td className="border text-center">{item.date}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Edit User */}
      {handleUser && (
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
                  setNewUsername("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {viewModal && (
        <div className="fixed inset-0 bg-black/30 flex flex-col items-center justify-center poppins-regular">
          <div className="relative inset top-0 p-5 bg-white shadow-md rounded-md">
            <div className="w-full flex items-center justify-end">
              <RxCross2
                className="w-5 h-5 cursor-pointer hover:text-red-500 duration-300"
                onClick={() => closeAddModal()}
              />
            </div>
            <span className="flex gap-3">
              <label htmlFor="email">Username:</label>
              <p>{email}</p>
            </span>
            <span className="flex gap-3">
              <label htmlFor="date">Date Created:</label>
              <p>{date}</p>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
