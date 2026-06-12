import React, { useContext, useEffect, useState } from "react";
import "./AccountCard.css";
import { userContext } from "../../../../context/UserContext";
import api from "../../../../api";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { accountContext } from "../../../../context/AccountContext";
function AccountCard({ account }) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { setAccounts } = useContext(accountContext);
  const { user } = useContext(userContext);
  async function getAccount() {
    try {
      const res = await api.post(`/account/get_account`, user);
      if (res.status === 200) {
        setAccounts(res.data.reverse());
      }
    } catch (err) {
      console.log(err.response.data);
    } finally {
    }
  }
  async function setDefault() {
    try {
      const res = await api.post("/account/set_default", {
        account: account.account_number,
      });
      if (res.status === 200) {
        setOpen(false);
        getAccount();
      }
      console.log(res);
    } catch (err) {
      console.log(err?.response.data);
    }
  }

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
      <div className="footer">
        <p className="type">{account.type}</p>
        {account?.default ? <p>Defalut</p> : null}
      </div>
      <div className={open ? "menu open" : "menu"}>
        <p className="arrow">
          {open ? (
            <FaChevronDown
              onClick={() => setOpen((pre) => !pre)}
              style={open ? { color: "var(--bg)" } : {}}
            />
          ) : (
            <FaChevronUp onClick={() => setOpen((pre) => !pre)} />
          )}
        </p>
        {!account.default ? (
          <p className="set default" onClick={setDefault}>
            set default
          </p>
        ) : null}
        <p className="delete">delete</p>
      </div>
    </div>
  );
}

export default AccountCard;
