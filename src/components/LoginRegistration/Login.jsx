import { useUserInfoContext } from "../../context/UserInfoContext";
import { Link, useNavigate } from "react-router-dom";
import { userSignIn } from "../../hooks/useFetch";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import images from "../../assets";
import Loader from "../Loader";


const Login = () => {

  const navigate = useNavigate();
  const { setLoginUserInfo } = useUserInfoContext();
  const [loader, setLoader] = useState(false);
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [errorInfo, setErrorInfo] = useState({ email: "", password: "" });


  // collect all user input data from UI
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };


  // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
  // User Info send to backend for registration...
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await userSignIn(userInput);

      // login user data send to ContextAPI for globally user ID sharing or many more need full logic...
      setLoginUserInfo(data.loggedUser);

      // store user (JWT token) + (user ID) into local storage...
      localStorage.setItem("jwt", JSON.stringify(data.jwtToken));
      localStorage.setItem("userId", JSON.stringify(data.loggedUser._id));

      // navigate user into user profile page...
      navigate("/projects");
      setLoader(false);
    } catch (error) {
      setLoader(false);
      // console.log(error);
      setErrorInfo((pre) => ({ ...pre, email: error.response.data?.issue?.email }));
      setErrorInfo((pre) => ({ ...pre, password: error.response.data?.issue?.password }));
    }
  };


  return (
    <section className="flex">
      {/* left side */}
      <div className="w-[455px] min-h-screen text-white bg-cover bg-center bg-[url('/src/assets/images/loginPage.png')]">
        <div className="pt-[80px]">
          <h6 className="text-2xl text-center">HeySpace</h6>

          <div className="pt-8 pl-9 pr-4 text-sm relative">
            <img
              src={images.signIn1}
              alt="bg"
              className="w-52 absolute bottom-36 right-14 z-10"
            />
            <img
              src={images.signIn2}
              alt="bg2"
              className="w-96 absolute top-8 left-8"
            />

            <div className="pt-[70px] pb-10 px-3 mt-72">
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

          <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
            <div className="text-sm relative">
              <label htmlFor="email" className="text-gray-700">
                Email:
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="email@company.com"
                className={`w-full border rounded-xl py-1.5 px-2 outline-blue-100 ${errorInfo.email && "border-red-500"
                  }`}
                onChange={handleUserInput}
              />
              {errorInfo.email && (
                <span className="absolute top-[102%] right-0 text-red-500">
                  {errorInfo.email}
                </span>
              )}
            </div>

            <div className="text-sm relative">
              <label htmlFor="password" className="text-gray-700">
                Password:
              </label>
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full border rounded-xl py-1.5 px-2 outline-blue-100 ${errorInfo.password && "border-red-500"
                  }`}
                onChange={handleUserInput}
              />
              {errorInfo.password && (
                <span className="absolute top-[102%] right-0 text-red-500">
                  {errorInfo.password}
                </span>
              )}
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className={`py-2 w-full bg-[#C595C6] text-yellow-50 rounded-lg`}
              >
                {loader ? <Loader dark /> : "Sign in"}
              </button>
            </div>
          </form>

          <div className="pt-[80px] text-center">
            <span className="text-sm ">Companies who love HeySpace</span>
          </div>

          <div className="my-4 flex justify-between">
            <img src={images.timeCamp} alt="" className=" w-[100px] h-7" />
            <img src={images.remoteCamp} alt="" className=" w-[100px] h-7" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Login);

// "jwtToken": "",
// "loggedUser": {
//     "_id":
//     "fullName":
//     "username":
//     "email":
//     "phone":
//     "emailVerified":
//     "phoneVerified":
//     "createdAt":
//     "updatedAt":
//     "__v":
// }
