import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [navigate, token]); // Ensure `navigate` and `token` are dependencies for the hook.

    // If the token is not available, render nothing until the redirect happens.
    if (!token) {
        return null;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
