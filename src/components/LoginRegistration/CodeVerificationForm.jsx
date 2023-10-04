import React from 'react';
import {
    accountVerification,
    recoverPassword,
    resendVerificationCode,
    verifyRecoverPassword,
} from '../../hooks/useFetch';
import OtpInput from 'react-otp-input';
import { Loader } from '../Loader';
import { RiErrorWarningLine } from 'react-icons/ri';
import { FcCheckmark } from 'react-icons/fc';
import { useState } from 'react';
import { useUserInfoContext } from '../../context/UserInfoContext';
import { useNavigate } from 'react-router-dom';
import images from '../../assets';
import { useEffect } from 'react';

const CodeVerificationForm = ({
    loader,
    setLoader,
    from,
    handleForgotPassword,
}) => {
    const navigate = useNavigate();

    const [type, setType] = useState(true);
    const [value, setValue] = React.useState('');
    const [userVerificationStatus, setUserVerificationStatus] = useState('');
    const [userVerificationErrorStatus, setUserVerificationErrorStatus] =
        useState('');

    const [sessionUUID, setSessionUUID] = useState('');

    const [userInput, setUserInput] = useState({
        password: '',
        confirmPassword: '',
    });
    const [sussessInfo, setSuccessInfo] = useState({
        message: '',
    });
    const [errorInfo, setErrorInfo] = useState({
        password: '',
        confirmPassword: '',
        sessionUUID: '',
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;

        setUserInput((prev) => ({ ...prev, [name]: value }));
    };

    // const firstCode = useRef();
    // const secondCode = useRef();
    // const thirdCode = useRef();
    // const fourthCode = useRef();
    // const fifthCode = useRef();
    // const sixthCode = useRef();

    const registerUserEmail = JSON.parse(sessionStorage.getItem('userEmail'));

    const handleResendOTP = async (e) => {
        setLoader(true);
        // e.preventDefault();

        try {
            if (from === 'forgotPassword') {
                setLoader(false);
                handleForgotPassword();
            } else {
                const { data } = await resendVerificationCode({
                    email: registerUserEmail,
                });
                setLoader(false);

                sessionStorage.setItem(
                    'sessionUUID',
                    JSON.stringify(data.session.sessionUUID)
                );
            }
        } catch (error) {
            setLoader(false);
            console.log(error.message);
        }
    };

    useEffect(() => {
        setSessionUUID(JSON.parse(sessionStorage.getItem('sessionUUID')));
    }, [handleForgotPassword, loader]);

    const { setLoginUserInfo } = useUserInfoContext();

    const [forgotCodeVerify, setForgotCodeVerify] = useState(false);

    // 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
    // user account activation by CODE verification process +
    // without login - user direct enter into dashboard...
    const handleSubmit = async (e) => {
        setLoader(true);


        try {
            // user id + user given activation code, for authentication...
            const userIdActive = { sessionUUID: sessionUUID, code: value };

            if (from === 'forgotPassword') {
                await verifyRecoverPassword(userIdActive);
                setForgotCodeVerify(true);
                setLoader(false);
            } else {
                //send activation cose into backend
                const { data } = await accountVerification(userIdActive);

                // store user (JWT token) + (user ID) into local storage...
                localStorage.setItem('jwt', JSON.stringify(data.jwtToken));
                localStorage.setItem('userId', JSON.stringify(data.loggedUser));
                localStorage.setItem('userId', JSON.stringify(data.loggedUser));
                setLoginUserInfo(data.loggedUser);
                // display notification for user...
                // toast.success(data?.message, { autoClose: 2000 });

                setUserVerificationStatus(data?.message);
                setUserVerificationErrorStatus('');
                setLoader(false);

                // after 2 second auto redirect user into this route...
                setTimeout(() => navigate('/projects'), 2000);
                window.location.reload();
            }
        } catch (error) {
            setLoader(false);

            setUserVerificationErrorStatus(
                error?.response?.data?.issue?.message
            );
            setUserVerificationStatus('');
        }
    };

    const handleConfirmPasswordSubmit = async (e) => {
        setErrorInfo({});
        setLoader(true);
        e.preventDefault();

        try {
            const userIdActive = {
                password: userInput.password,
                sessionUUID: sessionUUID,
            };

            if (userInput.password !== userInput.confirmPassword) {
                setLoader(false);
                setErrorInfo({
                    confirmPassword:
                        'Password and Confirm Password does not match.',
                });
            } else {
                const { data } = await recoverPassword(userIdActive);
                setLoader(false);

                setSuccessInfo({ message: data?.message });
                setTimeout(() => window.location.reload(), 2000);
            }
        } catch (error) {
            setLoader(false);
            setErrorInfo({
                sessionUUID: error.response?.data?.issue?.sessionUUID,
                password: error.response?.data?.issue?.password,
            });
        }
    };

    return forgotCodeVerify ? (
        <div className="mt-20 bg-white xl:px-10 lg:px-10 py-2 rounded-md lg:w-[40%] xl:w-[50%] mx-auto my-8">
            <div className="space-y-2 mb-8">
                <h2 className="font-bold lg:text-2xl xl:text-2xl text-lg">New Credential</h2>
                <p className="text-gray-500 text-xs">
                    Your Identity has been verified! Set your new password
                </p>
            </div>

            <form
                className="flex flex-col gap-8 w-full"
                onSubmit={handleConfirmPasswordSubmit}
            >
                <span>
                    <label
                        className="block text-xs text-gray-500 mb-2"
                        htmlFor="email"
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
                            onBlur={handleUserInput}
                        />

                        <img
                            className="absolute right-2 top-[1px]"
                            src={images.hideIcon}
                            alt=""
                            onClick={() => setType(!type)}
                        />
                    </span>
                </span>
                <span>
                    <label
                        className="block text-xs text-gray-500 mb-2"
                        htmlFor="confirmPassword"
                    >
                        Confirm password
                    </label>
                    <span className="relative">
                        <img
                            className="absolute left-2 top-0"
                            src={images.lockIcon}
                            alt=""
                        />
                        <input
                            type={type ? 'password' : 'text'}
                            name="confirmPassword"
                            id="confirmPassword"
                            className="bg-[#ECECEC] w-full pl-8 py-2.5 rounded outline-pink-400 placeholder:text-xs text-sm"
                            placeholder="Confirm password"
                            onBlur={handleUserInput}
                        />

                        <img
                            className="absolute right-2 top-[1px]"
                            src={images.hideIcon}
                            alt=""
                            onClick={() => setType(!type)}
                        />
                    </span>
                    {errorInfo.confirmPassword && (
                        <span className="flex justify-start items-center gap-1 mt-2">
                            <RiErrorWarningLine className="text-[#FF3659]" />
                            <p className="text-xs text-[#FF3659]">
                                {errorInfo.confirmPassword}
                            </p>
                        </span>
                    )}
                    {errorInfo.password && (
                        <span className="flex justify-start items-center gap-1 mt-2">
                            <RiErrorWarningLine className="text-[#FF3659]" />
                            <p className="text-xs text-[#FF3659]">
                                {errorInfo.password}
                            </p>
                        </span>
                    )}
                    {errorInfo.sessionUUID && (
                        <span className="flex justify-start items-center gap-1 mt-2">
                            <RiErrorWarningLine className="text-[#FF3659]" />
                            <p className="text-xs text-[#FF3659]">
                                {errorInfo.sessionUUID}
                            </p>
                        </span>
                    )}
                    {sussessInfo.message && (
                        <span className="flex justify-start items-center gap-1 mt-2">
                            <FcCheckmark className="text-[#0D1282]" />
                            <p className="text-xs text-[#0D1282]">
                                {sussessInfo.message}
                            </p>
                        </span>
                    )}
                </span>

                <div>
                    <button className="w-full py-2.5 text-white text-xs bg-[#0D1282] rounded">
                        {loader ? <Loader dark /> : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <div className="mt-20 mt-20 bg-white xl:px-10 lg:px-10 py-2 rounded-md lg:w-[40%] xl:w-[50%] mx-auto my-8">
            <div className="space-y-2 mb-8">
                <h2 className="font-bold lg:text-2xl xl:text-2xl text-lg">Code Verification</h2>
                <p className="text-gray-500 text-xs">
                    Enter one time password sent on{' '}
                    <span className="text-[#0D1282]">
                        {registerUserEmail || 'example@gmail.com'}
                    </span>
                </p>
            </div>

            <div
                className="flex flex-col gap-8 w-full"
                // onSubmit={handleSubmit}
            >
                {/* <span className="flex justify-between gap-4 items-center">
                    <input
                        type="text"
                        className="bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500"
                        ref={firstCode}
                        pattern="\d*"
                        maxLength={1}
                    />
                    <input
                        type="text"
                        className="bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500"
                        ref={secondCode}
                        pattern="\d*"
                        maxLength="1"
                    />
                    <input
                        type="text"
                        className="bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500"
                        ref={thirdCode}
                        pattern="\d*"
                        maxLength="1"
                    />
                    <input
                        type="text"
                        className="bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500"
                        ref={fourthCode}
                        pattern="\d*"
                        maxLength="1"
                    />
                    <input
                        type="text"
                        className="bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500"
                        ref={fifthCode}
                        pattern="\d*"
                        maxLength="1"
                    />
                    <input
                        type="text"
                        className="bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500"
                        ref={sixthCode}
                        pattern="\d*"
                        maxLength="1"
                    />
                </span> */}

                <OtpInput
                    value={value}
                    onChange={setValue}
                    numInputs={6}
                    separator={<span></span>}
                    containerStyle=" justify-between gap-4 items-center"
                    inputStyle="bg-[#ECECEC] md:!w-10 md:!h-10 xl:!w-14 lg:!w-14 xl:!h-14 lg:!h-14 rounded-md text-4xl text-center outline-blue-500"
                    focusStyle
                />

                <p className="text-gray-500 text-xs">
                    Didn’t get code yet?{' '}
                    <button
                        className="text-[#0D1282] underline"
                        onClick={() => handleResendOTP()}
                    >
                        Resend OTP
                    </button>
                </p>
                <div>
                    <button
                        className="w-full py-2.5 text-white text-xs bg-[#0D1282] rounded"
                        onClick={() => handleSubmit()}
                    >
                        {loader ? <Loader dark /> : 'Verify Code'}
                    </button>
                </div>

                {userVerificationErrorStatus && (
                    <span className="flex justify-start items-center gap-1">
                        <RiErrorWarningLine className="text-[#FF3659]" />
                        <p className="text-xs text-[#FF3659]">
                            {userVerificationErrorStatus}
                        </p>
                    </span>
                )}
            </div>
        </div>
    );
};

export default CodeVerificationForm;
