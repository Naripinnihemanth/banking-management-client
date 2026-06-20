import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import RightSider from "../../components/RightSider/RightSider";
import Loading from "../../components/Loading/Loading";
import { userContext } from "../../context/UserContext";
import NavContextProvider from "../../context/NavContext";
import Main from "../../components/Main/Dashboard/Main";
import AccountContextProvider from "../../context/AccountContext";
import RightSiderContextProvider from "../../context/RightSiderContext";
import api from "../../api";
import { jwtDecode } from "jwt-decode";
import { TOKEN } from "../../constents";
import { messageContext } from "../../context/MassageContext";
import Message from "../../components/Message/Message";
import { data } from "react-router-dom";
import PopUp from "../../components/MobileComponents/PopUp/PopUp";
function Home() {
  const { message, setMessage } = useContext(messageContext);
  const { user, setUser } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [Open, setOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function getUser() {
    try {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        const decode = jwtDecode(token);
        const mobile = decode.sub;
        const res = await api.post("/auth/get_user", {
          mobile: mobile,
        });
        if (res.status === 200) {
          setUser(res.data);
          console.log(res.data);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({
        data: "",
        danger: false,
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return loading ? (
    <Loading></Loading>
  ) : (
    <>
      {message.data != "" ? (
        <Message message={message.data} status={message.danger}></Message>
      ) : null}
      <div className="home">
        <video autoPlay loop muted className="login-bg">
          <source src="./login_bg.mp4" type="video/mp4" />
        </video>
        <Header sider={setOpen}></Header>
        <Main></Main>
        {Open ? (
          <SideBar></SideBar>
        ) : windowSize.width >= 1080 ? (
          <SideBar></SideBar>
        ) : null}
        <RightSider></RightSider>
      </div>
      <PopUp></PopUp>
    </>
  );
}

export default Home;
