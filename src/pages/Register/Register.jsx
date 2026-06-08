import React, { useState, useRef, useEffect } from "react";
import "./Register.css";
import { TOKEN } from "../../constents";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import publicApi from "../../publicApi";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message/Message";
function Register() {
  const [payload, setPayload] = useState({
    mobile: "",
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [message, setMessage] = useState({
    data: "",
    danger: false,
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  async function register(e) {
    e.preventDefault();
    try {
      const res = await publicApi.post("/auth/register", {
        mobile: payload.mobile,
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: payload.role,
      });
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response.data == "Range [0, -1) out of bounds for length 0") {
        setMessage({
          data: "please fill all required details.",
          danger: true,
        });
      } else {
        setMessage({
          data: "this mobile number alredy exist ! please goto login.",
          danger: true,
        });
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({
        data: "",
        danger: false,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (payload.password != "") {
      passwordRef.current.classList.add("rais");
    } else {
      passwordRef.current.classList.remove("rais");
    }
  }, [payload.password]);
  useEffect(() => {
    if (payload.mobile != "") {
      mobileRef.current.classList.add("rais");
    } else {
      mobileRef.current.classList.remove("rais");
    }
  }, [payload.mobile]);
  useEffect(() => {
    if (payload.name != "") {
      nameRef.current.classList.add("rais");
    } else {
      nameRef.current.classList.remove("rais");
    }
  }, [payload.name]);
  useEffect(() => {
    if (payload.email != "") {
      emailRef.current.classList.add("rais");
    } else {
      emailRef.current.classList.remove("rais");
    }
  }, [payload.email]);
  return (
    <div className="register-page">
      {message.data != "" ? (
        <Message message={message.data} status={message.danger}></Message>
      ) : null}
      <video autoPlay loop muted className="register-bg">
        <source src="./login_bg.mp4" type="video/mp4" />
      </video>
      <form className="register-form" onSubmit={register}>
        <h1>Welcome</h1>
        <div className="input">
          <input
            type="text"
            name="mobile"
            id="mobile"
            onChange={(e) =>
              setPayload({
                ...payload,
                mobile: e.target.value,
              })
            }
          />
          <p ref={mobileRef}>Mobile</p>
        </div>
        <div className="input">
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) =>
              setPayload({
                ...payload,
                name: e.target.value,
              })
            }
          />
          <p ref={nameRef}>Name</p>
        </div>
        <div className="input">
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) =>
              setPayload({
                ...payload,
                email: e.target.value,
              })
            }
          />
          <p ref={emailRef}>Email</p>
        </div>
        <div className="input">
          <div className="password-show" onClick={() => setShow((pre) => !pre)}>
            {show ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
          <input
            type={show ? "text" : "password"}
            onChange={(e) =>
              setPayload({
                ...payload,
                password: e.target.value,
              })
            }
          />
          <p ref={passwordRef}>Password</p>
        </div>
        <input type="submit" value="sign up" />
        <p>
          already have an account ? <Link to={"/login"}>Sing in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
