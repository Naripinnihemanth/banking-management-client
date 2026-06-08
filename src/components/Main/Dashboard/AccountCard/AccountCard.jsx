import React, { useContext, useEffect, useState } from "react";
import "./AccountCard.css";
import userContext from "../../../../context/UserContext";
import api from "../../../../api";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
function AccountCard({ account }) {
  const [show, setShow] = useState(false);

  return (
    <div className="account-card">
      <p className="account-number">
        {account.account_number.slice(0, account.account_number.length - 6)}
        ------
      </p>
      <p className="account-status-active">{account.status}</p>
      <div className="account-balance-container">
        <p className="totle-balance">Totle balance :</p>
        <p className="account-balance">{show ? account.balance : "----"}</p>
        <div className="balance-show" onClick={() => setShow((pre) => !pre)}>
          {show ? (
            <FaRegEyeSlash className="balance-show-icon" />
          ) : (
            <FaRegEye className="balance-show-icon" />
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
