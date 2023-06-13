import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState();

  const navigate = useNavigate();
  // const url = "http://localhost:5000";
  const url = "https://nutrimenu-iwz5mppixq-et.a.run.app";

  const loginAkun = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${url}/api/v1/admin/login`, {
        email: email,
        password: password,
      });
      //   console.log("ini res login :", res);
      const objectDataLogin = {
        id: res.data.admin.uuid,
      };

      await sessionStorage.setItem(
        "id-cms-admin-user",
        JSON.stringify(objectDataLogin)
      );
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setIsError(error.response);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("user-info")) {
      navigate("/dashboard");
    }
  });

  return (
    <>
      <div className="container bg-slate-200 w-80 mx-auto my-10 p-8">
        <form>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            onClick={loginAkun}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
      {isError && isError ? <Alert message={isError.data.message} /> : ""}
    </>
  );
};

export default Login;
