import React from "react";
import { Link } from "react-router-dom";
interface NavbarProps {
  isDashboard: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isDashboard }) => {
  return (
    <div className="flex items-center justify-around p-5 poppins-regular border-b border-b-slate-900">
      <div className="px-2 flex items-center gap-5">
        <Link to={"/"} className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="cursor-pointer w-14 h-14"
          />
          {!isDashboard && <p>Ramz</p>}
        </Link>
        <div className="px-2 flex items-center justify-center gap-5">
          <p className="cursor-pointer">Home</p>
          <p className="cursor-pointer">About</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="cursor-pointer">Sign In</button>
        <Link
          to={"/signUp"}
          className="bg-slate-900 p-3 rounded-md text-white cursor-pointer border border-slate-900 hover:bg-white hover:text-slate-900 duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
