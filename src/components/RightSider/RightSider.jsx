import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserContext";
import "./RightSider.css";
import api from "../../api";
import { data } from "react-router-dom";
import TransactionCard from "./TransactionCard/TransactionCard";
import { siderContext } from "../../context/RightSiderContext";
function RightSider() {
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

  return sider == null ? (
    <div className="right-sider">
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
  ) : (
    sider
  );
}

export default RightSider;
