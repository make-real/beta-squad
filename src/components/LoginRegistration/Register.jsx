import { accountVerification, userSignUp } from '../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useState } from 'react';
import images from '../../assets';
import { Loader } from '../Loader';
import loginImg from '../../assets/images/OBJECTS.svg';
import { RiErrorWarningLine } from 'react-icons/ri';
import CodeVerificationForm from './CodeVerificationForm';
import { useUserInfoContext } from '../../context/UserInfoContext';
import useAuth from '../../hooks/auth';

const Register = () => {
    const [type, setType] = useState(true);
    // const [sessionUUID, setSessionUUID] = useState('');

    const { loader: gloader, error, googleAuth } = useAuth();
    const [activationCode, setActivationCode] = useState('');
    const [loader, setLoader] = useState(false);
    const [userId, setUserId] = useState(
        '' || JSON.parse(localStorage.getItem('userId'))
    );
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        agreeTerm: false,
    });

    // error info catch object...
    const [errorInfo, setErrorInfo] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        message: '',
    });

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

            // setSessionUUID(data.session.sessionUUID);

            // store this userId, for creating an object to account verification process...
            setUserId(data.userId);

            // store user id at local storage for future reference
            localStorage.setItem('userId', JSON.stringify(data.userId));
            sessionStorage.setItem(
                'sessionUUID',
                JSON.stringify(data.session.sessionUUID)
            );
            sessionStorage.setItem('userEmail', JSON.stringify(userInfo.email));

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
            setErrorInfo((pre) => ({
                ...pre,
                message: error.response.data?.issue?.message,
            }));
        }
    };

    const uid = JSON.parse(localStorage.getItem('userId'));

    return (
        <section className="lg:flex h-full  xl:flex xl:justify-between  md:justify-between xl:items-center md:flex md:items-center   lg:justify-between  lg:items-center w-[70%]  gap-10  mx-auto">
            <div className="w-[455px]    hidden xl:flex md:flex lg:flex lg:visible text-white">
                <div className="">
                    <div className="pt-8 pl-9 pr-4 text-sm">
                        <img src={loginImg} alt="bg2" className="w-full" />
                    </div>
                </div>
            </div>

            {!uid ? (
                <div className="bg-white px-10 py-2 rounded-md lg:w-[40%] xl:w-[50%] mx-auto my-8">
                    <div>
                        <div className="space-y-2 mb-8">
                            <h2 className="font-bold lg:text-2xl xl:text-2xl text-lg">Register</h2>
                            <p className="text-gray-500 text-xs">
                                Already have an account?{' '}
                                <Link className="text-[#0D1282]" to="/">
                                    Login
                                </Link>
                            </p>
                        </div>

                        <form
                            className="flex flex-col gap-8 w-full"
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
                                        className="bg-[#ECECEC] w-full pl-8 py-2.5 rounded outline-[#0D1282] placeholder:text-xs text-sm"
                                        placeholder="Enter full name"
                                        onChange={handleUserInput}
                                    />
                                </span>
                                {errorInfo.fullName && (
                                    <span className="flex justify-start items-center gap-1 mt-2">
                                        <RiErrorWarningLine className="text-[#FF3659]" />
                                        <p className="text-xs text-[#FF3659]">
                                            {errorInfo.fullName}
                                        </p>
                                    </span>
                                )}
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
                                        className="bg-[#ECECEC] w-full pl-8 py-2.5 rounded outline-[#0D1282] placeholder:text-xs text-sm"
                                        placeholder="Enter email address"
                                        onChange={handleUserInput}
                                    />
                                </span>
                                {errorInfo.email && (
                                    <span className="flex justify-start items-center gap-1 mt-2">
                                        <RiErrorWarningLine className="text-[#FF3659]" />
                                        <p className="text-xs text-[#FF3659]">
                                            {errorInfo.email}
                                        </p>
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
                                        type={type ? 'password' : 'text'}
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
                                        <p className="text-xs text-[#FF3659]">
                                            {errorInfo.password}
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
                                <button className="w-full py-2.5 text-white text-xs bg-[#0D1282] rounded">
                                    {loader ? <Loader dark /> : 'Register'}
                                </button>
                            </div>

                            {errorInfo.message && (
                                <span className="flex justify-start items-center gap-1 mt-2">
                                    <RiErrorWarningLine className="text-[#FF3659]" />
                                    <p className="text-xs text-[#FF3659]">
                                        {errorInfo.message}
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
                                    <img src={images.googleIcon} alt="" />{' '}
                                    Register with google
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <CodeVerificationForm
                    setActivationCode={setActivationCode}
                    loader={loader}
                    setLoader={setLoader}
                />
            )}
        </section>
    );
};

export default Register;
