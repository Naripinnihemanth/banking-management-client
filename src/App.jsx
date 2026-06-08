import React, { useSyncExternalStore, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Notfound from "./pages/Notfound/Notfound";
import Protect from "./protectComponets/Protect";
import userContext from "./context/UserContext";
import api from "./api";
import { jwtDecode } from "jwt-decode";
import { TOKEN } from "./constents";
import Loading from "./components/Loading/Loading";
import AccountContextProvider from "./context/AccountContext";
function App() {
  function Logout() {
    localStorage.clear();
    return <Navigate to={"/login"}></Navigate>;
  }
  function Reg() {
    localStorage.clear();
    return <Register />;
  }
  const [user, setUser] = useState({});
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
  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <BrowserRouter>
          <userContext.Provider value={user}>
            <Routes>
              <Route
                path="/"
                element={
                  <Protect>
                    <Home></Home>
                  </Protect>
                }
              ></Route>
              <Route path="*" element={<Notfound></Notfound>}></Route>
              <Route
                path="/login"
                element={<Login getUser={getUser}></Login>}
              ></Route>
              <Route path="/register" element={<Reg></Reg>}></Route>
              <Route path="/logout" element={<Logout></Logout>}></Route>
            </Routes>
          </userContext.Provider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
