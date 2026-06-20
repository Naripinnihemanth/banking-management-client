import React, {
  useSyncExternalStore,
  useState,
  useEffect,
  useContext,
} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Notfound from "./pages/Notfound/Notfound";
import Protect from "./protectComponets/Protect";
import { userContext } from "./context/UserContext";
import UserContextProvider from "./context/UserContext";
import api from "./api";
import { jwtDecode } from "jwt-decode";
import { TOKEN } from "./constents";
import Loading from "./components/Loading/Loading";
import AccountContextProvider from "./context/AccountContext";
import Message from "./components/Message/Message";
import MessageContextProvider from "./context/MassageContext";
import RightSiderContextProvider from "./context/RightSiderContext";
import NavContextProvider from "./context/NavContext";
import PopUpContextProvider from "./context/PopUpContext";
function App() {
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

  function Logout() {
    localStorage.clear();
    return <Navigate to={"/login"}></Navigate>;
  }
  function Reg() {
    localStorage.clear();
    return <Register />;
  }

  return (
    <div>
      {windowSize.width <= 500 || windowSize.width >= 1080 ? (
        <BrowserRouter>
          <MessageContextProvider>
            <UserContextProvider>
              <RightSiderContextProvider>
                <AccountContextProvider>
                  <NavContextProvider>
                    <PopUpContextProvider>
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
                        <Route path="/login" element={<Login></Login>}></Route>
                        <Route path="/register" element={<Reg></Reg>}></Route>
                        <Route
                          path="/logout"
                          element={<Logout></Logout>}
                        ></Route>
                      </Routes>
                    </PopUpContextProvider>
                  </NavContextProvider>
                </AccountContextProvider>
              </RightSiderContextProvider>
            </UserContextProvider>
          </MessageContextProvider>
        </BrowserRouter>
      ) : (
        <p>unavilable</p>
      )}
    </div>
  );
}

export default App;
