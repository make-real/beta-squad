import React, { useState } from "react";
import user2 from "../../assets/userLogin.png";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import icon1 from "../../assets/timecamp.png";
import icon2 from "../../assets/remotecamp.png";

const Register = () => {
  return (
    <section className="flex">
      {/* left side */}
      <div className="w-[455px]  text-white bg-cover bg-center bg-[url('/src/assets/loginPage.png')]">
        <div className="pt-[80px]">
          <h6 className="text-2xl text-center">HeySpace</h6>

          <div className="pt-8 pl-9 pr-4 text-sm">
            <h6 className="pb-2 font-bold">New level of collaborating:</h6>
            <ul className="list-disc space-y-2">
              <li>Private and group messaging</li>
              <li>Planning to-dos in lists and board view</li>
              <li>Adding messages into to-do lists</li>
              <li>Collaborating with an unlimited number of users</li>
              <li>Offline mode for being on top anytime and anywhere</li>
            </ul>

            <p className="pt-[110px]">
              Easy to use. Helps our office tremendously. Price is perfect
              (free). We couldn't function as an office nearly as well without
              it. Would recommend it for the most part. Really slick user
              interface. Nice features like tasks that make team interaction
              smoother.
            </p>

            <div className="flex pt-3">
              <div>
                <img src={user2} alt="" />
              </div>
              <div className="my-auto pl-2">
                <h6 className="text-base font-bold">Kamil Rudnicki</h6>
                <p className="text-xs">CEO in Timecamp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="mx-9 pt-[60px] flex-1">
        <div className="flex justify-end">
          <h6 className="my-auto text-gray-400 pr-2">
            Already have an account?
          </h6>

          <Link
            to="/login"
            className="py-2 px-6 border-2 border-[#C595C6] text-[#C595C6]	 rounded-md "
          >
            sign in
          </Link>
        </div>

        <div className="w-[400px]  mx-auto mt-8">
          <h2 className="text-center text-2xl font-bold text-cyan-800	">
            Get started with HeySpace
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
              <label For="name" className="text-gray-700">
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Smith"
                className="w-full border rounded-xl py-1.5 px-2 outline-blue-100"
              />
            </div>

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

            <div className="text-sm">
              <label For="number" className="text-gray-700">
                Phone number (optional):
              </label>
              <input
                type="tel"
                id="number"
                placeholder="Phone number.."
                className="w-full border rounded-xl py-1.5 px-2 outline-blue-100"
              />
            </div>

            <div className="text-sm">
              <input type="checkbox" id="checkbox" />
              <label For="checkbox" className="text-gray-700 pl-1">
                By creating an account you agree to the{" "}
                <Link to="/" className="underline text-[#C595C6]">
                  Terms and Service
                </Link>{" "}
                and{" "}
                <Link to="/" className="underline text-[#C595C6]">
                  Privacy Policy
                </Link>{" "}
                .
              </label>
            </div>

            <div className="text-center">
              <button className="py-2 w-full bg-[#C595C6] text-yellow-50 rounded-lg ">
                Get started now
              </button>
              <span className="text-sm ">Companies who love HeySpace</span>
            </div>
          </form>

          <div className="my-4 flex justify-between">
            <img src={icon1} alt="" className=" w-[100px] h-7" />
            <img src={icon2} alt="" className=" w-[100px] h-7" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
