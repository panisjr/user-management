import { useState } from "react";
import DataTable from "./components/DataTable";
import { AuthProps } from "./types";
import { CiCirclePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const Dashboard: React.FC<AuthProps> = ({ users, setUsers }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [addModal, setAddModal] = useState<boolean>(false);

  const addUser = (email: string, password: string) => {
    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      Swal.fire({
        icon: "error",
        title: "Sign Up!",
        text: "Username already exists.",
      });
    } else if (email.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Signing Up!",
        text: "Username field is empty.",
      });
    } else if (password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Signing Up!",
        text: "Password field is empty.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Signed up successfully!",
      });

      setUsers([
        ...users,
        { email, password, date: new Date().toISOString() },
      ]);
      setEmail("");
      setPassword("");
    }
  };
  const closeAddModal = () => {
    setAddModal(false);
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className="flex items-center p-5">
        <button
          className="gap-3 border text-white bg-blue-600 px-3 py-2 rounded-md cursor-pointer hover:bg-white hover:text-black duration-300 flex item-center"
          onClick={() => setAddModal(true)}
        >
          <p>Add User</p>
          <CiCirclePlus className="w-6 h-6" />
        </button>
      </div>
      {users ? (
        <>
          <DataTable users={users} setUsers={setUsers} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <i>No user data</i>
        </div>
      )}
      {addModal && (
        <>
          <div className="fixed inset-0 bg-black/30 flex flex-col items-center justify-center poppins-regular">
            <div className="relative inset top-0 bg-white flex flex-col items-center justify-center border border-slate-300 shadow-lg shadow-slate-500 rounded-md p-10 gap-5">
              <div className="w-full flex items-center justify-end">
                <RxCross2
                  className="w-5 h-5 cursor-pointer hover:text-red-500 duration-300"
                  onClick={() => closeAddModal()}
                />
              </div>
              <p className="font-bold text-2xl w-full flex items-center justify-center">
                Add User
              </p>

              {/* Input Fields */}
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center gap-3">
                  <div className="border-b px-3 py-2 flex items-center gap-3">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="outline-none"
                      placeholder="Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="border-b px-3 py-2 flex items-center gap-3">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="outline-none"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Add User Button */}
              <div className="w-full flex items-center justify-center">
                <button
                  className="bg-yellow-500 border border-yellow-500 w-full py-2 rounded-md cursor-pointer hover:bg-white duration-300"
                  onClick={() => addUser(email.trim(), password.trim())}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
