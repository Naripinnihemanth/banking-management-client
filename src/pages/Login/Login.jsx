import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import publicApi from "../../publicApi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { TOKEN } from "../../constents";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import Message from "../../components/Message/Message";
function Login() {
  const [message, setMessage] = useState({
    data: "",
    danger: false,
  });
  const [data, setData] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const mobileRef = useRef();
  const passwordRef = useRef();
  async function login(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await publicApi.post("/auth/login", {
        username: data.mobile,
        password: data.password,
      });
      if (res.status === 200) {
        localStorage.setItem(TOKEN, res.data);
        setMessage((pre) => {
          return { ...pre, data: "login successfull !" };
        });
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
      setMessage({
        data: err.response.data,
        danger: true,
      });
    }
  }

  useEffect(() => {
    if (data.password != "") {
      passwordRef.current.classList.add("rais");
    } else {
      passwordRef.current.classList.remove("rais");
    }
  }, [data.password]);
  useEffect(() => {
    if (data.mobile != "") {
      mobileRef.current.classList.add("rais");
    } else {
      mobileRef.current.classList.remove("rais");
    }
  }, [data.mobile]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({
        data: "",
        danger: false,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-page">
      <video autoPlay loop muted className="login-bg">
        <source src="./login_bg.mp4" type="video/mp4" />
      </video>
      {message.data != "" ? (
        <Message message={message.data} status={message.danger}></Message>
      ) : null}
      <form className="login-form" onSubmit={login}>
        <h1>Welcome back</h1>
        <div className="input">
          <input
            type="text"
            name="mobile"
            id="mobile"
            onChange={(e) =>
              setData({
                ...data,
                mobile: e.target.value,
              })
            }
          />
          <p ref={mobileRef}>Mobile</p>
        </div>
        <div className="input">
          <div className="password-show" onClick={() => setShow((pre) => !pre)}>
            {show ? (
              <FaRegEyeSlash className="show-icon" />
            ) : (
              <FaRegEye className="show-icon" />
            )}
          </div>
          <input
            type={show ? "text" : "password"}
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
          />
          <p ref={passwordRef}>Password</p>
        </div>
        <input type="submit" value="sign in" />
        <p>Forget password?</p>
        <p>
          create new account ? <Link to={"/register"}>Sing up</Link>
        </p>
      </form>
      {loading ? <Loading></Loading> : null}
    </div>
  );
}

export default Login;
