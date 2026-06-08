import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TOKEN } from "../constents";
import { jwtDecode } from "jwt-decode";
function Protect({ children }) {
  const navigate = useNavigate();
  const [userState, setUserState] = useState(null);
  async function validate() {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      const decode = jwtDecode(token);
      const now = Date.now() / 1000;
      const exp = decode.exp;
      if (now < exp) {
        setUserState(true);
      } else {
        setUserState(false);
      }
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    validate();
  }, []);
  if (userState === null) {
    return <h1>Loading...</h1>;
  }
  return userState ? children : navigate("/logout");
}

export default Protect;
