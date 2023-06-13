import React, { useState, useEffect } from "react";
import { FaBook, FaUserAlt, FaLeaf } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Dashboard = () => {
  // const url = "http://localhost:5000";
  const url = "https://nutrimenu-iwz5mppixq-et.a.run.app";

  const [jumlah, setJumlah] = useState();

  useEffect(() => {
    getApiViewDashboard();
  }, []);

  const getApiViewDashboard = async () => {
    const result = await axios.get(`${url}/api/v1/admin/get-dashboard`);
    // console.log(result);
    setJumlah(result.data);
  };

  return (
    <div className="flex bg-slate-800">
      <Sidebar />
      <div className="container mx-auto p-10">
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
          <div className="w-full px-4 py-5 m-2 bg-white rounded-lg shadow flex flex-row">
            <div className="left-section w-4/5">
              <div className="text-sm font-medium text-gray-500 truncate">
                Users
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                {jumlah && jumlah.users}
              </div>
            </div>
            <div className="right-section">
              <div className="icon w-14 p-3.5 bg-slate-900 text-white rounded-full mr-3 float-right">
                <FaUserAlt size={25} />
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-5 m-2 bg-white rounded-lg shadow flex flex-row">
            <div className="left-section w-4/5">
              <div className="text-sm font-medium text-gray-500 truncate">
                Foods
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                {jumlah && jumlah.foods}
              </div>
            </div>
            <div className="right-section">
              <div className="icon w-14 p-3.5 bg-slate-900 text-white rounded-full mr-3 float-right">
                <FaLeaf size={25} />
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-5 m-2 bg-white rounded-lg shadow flex flex-row">
            <div className="left-section w-4/5">
              <div className="text-sm font-medium text-gray-500 truncate">
                Articles
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                {jumlah && jumlah.articles}
              </div>
            </div>
            <div className="right-section">
              <div className="icon w-14 p-3.5 bg-slate-900 text-white rounded-full mr-3 float-right">
                <FaBook size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
