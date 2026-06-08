import React, { useContext, useEffect, useState } from "react";
import "./Transactions.css";
import api from "../../../api";
import userContext from "../../../context/UserContext";
import TransactionCard from "../../RightSider/TransactionCard/TransactionCard";
import { siderContext } from "../../../context/RightSiderContext";
import TransactionDetailsCard from "./TransactionDetailsCard/TransactionDetailsCard";
function Transactions() {
  const user = useContext(userContext);
  const { setSider } = useContext(siderContext);
  const [transactions, setTransactions] = useState([]);
  const [active, setActive] = useState(0);
  async function getTransactions() {
    try {
      const res = await api.post("/account/get_transactions", user);
      console.log(res);
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getTransactions();
  }, []);
  useEffect(() => {
    setSider(
      <TransactionDetailsCard data={transactions[0]}></TransactionDetailsCard>,
    );
  }, [transactions]);
  return (
    <div className="transactions">
      <h2>all transactions</h2>
      <div className="transaction-container">
        {transactions.map((item) => (
          <TransactionCard
            data={item}
            key={item.id}
          ></TransactionCard>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
