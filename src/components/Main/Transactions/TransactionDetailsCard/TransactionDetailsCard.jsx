import React from "react";
import "./TransactionDetailsCard.css";
function TransactionDetailsCard({ data }) {
  return <div className="transaction-details">{data?.amount}</div>;
}

export default TransactionDetailsCard;
