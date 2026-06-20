import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/UserContext";
import "./Transactions.css";
import api from "../../../api";
import TransactionCard from "../../RightSider/TransactionCard/TransactionCard";
import { siderContext } from "../../../context/RightSiderContext";
function Transactions() {
  const { user } = useContext(userContext);
  const { sider } = useContext(siderContext);
  const [transactions, setTransactions] = useState([]);
  async function getTransactions() {
    try {
      const res = await api.post("/account/get_transactions", user);
      setTransactions(res.data.reverse());
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className=" mobile-transactions">
      <h3 className="title">Recent activity </h3>
      <div className="transactions">
        {transactions.length == 0 ? (
          <p
            style={{
              width: "100%",
              textAlign: "center",
              fontFamily: "var(--p)",
              fontSize: "0.8rem",
            }}
          >
            No Activity found
          </p>
        ) : (
          transactions.map((item) => (
            <TransactionCard data={item} key={item.id}></TransactionCard>
          ))
        )}
      </div>
    </div>
  );
}

export default Transactions;
