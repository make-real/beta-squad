import { useUserInfoContext } from "../../context/UserInfoContext";
import { Link, useNavigate } from "react-router-dom";
import { userRecoverPassword, userSignIn } from "../../hooks/useFetch";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { Loader } from "../Loader";
import images from "../../assets";
import useAuth from "../../hooks/auth";
import loginImg from "../../assets/images/OBJECTS.svg";
import { RiErrorWarningLine } from "react-icons/ri";
import CodeVerificationForm from "./CodeVerificationForm";
import { useMatchMedia } from "../../hooks/useMatchMedia";

const Login = () => {
  const navigate = useNavigate();
  const isDesktopResolution = useMatchMedia("(max-width:600px)", true);
  const { setLoginUserInfo } = useUserInfoContext();
  const [loader, setLoader] = useState(false);
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [errorInfo, setErrorInfo] = useState({
    email: "",
    password: "",
    error: "",
  });
  const { loader: gloader, error, googleAuth } = useAuth();
  const [type, setType] = useState(true);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setErrorInfo({});
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await userSignIn(userInput);
      

      if (data?.loggedUser?.emailVerified) {
        // store user (JWT token) + (user ID) into local storage...
        localStorage.setItem("userInfo", JSON.stringify(data?.loggedUser));
        localStorage.setItem("jwt", JSON.stringify(data?.jwtToken));
        localStorage.setItem("userId", JSON.stringify(data?.loggedUser._id));
        localStorage.setItem("fullSidebar", "show");
        // login user data send to ContextAPI for globally user ID sharing or many more need full logic...
        setLoginUserInfo(data?.loggedUser);

        // navigate user into user profile page...

        if (isDesktopResolution) {
          navigate("/welcomeuser");
        } else {
          navigate("/projects");
        }

        setLoader(false);
      } else {
        setErrorInfo((pre) => ({
          ...pre,
          error: "Please verify your Email Address",
        }));
      }
    } catch (error) {
      setLoader(false);

      setErrorInfo((pre) => ({
        ...pre,
        email: error.response.data?.issue?.email,
      }));
      setErrorInfo((pre) => ({
        ...pre,
        password: error.response.data?.issue?.password,
      }));
    }
  };

  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotCodeSend, setForgotCodeSend] = useState(false);
  const handleForgotPassword = async (e) => {
    setLoader(true);
    setErrorInfo({});
    e?.preventDefault();

    try {
      const { data } = await userRecoverPassword({
        emailOrPhone: userInput.email,
      });
      setLoader(false);

      sessionStorage.setItem(
        "sessionUUID",
        JSON.stringify(data.session.sessionUUID)
      );
      sessionStorage.setItem("userEmail", JSON.stringify(userInput.email));
      setForgotCodeSend(true);
    } catch (error) {
      setLoader(false);
      setErrorInfo((pre) => ({
        ...pre,
        email: error.response?.data?.issue?.message,
      }));

    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const [from, setFrom] = useState("forgotPassword");

  return (
    <section className="lg:flex h-full  lg:justify-between  lg:items-center w-[70%]  gap-10  mx-auto">
      {/* left side */}
      <div className="w-[455px]   hidden xl:flex md:flex lg:flex lg:visible ">
        <div className="pt-10">
          <div className="pt-8 pl-9 pr-4 text-sm">
            <img src={loginImg} alt="bg2" className="w-full top-8 left-8" />
          </div>
        </div>
      </div>
      {/* right side */}
      {forgotCodeSend ? (
        <CodeVerificationForm
          loader={loader}
          setLoader={setLoader}
          from={from}
          handleForgotPassword={handleForgotPassword}
        />
      ) : forgotPassword ? (
        <div className="mt-20 bg-white lg:px-10 py-2 rounded-md lg:w-[40%] xl:w-[50%] mx-auto my-8 ">
          <div className="space-y-2 mb-8">
            <h2 className="font-bold lg:text-2xl xl:text-2xl text-lg">
              Forgot Password
            </h2>
            <p className="text-gray-500 text-xs">
              Provide your account’s email for which you want to reset your
              password{" "}
              <button
                className="text-[#0D1282]"
                onClick={() => {
                  setForgotPassword(false);
                  setErrorInfo({});
                }}
              >
                Remembered the password?
              </button>
            </p>
          </div>

          <form
            className="flex flex-col justify-center mx-auto gap-8 w-full"
            onSubmit={handleForgotPassword}
          >
            <span>
              <label
                className="block text-xs text-gray-500 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <span className="relative">
                <img
                  className="absolute left-2 top-0.5"
                  src={images.emailIcon}
                  alt=""
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-[#ECECEC] w-full pl-8 py-2.5 rounded outline-[#0D1282] placeholder:text-xs text-sm"
                  placeholder="Enter email address"
                  onChange={handleUserInput}
                />
              </span>
              {errorInfo.email && (
                <span className="flex justify-start items-center gap-1 mt-2">
                  <RiErrorWarningLine className="text-[#FF3659]" />
                  <p className="text-xs text-[#FF3659]">{errorInfo.email}</p>
                </span>
              )}
            </span>

            <div>
              <button className="w-full py-2.5 text-white text-xs bg-[#0D1282] rounded">
                {loader ? <Loader dark /> : "Next"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white lg:px-10 py-2 mt-20 rounded-md lg:w-[40%] xl:w-[50%] mx-auto my-8">
          <div className="space-y-2 mb-8">
            <h2 className="font-bold lg:text-2xl xl:text-2xl text-lg">Login</h2>
            <p className="text-gray-500 text-xs">
              Don't have an account?{" "}
              <Link className="text-[#0D1282]" to="/register">
                Register
              </Link>
            </p>
          </div>

          <form
            className="flex flex-col gap-8 w-full mx-auto"
            onSubmit={handleSubmit}
          >
            <span>
              <label
                className="block text-xs text-gray-500 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <span className="relative">
                <img
                  className="absolute left-2 top-0.5"
                  src={images.emailIcon}
                  alt=""
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-[#ECECEC] w-full pl-8 py-2.5 rounded outline-blue-600 placeholder:text-xs text-sm"
                  placeholder="Enter email address"
                  onChange={handleUserInput}
                />
              </span>
              {errorInfo.email && (
                <span className="flex justify-start items-center gap-1 mt-2">
                  <RiErrorWarningLine className="text-[#FF3659]" />
                  <p className="text-xs text-[#FF3659]">{errorInfo.email}</p>
                </span>
              )}
            </span>
            <span>
              <label
                className="block text-xs text-gray-500 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <span className="relative">
                <img
                  className="absolute left-2 top-0"
                  src={images.lockIcon}
                  alt=""
                />
                <input
                  type={type ? "password" : "text"}
                  name="password"
                  id="password"
                  className="bg-[#ECECEC] w-full pl-8 py-2.5 rounded outline-pink-400 placeholder:text-xs text-sm"
                  placeholder="Enter password"
                  onChange={handleUserInput}
                />

                <img
                  className="absolute right-2 top-[1px]"
                  src={images.hideIcon}
                  alt=""
                  onClick={() => setType(!type)}
                />
              </span>
              {errorInfo.password && (
                <span className="flex justify-start items-center gap-1 mt-2">
                  <RiErrorWarningLine className="text-[#FF3659]" />
                  <p className="text-xs text-[#FF3659]">{errorInfo.password}</p>
                </span>
              )}
            </span>
            <div className="flex justify-between items-center w-full ">
              <span className="flex gap-1">
                <input type="checkbox" name="remember" id="remember" />
                <p className="text-xs text-gray-500">Remember me</p>
              </span>
              <button
                className="text-xs text-[#0D1282"
                onClick={() => {
                  setForgotPassword(true);
                  setErrorInfo({});
                }}
              >
                Forgot Password?
              </button>
            </div>
            <div>
              <button className="w-full py-2.5 text-white text-xs bg-[#0D1282] rounded">
                Login
              </button>
            </div>

            {errorInfo.error && (
              <span className="flex justify-start items-center gap-1 mt-2">
                <RiErrorWarningLine className="text-[#FF3659]" />
                <p className="text-xs text-[#FF3659]">
                  {errorInfo.error}{" "}
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      setForgotCodeSend(true);
                      setFrom("verify");
                      setLoader(false);
                    }}
                  >
                    verify
                  </button>
                </p>
              </span>
            )}
          </form>
          <button
            className="w-full py-2.5 text-[#0D1282] text-xs bg-[#E0F7FF] rounded flex justify-center items-center gap-2 mt-5"
            onClick={googleAuth}
          >
            {gloader ? (
              <Loader />
            ) : (
              <>
                <img src={images.googleIcon} alt="" /> Sign in with google
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default Login;
