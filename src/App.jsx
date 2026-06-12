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
function App() {
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
      <BrowserRouter>
        <UserContextProvider>
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
            <Route path="/logout" element={<Logout></Logout>}></Route>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
