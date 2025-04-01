import { useState } from "react";
import DataTable from "./components/DataTable";
import { AuthProps } from "./types";
import { CiCirclePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

const Dashboard: React.FC<AuthProps> = ({ users, setUsers }) => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [addModal, setAddModal] = useState<boolean>(false);

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      Swal.fire({
        icon: "error",
        title: "Sign Up!",
        text: "Email already exists.",
      });
    } else if (email.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Signing Up!",
        text: "Email field is empty.",
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
        {
          email,
          firstname,
          lastname,
          password,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        },
      ]);
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    }
  };

  const closeAddModal = () => {
    setAddModal(false);
    setFirstname("");
    setPassword("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
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
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/30">
          {/* Input Fields */}
          <form
            onSubmit={addUser}
            className="bg-white p-5 rounded-md border border-gray-300 shadow-lg"
          >
            <div className="w-full flex items-center justify-end">
              <RxCross2
                className="w-6 h-6 hover:text-red-500 cursor-pointer duration-300"
                onClick={() => closeAddModal()}
              />
            </div>
            <p className="font-bold text-2xl w-full flex items-center justify-center py-10">
              Add Account
            </p>
            <div className="flex flex-col items-center gap-5">
              <div className="flex gap-2">
                {/* First Name */}
                <div className="flex items-center gap-3">
                  <div className="border rounded-md px-3 py-2 flex items-center gap-3">
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="outline-none"
                      placeholder="First Name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>
                {/* Last Name */}
                <div className="flex items-center gap-3">
                  <div className="border rounded-md px-3 py-2 flex items-center gap-3">
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="outline-none"
                      placeholder="Last Name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full">
                <div className="w-full border rounded-md px-3 py-2 flex items-center gap-3">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="w-full flex items-center gap-3">
                <div className="w-full border rounded-md px-3 py-2 flex items-center gap-3">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            {/* Sign Up Button */}
            <div className="w-full flex items-center justify-center py-8">
              <button
                type="submit"
                className="bg-yellow-500 border border-yellow-500 text-white w-full py-2 rounded-md cursor-pointer hover:text-yellow-500 hover:bg-white duration-300"
              >
                Add user
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Dashboard;
