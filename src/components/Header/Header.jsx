import React, { useContext } from "react";
import "./Header.css";
import userContext from "../../context/UserContext";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
function Header() {
  const user = useContext(userContext);

  return (
    <div className="header">
      <p className="header-title">HELLO, {user?.name}!</p>
      <div className="header-actions">
        <div className="search-bar">
          <CiSearch className="search-icon" />
          <input type="text" placeholder="Account number" />
        </div>
        <IoIosNotifications className="notification-icon" />
      </div>
    </div>
  );
}

export default Header;
