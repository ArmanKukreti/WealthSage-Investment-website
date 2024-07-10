import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/login`,
        userData
      );
      const user = await response.data.user;
      setCurrentUser(user);
      navigate("/my-dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-center",
          style: { marginTop: "60px" },
        });
      } else {
        toast.error(
          "An error occurred while loggging in. Please try again later.",
          {
            position: "top-right",
            style: { marginTop: "40px" },
          }
        );
      }
    }
  };

  return (
    <div className="min-h-screen gradient-bg-welcome">
      <Navbar />
      <Toaster />
      <div className="h-[90vh] flex justify-center items-center">
        <section className="w-full lg:w-auto px-5 py-6 flex flex-col white-glassmorphism gap-6">
          <h2 className="text-3xl sm:text-3xl text-white text-center">Login</h2>
          <form className="" onSubmit={loginUser}>
            <div className="relative my-4">
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={changeInputHandler}
                className="peer block w-80 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600"
                placeholder=" "
                autoFocus
              />
              <label
                htmlFor="email"
                className="absolute text-lg text-white duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] left-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-80 peer-focus:scale-75 peer-focus:-translate-y-8  peer-focus:left-0 peer-focus:text-blue-600"
              >
                Email
              </label>
            </div>

            <div className="relative my-4">
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={changeInputHandler}
                className="peer mt-8 block w-80 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-lg text-white duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] left-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-80 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:left-0 peer-focus:text-blue-600"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 mb-4 text-[18px] rounded bg-blue-500 py-2 hover:bg-blue-600 transition-colors duration-300 text-white"
            >
              Submit
            </button>
          </form>

          <small className="text-white text-xs">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-500">
              Signup here
            </Link>
          </small>
        </section>
      </div>
    </div>
  );
};

export default Login;
