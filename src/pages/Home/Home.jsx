import React, { useState, useEffect } from "react";
import "./Home.css";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/Header/Header";
import RightSider from "../../components/RightSider/RightSider";
import Loading from "../../components/Loading/Loading";
import userContext from "../../context/UserContext";
import NavContextProvider from "../../context/NavContext";
import Main from "../../components/Main/Dashboard/Main";
import AccountContextProvider from "../../context/AccountContext";
import RightSiderContextProvider from "../../context/RightSiderContext";
function Home() {
  return (
    <AccountContextProvider>
      <RightSiderContextProvider>
        <div className="home">
          <video autoPlay loop muted className="login-bg">
            <source src="./login_bg.mp4" type="video/mp4" />
          </video>
          <NavContextProvider>
            <SideBar></SideBar>
            <Header></Header>
            <Main></Main>
            <RightSider></RightSider>
          </NavContextProvider>
        </div>
      </RightSiderContextProvider>
    </AccountContextProvider>
  );
}

export default Home;
