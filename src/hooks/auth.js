import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { o_auth_login } from "../api/auth";
import { useUserInfoContext } from "../context/UserInfoContext";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function useAuth() {
    const { setLoginUserInfo } = useUserInfoContext();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);

    const googleAuth = async () => {
        setLoader(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            const { data } = await o_auth_login(token);
            setLoader(false);
            localStorage.setItem("jwt", JSON.stringify(data.jwtToken));
            localStorage.setItem("userId", JSON.stringify(data.loggedUser._id));
            localStorage.setItem("fullSidebar", "show");
            setLoginUserInfo(data.loggedUser);
            navigate("/projects");
        } catch (error) {
            setLoader(false);
            setError(error.message);
        }
    };
    return {
        googleAuth,
        loader,
        error,
    };
}

export default useAuth;
