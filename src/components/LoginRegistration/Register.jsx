import { accountVerification, userSignUp } from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useState } from "react";
import images from "../../assets";
import { Loader } from "../Loader";
import loginImg from "../../assets/images/OBJECTS.svg";
import { RiErrorWarningLine } from "react-icons/ri";
import CodeVerificationForm from "./CodeVerificationForm";
import { useUserInfoContext } from "../../context/UserInfoContext";

const Register = () => {
    const navigate = useNavigate();
    const [type, setType] = useState(true);

    const [userVerificationStatus, setUserVerificationStatus] = useState("");
    const [userVerificationErrorStatus, setUserVerificationErrorStatus] =
        useState("");
    const [activationCode, setActivationCode] = useState("");
    const [loader, setLoader] = useState(false);
    const [userId, setUserId] = useState(
        "" || JSON.parse(localStorage.getItem("userId"))
    );
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        agreeTerm: false,
    });

    // error info catch object...
    const [errorInfo, setErrorInfo] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
    });

    console.log(userId);

    // collect all user input data from UI
    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
    // User Info send to backend for registration...
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoader(true);
            const { data } = await userSignUp(userInfo);

            // store this userId, for creating an object to account verification process...
            setUserId(data.userId);

            // store user id at local storage for future reference
            localStorage.setItem("userId", JSON.stringify(data.userId));

            setLoader(false);
        } catch (error) {
            setLoader(false);
            // get error info to display user, for Form validation...
            setErrorInfo((pre) => ({
                ...pre,
                fullName: error.response.data?.issue?.fullName,
            }));
            setErrorInfo((pre) => ({
                ...pre,
                email: error.response.data?.issue?.email,
            }));
            setErrorInfo((pre) => ({
                ...pre,
                password: error.response.data?.issue?.password,
            }));
            setErrorInfo((pre) => ({
                ...pre,
                phone: error.response.data?.issue?.phone,
            }));
        }
    };

    const { setLoginUserInfo } = useUserInfoContext();

    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
    // user account activation by CODE verification process +
    // without login - user direct enter into dashboard...
    const handleAccountActivation = async (code) => {
        try {
            setLoader(true);

            // user id + user given activation code, for authentication...
            const userIdActive = { userId, code: code };

            //send activation cose into backend
            const { data } = await accountVerification(userIdActive);

            // store user (JWT token) + (user ID) into local storage...
            localStorage.setItem("jwt", JSON.stringify(data.jwtToken));
            localStorage.setItem("userId", JSON.stringify(data.loggedUser));
            localStorage.setItem("userId", JSON.stringify(data.loggedUser));
            setLoginUserInfo(data.loggedUser);
            // display notification for user...
            toast.success(data?.message, { autoClose: 2000 });

            setUserVerificationStatus(data?.message);
            setUserVerificationErrorStatus("");
            setLoader(false);

            // after 2 second auto redirect user into this route...
            setTimeout(() => navigate("/projects"), 2000);
        } catch (error) {
            setLoader(false);

            // console.log(error.response.data.issue?.message);
            setUserVerificationErrorStatus(error.response.data.issue?.message);
            setUserVerificationStatus("");
        }
    };

    const uid = JSON.parse(localStorage.getItem("userId"));

    return (
        <section className="flex justify-between items-center gap-10 w-[70%] mx-auto h-fit my-auto">
            <div className="w-[455px] text-white">
                <div className="">
                    <div className="pt-8 pl-9 pr-4 text-sm">
                        <img src={loginImg} alt="bg2" className="w-96" />
                    </div>
                </div>
            </div>

            {!uid ? (
                <div className="bg-white px-10 py-2 rounded-md mt-16">
                    <div>
                        <div className="space-y-2 mb-8">
                            <h2 className="font-bold text-2xl">Register</h2>
                            <p className="text-gray-500 text-xs">
                                Already have an account?{" "}
                                <Link className="text-blue-600" to="/">
                                    Login
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
                                    htmlFor="name"
                                >
                                    Full Name
                                </label>
                                <span className="relative">
                                    <img
                                        className="absolute left-2 top-0"
                                        src={images.profileIcon}
                                        alt=""
                                    />
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="name"
                                        className="bg-[#ECECEC] w-96 pl-8 py-2.5 rounded outline-blue-600 placeholder:text-xs text-sm"
                                        placeholder="Enter full name"
                                        onChange={handleUserInput}
                                    />
                                </span>
                            </span>
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
                                        className="absolute left-2 top-0"
                                        src={images.lockIcon}
                                        alt=""
                                    />
                                    <input
                                        type={type ? "password" : "text"}
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
                                        onClick={() => setType(!type)}
                                    />
                                </span>
                                {(errorInfo.password || errorInfo.email) && (
                                    <span className="flex justify-start items-center gap-1 mt-2">
                                        <RiErrorWarningLine className="text-[#FF3659]" />
                                        <p className="text-xs text-[#FF3659]">
                                            {errorInfo.password ||
                                                errorInfo.email}
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
                                        required
                                        onChange={(e) =>
                                            setUserInfo((pre) => ({
                                                ...pre,
                                                agreeTerm: e.target.checked,
                                            }))
                                        }
                                    />
                                    <p className="text-xs text-gray-500">
                                        Agree to Terms and Conditions
                                    </p>
                                </span>
                            </div>
                            <div>
                                <button className="w-96 py-2.5 text-white text-xs bg-[#6576FF] rounded">
                                    Register
                                </button>
                            </div>
                        </form>
                        <button className="w-96 py-2.5 text-[#3699FF] text-xs bg-[#E0F7FF] rounded flex justify-center items-center gap-2 mt-5">
                            <img src={images.googleIcon} alt="" /> Register with
                            google
                        </button>
                    </div>
                </div>
            ) : (
                <CodeVerificationForm
                    setActivationCode={setActivationCode}
                    handleAccountActivation={handleAccountActivation}
                    loader={loader}
                />
            )}
        </section>
    );
};

export default Register;
