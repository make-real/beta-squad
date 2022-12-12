import { useUserInfoContext } from "../../context/UserInfoContext";
import { Link, useNavigate } from "react-router-dom";
import { userSignIn } from "../../hooks/useFetch";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { Loader } from "../Loader";
import images from "../../assets";
import useAuth from "../../hooks/auth";
import loginImg from "../../assets/images/OBJECTS.svg";
import { RiErrorWarningLine } from "react-icons/ri";

const Login = () => {
    const navigate = useNavigate();
    const { setLoginUserInfo } = useUserInfoContext();
    const [loader, setLoader] = useState(false);
    const [userInput, setUserInput] = useState({ email: "", password: "" });
    const [errorInfo, setErrorInfo] = useState({ email: "", password: "" });
    const { loader: gloader, error, googleAuth } = useAuth();

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setUserInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoader(true);
            const { data } = await userSignIn(userInput);

            // store user (JWT token) + (user ID) into local storage...
            localStorage.setItem("jwt", JSON.stringify(data.jwtToken));
            localStorage.setItem("userId", JSON.stringify(data.loggedUser._id));

            // login user data send to ContextAPI for globally user ID sharing or many more need full logic...
            setLoginUserInfo(data.loggedUser);

            // navigate user into user profile page...
            navigate("/projects");

            setLoader(false);
        } catch (error) {
            setLoader(false);
            // console.log(error);
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

    const onSuccess = async (res) => {
        console.log(res);

        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            // directly send user info at ==> Redux (Auth Reducer)
            // for storing user info at localStorage, for later using as per requirement...
            // dispatch({ type: AUTH, data: { result, token } });

            // after user login, redirect user at the index page...
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const onFailure = async (response) => {
        console.log(response);
        alert("🔴 Google Sign In was unsuccessful.\n🔴 Try again later...");
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

    return (
        <section className="flex justify-between items-center gap-10 w-[60%] mx-auto">
            {/* left side */}
            <div className="w-[455px] min-h-screen text-white bg-cover bg-center">
                <div className="pt-[80px]">
                    <div className="pt-8 pl-9 pr-4 text-sm">
                        <img
                            src={loginImg}
                            alt="bg2"
                            className="w-96 top-8 left-8"
                        />
                    </div>
                </div>
            </div>

            {/* right side */}
            <div>
                <div className="space-y-2 mb-8">
                    <h2 className="font-bold text-2xl">Login</h2>
                    <p className="text-gray-500 text-xs">
                        Don't have an account?{" "}
                        <Link className="text-blue-600" to="/register">
                            Register
                        </Link>
                    </p>
                </div>

                <form
                    className="flex flex-col gap-8 w-96"
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
                                className="absolute left-2 top-1"
                                src={images.emailIcon}
                                alt=""
                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-[#ECECEC] w-96 pl-8 py-2.5 rounded outline-blue-600 placeholder:text-xs text-sm"
                                placeholder="Enter email address"
                                onChange={handleUserInput}
                            />
                        </span>
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
                                className="absolute left-2 top-0.5"
                                src={images.lockIcon}
                                alt=""
                            />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="bg-[#ECECEC] w-96 pl-8 py-2.5 rounded outline-pink-400 placeholder:text-xs text-sm"
                                placeholder="Enter password"
                                onChange={handleUserInput}
                            />

                            <img
                                className="absolute right-2 top-[1px]"
                                src={images.hideIcon}
                                alt=""
                            />
                        </span>
                        {(errorInfo.password || errorInfo.email) && (
                            <span className="flex justify-start items-center gap-1 mt-2">
                                <RiErrorWarningLine className="text-[#FF3659]" />
                                <p className="text-xs text-[#FF3659]">
                                    {errorInfo.password || errorInfo.email}
                                </p>
                            </span>
                        )}
                    </span>
                    <div className="flex justify-between items-center w-full">
                        <span className="flex gap-1">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                            />
                            <p className="text-xs text-gray-500">Remember me</p>
                        </span>
                        <button className="text-xs text-blue-600">
                            Forgot Password?
                        </button>
                    </div>
                    <div>
                        <button className="w-96 py-2.5 text-white text-xs bg-[#6576FF] rounded">
                            Login
                        </button>
                    </div>
                </form>
                <button
                    className="w-96 py-2.5 text-[#3699FF] text-xs bg-[#E0F7FF] rounded flex justify-center items-center gap-2 mt-5"
                    onClick={googleAuth}
                >
                    {gloader ? (
                        <Loader />
                    ) : (
                        <>
                            <img src={images.googleIcon} alt="" /> Sign in with
                            google
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default Login;
