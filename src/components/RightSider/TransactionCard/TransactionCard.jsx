import React, { useContext } from "react";
import "./TransactionCard.css";
import { FiArrowDownLeft } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { siderContext } from "../../../context/RightSiderContext";
import TransactionDetailsCard from "../../Main/Transactions/TransactionDetailsCard/TransactionDetailsCard";
function TransactionCard({ data }) {
  const { setSider } = useContext(siderContext);
  return (
    <div
      className="transaction-card"
      onClick={() =>
        setSider(<TransactionDetailsCard data={data}></TransactionDetailsCard>)
      }
    >
      <div className="status">
        {data.status == "SUCCESS" ? (
          <p className="tick">✔</p>
        ) : (
          <p className="info">!</p>
        )}
      </div>
      <div className="details">
        <h3>
          {data.date.slice(0, data.date.indexOf("T"))} /{" "}
          {data.date.slice(
            data.date.indexOf("T") + 1,
            data.date.indexOf("T") + 6,
          )}{" "}
        </h3>
        <p>
          ------------
          {data.account.account_number.slice(
            12,
            data.account.account_number.length,
          )}
        </p>
      </div>
      <div className="type">
        {data.type == "CREDITED" ? (
          <p className="credited">
            <FiArrowDownLeft />
            {data.amount}
          </p>
        ) : (
          <p className="debited">
            <FiArrowUpRight />
            {data.amount}
          </p>
        )}
      </div>
    </div>
  );
}

export default TransactionCard;
