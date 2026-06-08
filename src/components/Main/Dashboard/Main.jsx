import React, { useState, useEffect, useContext } from "react";
import "./Main.css";
import AccountCard from "./AccountCard/AccountCard";
import userContext from "../../../context/UserContext";
import api from "../../../api";
import Loading from "../../Loading/Loading";
import { GrTransaction } from "react-icons/gr";
import { BiMoneyWithdraw } from "react-icons/bi";
import { navContext } from "../../../context/NavContext";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import Transfer from "./Transfer/Transfer";
import { accountContext } from "../../../context/AccountContext";
import CreateAccount from "./CreateAccount/CreateAccount";
import Dashboard from "./Dashboard/Dashboard";
function Main() {
  const [loading, setLoading] = useState(false);
  const { element, setElement } = useContext(navContext);
  return (
    <div className="main">
      {loading ? (
        <Loading></Loading>
      ) : element === null ? (
        <Dashboard></Dashboard>
      ) : (
        element
      )}
    </div>
  );
}

export default Main;
