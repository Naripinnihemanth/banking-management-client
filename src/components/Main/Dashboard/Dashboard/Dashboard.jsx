import React, { useContext, useEffect, useState } from "react";
import AccountCard from "../AccountCard/AccountCard";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import userContext from "../../../../context/UserContext";
import { accountContext } from "../../../../context/AccountContext";
import { navContext } from "../../../../context/NavContext";
import api from "../../../../api";
import CreateAccount from "../CreateAccount/CreateAccount";
import Transfer from "../Transfer/Transfer";
import { siderContext } from "../../../../context/RightSiderContext";
import TransactionDetailsCard from "../../Transactions/TransactionDetailsCard/TransactionDetailsCard";
function Dashboard() {
  const getUser = useContext(userContext);
  const [user, setUser] = useState({});
  const { setSider } = useContext(siderContext);
  const { accounts, setAccounts } = useContext(accountContext);
  const { element, setElement } = useContext(navContext);
  const [acc, setAcc] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  async function getAccount() {
    try {
      const res = await api.post(`/account/get_account`, user);
      if (res.status === 200) {
        setAcc(res.data);
        setAccounts(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  }
  function handleCreateAccount() {
    setElement(<CreateAccount></CreateAccount>);
  }
  useEffect(() => {
    setUser(getUser);
    console.log(accounts);
    setSider(null);
  }, []);
  useEffect(() => {
    if (user?.id) {
      getAccount();
    }
  }, [user]);
  useEffect(() => {
    acc.map((item) => setAccountTypes((pre) => [...pre, item.type]));
  }, [acc]);
  return (
    <div className="dashboard">
      {accounts.length == 0 ? (
        <div className="create-account">
          <p>you dont have any account please create one account. </p>
          <button onClick={handleCreateAccount}>Open account</button>
        </div>
      ) : (
        <div className="accounts">
          {acc.map((item) => (
            <AccountCard account={item} key={item.id}></AccountCard>
          ))}
        </div>
      )}
      <div className="dashboard-actions">
        <button className="action-icon" popoverTarget="transfer">
          <RiMoneyRupeeCircleFill />
          <p>Transfer</p>
        </button>
        <div className="action-icon">
          <BiMoneyWithdraw />
          <p>Pay to mobile</p>
        </div>
        <div className="action-icon">
          <GrTransaction></GrTransaction>
          <p>Self Transfer</p>
        </div>
        <div className="action-icon">
          <MdOutlineAccountBalanceWallet />
          <p>Balance</p>
        </div>
        <div className="action-icon">
          <GiReceiveMoney />
          <p>Lone</p>
        </div>
        <Transfer></Transfer>
      </div>
    </div>
  );
}

export default Dashboard;
