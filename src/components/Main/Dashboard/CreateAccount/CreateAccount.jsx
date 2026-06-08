import React, { useContext, useEffect, useState } from "react";
import "./CreateAccount.css";
import userContext from "../../../../context/UserContext";
import api from "../../../../api";
import Message from "../../../Message/Message";
import { navContext } from "../../../../context/NavContext";
import { data } from "react-router-dom";
function CreateAccount() {
  const user = useContext(userContext);
  const { element, setElement } = useContext(navContext);
  const [accountType, setAccountType] = useState(null);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [message, setMessage] = useState({
    data: "",
    danger: false,
  });
  async function createAccount() {
    try {
      if (termsAndConditions) {
        const res = await api.post(`/account/create_account/${user.mobile}`, {
          type: accountType,
        });
        if (res.status === 201) {
          setElement(null);
        }
      } else {
        setMessage({
          data: "please accepte the terms and conditions !",
          danger: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="create-account-page">
      {message.data != "" ? (
        <Message message={message.data} status={message.danger}></Message>
      ) : null}
      <select
        name="account_types"
        id=""
        onChange={(e) => setAccountType(e.target.value)}
      >
        <option value="">-- Type of account --</option>
        <option value="SEVINGS">Sevings</option>
        <option value="CURRENT">Current</option>
        <option value="SALARY">Salary</option>
      </select>
      <div className="footer">
        <input
          type="checkbox"
          value={termsAndConditions}
          onChange={(e) => setTermsAndConditions(e.target.checked)}
        />
        <lable> terms & conditions</lable>
        <div className="footer-btn">
          <input type="submit" value={"create"} onClick={createAccount} />
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
