import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // Use React Router for navigation
import Swal from "sweetalert2";
import { AuthProps } from "./types";

const SignIn: React.FC<AuthProps> = ({ users }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useNavigate();

  const handleSignIn = (username: string, password: string) => {
    const foundUser = users.find((user) => user.username === username);

    if (!foundUser) {
      Swal.fire({
        icon: "error",
        title: "Signing In!",
        text: "Can't find your account, make sure you fill the fields correctly.",
      });
    } else if (username === "") {
      Swal.fire({
        icon: "error",
        title: "Signing In!",
        text: "Username field is empty.",
      });
    } else if (password === "") {
      Swal.fire({
        icon: "error",
        title: "Signing In!",
        text: "Password field is empty.",
      });
    } else if (
      foundUser?.username != username ||
      foundUser?.password != password
    ) {
      Swal.fire({
        icon: "error",
        title: "Signing In!",
        text: "Your Username or Password is incorrect.",
      });
    }
    if (foundUser?.username === username && foundUser?.password === password) {
      router("/dashboard");
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
            <img src="/images/logo.png" className="cursor-pointer w-14 h-14" />
            <p>Ramz</p>
          </Link>
        </div>
        <p className="font-bold text-2xl">Sign In</p>

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

        {/* Sign In Button */}
        <div className="w-full flex items-center justify-center border-b pb-8">
          <button
            className="flex items-center justify-center bg-yellow-500 border border-yellow-500 w-full py-2 rounded-md cursor-pointer hover:bg-white duration-300"
            onClick={() => handleSignIn(username, password)}
          >
            Sign In
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="flex items-center gap-2">
          <i>Don't have an account?</i>
          <Link to="/signUp" className="text-yellow-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
