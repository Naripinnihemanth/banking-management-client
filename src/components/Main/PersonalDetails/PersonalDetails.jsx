import React, { useContext, useEffect } from "react";
import "./PersonalDetails.css";
import { userContext } from "../../../context/UserContext";
import { siderContext } from "../../../context/RightSiderContext";
import { accountContext } from "../../../context/AccountContext";
import AccountCard from "../Dashboard/AccountCard/AccountCard";
import { FaCirclePlus } from "react-icons/fa6";
import CreateAccount from "../Dashboard/CreateAccount/CreateAccount";
import { navContext } from "../../../context/NavContext";
function PersonalDetails() {
  const { setSider } = useContext(siderContext);
  const { user } = useContext(userContext);
  const { accounts } = useContext(accountContext);
  const { setElement } = useContext(navContext);
  function handleCreateAccount() {
    setElement(<CreateAccount></CreateAccount>);
  }

  useEffect(() => {
    setSider(null);
  }, []);
  return (
    <div className="personal-details">
      <div className="profile">
        <img src="./profiles/boy.jpeg" alt="" width={"80px"} />
        <div className="details">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
        </div>
      </div>
      <div className="all-accounts">
        {accounts.length != 0
          ? accounts.map((item) => (
              <AccountCard account={item} key={item.id}></AccountCard>
            ))
          : null}
        {accounts.length < 3 ? (
          <div className="create-account" onClick={handleCreateAccount}>
            <FaCirclePlus />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PersonalDetails;
