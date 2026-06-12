import React, { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { CgDetailsMore } from "react-icons/cg";
import { GiHelp } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import Main from "../Main/Dashboard/Main";
import Transactions from "../Main/Transactions/Transactions";
import PersonalDetails from "../Main/PersonalDetails/PersonalDetails";
import Help from "../Main/Help/Help";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { TOKEN } from "../../constents";
import api from "../../api";
import publicApi from "../../publicApi";
import { userContext } from "../../context/UserContext";
import { navContext } from "../../context/NavContext";
function SideBar() {
  const navigations = [
    {
      id: 1,
      titile: "Dashboard",
      icon: <TbLayoutDashboardFilled />,
      page: null,
    },
    {
      id: 2,
      titile: "My Transactions",
      icon: <GrTransaction />,
      page: <Transactions></Transactions>,
    },
    {
      id: 3,
      titile: "Personal details",
      icon: <CgDetailsMore />,
      page: <PersonalDetails></PersonalDetails>,
    },
    {
      id: 4,
      titile: "Get help",
      icon: <GiHelp />,
      page: <Help></Help>,
    },
  ];
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const { element, setElement } = useContext(navContext);

  useEffect(() => {
    navigations.map((item) => {
      if (item.page == element) {
        setActive(item.id);
      }
    });
  }, [element]);

  return (
    <div className="sidebar">
      <h1>Trustora</h1>
      <div className="profile">
        <img
          src="./profiles/boy.jpeg"
          alt=""
          width={"100px"}
          className="profile-pic"
        />
        <p>{user?.name}</p>
      </div>
      <ul className="navigations">
        {navigations.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setActive(item.id);
              setElement(item.page);
            }}
            className={active === item.id ? "active" : ""}
          >
            <span>{item.icon}</span>
            {item.titile}
          </li>
        ))}
      </ul>
      <button className="side-bar-logout" onClick={() => navigate("/logout")}>
        Logout
        <span>
          <IoMdLogOut />
        </span>
      </button>
    </div>
  );
}

export default SideBar;
