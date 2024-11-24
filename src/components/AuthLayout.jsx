import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "./index";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  }, [authStatus, navigate, authentication]);

  return loading ? <><Loader /></> : <>{children}</>;

}

export default AuthLayout;