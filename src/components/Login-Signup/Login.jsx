import React from "react";
import icon1 from "../../assets/timecamp.png";
import icon2 from "../../assets/remotecamp.png";
import bg1 from "../../assets/signIn2.png";
import bg2 from "../../assets/signIn1.png";

import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="flex">
      {/* left side */}
      <div className="w-[455px] min-h-screen  text-white bg-cover bg-center bg-[url('/src/assets/loginPage.png')]">
        <div className="pt-[80px]">
          <h6 className="text-2xl text-center">HeySpace</h6>

          <div className="pt-8 pl-9 pr-4 text-sm">
            <div className="relative">
              <img src={bg1} alt="bg" className="w-full" />
              <img src={bg2} alt="bg2" className="absolute left-1/2 top-1/2" />
            </div>
            <div className="pt-[70px] pb-10 px-3">
              <h6 className="font-bold">Hey space tip</h6>
              <p>
                Did someone say something brilliant? Add his/ her message into
                to-do list. Just click on arrow icon which shows up when your
                cursor is in the message.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="mx-9 pt-[60px] flex-1">
        <div className="flex justify-end">
          <h6 className="my-auto text-gray-400 pr-2">Don't have an account?</h6>

          <Link
            to="/register"
            className="py-2 px-6 border-2 border-[#C595C6] text-[#C595C6]	 rounded-md "
          >
            sign up
          </Link>
        </div>

        <div className="w-[400px]  mx-auto mt-8">
          <h2 className="text-center text-2xl font-bold text-cyan-800	">
            Sign in to HeySpace
          </h2>

          <div className="cursor-pointer flex justify-center p-1.5 mt-4 rounded-md bg-gray-50 border hover:bg-gray-200 w-full text-gray-600 hover:text-gray-900">
            <FcGoogle className="my-auto text-center mr-1.5" />{" "}
            <span className="text-sm">Sign in with Google</span>
          </div>

          <div className="border-b-2 border-gray-100 pt-5 text-gray-100 relative">
            <span className="absolute left-1/2 top-1.5 bg-white  px-1.5 -translate-x-1/2 ">
              or
            </span>
          </div>

          <form className="space-y-3 mt-5">
            <div className="text-sm">
              <label For="email" className="text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@company.com"
                className="w-full border rounded-xl py-1.5 px-2 outline-blue-100"
              />
            </div>

            <div className="text-sm">
              <label For="password" className="text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full border rounded-xl py-1.5 px-2 outline-blue-100"
              />
            </div>

            <div className="text-center">
              <button className="py-2 w-full bg-[#C595C6] text-yellow-50 rounded-lg ">
                <Link to="/projects"> Get started now</Link>
              </button>
            </div>
          </form>

          <div className="pt-[80px] text-center">
            <span className="text-sm ">Companies who love HeySpace</span>
          </div>

          <div className="my-4 flex justify-between">
            {" "}
            <img src={icon1} alt="" className=" w-[100px] h-7" />
            <img src={icon2} alt="" className=" w-[100px] h-7" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
