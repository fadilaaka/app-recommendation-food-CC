import React from "react";
import {
  FaHome,
  FaUserAlt,
  FaLeaf,
  FaBook,
  FaAddressBook,
  FaRegCalendarAlt,
  FaClipboardCheck,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <Link
                to="/"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <FaHome size={25} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link
                to="/users"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <FaUserAlt size={25} />
                <span>Users</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link
                to="/foods"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <FaLeaf size={25} />
                <span>Foods</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link
                to="/articles"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <FaBook size={25} />
                <span>Articles</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
