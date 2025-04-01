import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { AuthProps } from "./types";

const SignUp: React.FC<AuthProps> = ({ users, setUsers }) => {
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
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
        <p>Create your account</p>
        {/* Input Fields */}
        <form onSubmit={handleSignUp}>
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
          <div className="w-full flex items-center justify-center border-b py-8">
            <button
              type="submit"
              className="bg-yellow-500 border border-yellow-500 text-white w-full py-2 rounded-md cursor-pointer hover:text-yellow-500 hover:bg-white duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

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
