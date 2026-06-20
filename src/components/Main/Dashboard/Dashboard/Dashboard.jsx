import React, { useContext, useEffect, useState } from "react";
import AccountCard from "../AccountCard/AccountCard";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { userContext } from "../../../../context/UserContext";
import { accountContext } from "../../../../context/AccountContext";
import { navContext } from "../../../../context/NavContext";
import api from "../../../../api";
import CreateAccount from "../CreateAccount/CreateAccount";
import Transfer from "../Transfer/Transfer";
import { siderContext } from "../../../../context/RightSiderContext";
import TransactionDetailsCard from "../../Transactions/TransactionDetailsCard/TransactionDetailsCard";
import PayToMobile from "../PayToMobile/PayToMobile";
import { Link } from "react-router-dom";
import Transactions from "../../../MobileComponents/Transactions/Transactions";
import { popUpContext } from "../../../../context/PopUpContext";
function Dashboard() {
  const { user, setUser } = useContext(userContext);
  const { PopUp, setPopUp } = useContext(popUpContext);

  const { setSider } = useContext(siderContext);
  const { accounts, setAccounts } = useContext(accountContext);
  const { element, setElement } = useContext(navContext);
  const [accountTypes, setAccountTypes] = useState([]);
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
  function handleCreateAccount() {
    setElement(<CreateAccount></CreateAccount>);
  }
  useEffect(() => {
    setSider(null);
  }, []);
  useEffect(() => {
    if (user?.id) {
      getAccount();
    }
  }, [user]);
  useEffect(() => {
    accounts.map((item) => setAccountTypes((pre) => [...pre, item.type]));
  }, [accounts]);
  return (
    <div className="dashboard">
      {accounts.length == 0 ? (
        <div className="create-account">
          <p>you dont have any account please create one account. </p>
          <button onClick={handleCreateAccount}>Open account</button>
        </div>
      ) : (
        <div className="accounts">
          {accounts.map((item) => (
            <AccountCard account={item} key={item.id}></AccountCard>
          ))}
        </div>
      )}
      <div className="dashboard-actions">
        {windowSize.width <= 500 ? (
          <button
            className="action-icon"
            onClick={() => setPopUp(<Transfer></Transfer>)}
          >
            <RiMoneyRupeeCircleFill />
            <p>Transfer</p>
          </button>
        ) : (
          <button className="action-icon" popoverTarget="transfer">
            <RiMoneyRupeeCircleFill />
            <p>Transfer</p>
          </button>
        )}
        <div
          className="action-icon"
          onClick={
            windowSize.width <= 500
              ? () => setPopUp(<PayToMobile></PayToMobile>)
              : () => setSider(<PayToMobile></PayToMobile>)
          }
        >
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
        {windowSize.width >= 1080 ? <Transfer></Transfer> : null}
      </div>
      {windowSize.width <= 500 ? <Transactions></Transactions> : null}
    </div>
  );
}

export default Dashboard;
