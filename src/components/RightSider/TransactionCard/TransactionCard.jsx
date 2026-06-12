import React, { useContext, useEffect, useState } from "react";
import "./TransactionCard.css";
import { FiArrowDownLeft } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { siderContext } from "../../../context/RightSiderContext";
import { FcOk } from "react-icons/fc";
import { MdSmsFailed } from "react-icons/md";
import TransactionDetailsCard from "../../Main/Transactions/TransactionDetailsCard/TransactionDetailsCard";
function TransactionCard({ data }) {
  const { setSider } = useContext(siderContext);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    if (data?.id) {
      const dateAndTime = new Date(data.date);
      setDate(dateAndTime.toDateString());
      setTime(dateAndTime.toLocaleTimeString());
    }
  }, [data]);
  return (
    <div
      className="transaction-card"
      onClick={() => {
        setSider(<TransactionDetailsCard data={data}></TransactionDetailsCard>);
      }}
    >
      <div className="status">
        {data.status == "SUCCESS" ? (
          <FcOk className="tick" />
        ) : (
          <MdSmsFailed className="info" />
        )}
      </div>
      <div className="details">
        <h3>
          {date}/{time}
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
