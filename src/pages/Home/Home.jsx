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
function Home() {
  const { user, setUser } = useContext(userContext);
  const [loading, setLoading] = useState(true);
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
  return loading ? (
    <Loading></Loading>
  ) : (
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
