import React, { useContext, useEffect, useState } from "react";
import "./TransactionCard.css";
import { FiArrowDownLeft } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { siderContext } from "../../../context/RightSiderContext";
import { FcOk } from "react-icons/fc";
import { MdSmsFailed } from "react-icons/md";
import TransactionDetailsCard from "../../Main/Transactions/TransactionDetailsCard/TransactionDetailsCard";
import { popUpContext } from "../../../context/PopUpContext";
function TransactionCard({ data }) {
  const { PopUp, setPopUp } = useContext(popUpContext);

  const { setSider } = useContext(siderContext);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
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
      onClick={
        windowSize.width <= 500
          ? () => {
              setPopUp(
                <TransactionDetailsCard data={data}></TransactionDetailsCard>,
              );
            }
          : () => {
              setSider(
                <TransactionDetailsCard data={data}></TransactionDetailsCard>,
              );
            }
      }
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
