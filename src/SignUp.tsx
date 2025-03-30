import { Link } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
import { useState } from "react";
import Swal from "sweetalert2";
import { AuthProps } from "./types";


const SignUp: React.FC<AuthProps> = ({ users, setUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (username: string, password: string) => {
    const foundUser = users.find((user) => user.username === username);
    
    if (foundUser) {
      Swal.fire({
        icon: "error",
        title: "Sign Up!",
        text: "Username already exists.",
      });
    } else if (username.trim() === "") {
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
      setUsers([...users, { username, password, date: new Date().toISOString() }]);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center poppins-regular">
      <div className="flex flex-col items-center justify-center border border-slate-300 shadow-lg shadow-slate-500 rounded-md p-10 gap-10">
        {/* Logo */}
        <div className="flex items-start w-full">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="cursor-pointer w-14 h-14"
            />
            <p>Ramz</p>
          </Link>
        </div>
        <p className="font-bold text-2xl w-full flex items-center justify-center">
          Sign Up
        </p>

        {/* Input Fields */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <FiUser className="w-6 h-6" />
            <div className="border-b px-3 py-2 flex items-center gap-3">
              <input
                type="text"
                name="username"
                id="username"
                className="outline-none"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FiLock className="w-6 h-6" />
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

        {/* Sign Up Button */}
        <div className="w-full flex items-center justify-center border-b pb-8">
          <button
            className="bg-yellow-500 border border-yellow-500 w-full py-2 rounded-md cursor-pointer hover:bg-white duration-300"
            onClick={() => handleSignUp(username, password)}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Link */}
        <div className="flex items-center gap-2">
          <i>Already have an account?</i>
          <Link to="/signIn" className="text-yellow-500">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
