import React, { useContext, useEffect, useState } from "react";
import { FcOk } from "react-icons/fc";
import { MdSmsFailed } from "react-icons/md";
import "./TransactionDetailsCard.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { siderContext } from "../../../../context/RightSiderContext";
function TransactionDetailsCard({ data }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { setSider } = useContext(siderContext);

  useEffect(() => {
    if (data?.id) {
      const dateAndTime = new Date(data.date);
      setDate(dateAndTime.toDateString());
      setTime(dateAndTime.toLocaleTimeString());
    }
  }, [data]);

  // const h = {
  //   account: {
  //     account_number: "ACC1780811360166",
  //     balance: 250,
  //     id: 2,
  //     status: "ACTIVE",
  //     type: "SEVINGS",
  //     user: {
  //       email: "hemanthnaripinni125@gmail.com",
  //       id: 6,
  //       mobile: "8985145540",
  //       name: "Madhavi Naripinni",
  //       password:
  //         "$2a$10$0tSAZsZmuh.s5qYa6KrARuwu5tNViObwcQl9QTbHphDwAbQgfJNlu",
  //       role: "USER",
  //       username: "hemanthnaripinni125",
  //     },
  //   },
  //   amount: 250,
  //   date: "2026-06-08T07:11:29.743Z",
  //   id: 10,
  //   status: "SUCCESS",
  //   type: "DEBITED",
  // };

  return (
    <div className="transaction-details">
      <IoClose className="close" onClick={() => setSider(null)} />
      <div className="status-container">
        {data?.status == "SUCCESS" ? (
          <div className="status">
            <FcOk className="icon tick" />
            <p className="tick">success</p>
            <div style={{ fontSize: ".8rem" }}>
              {date} / {time}
            </div>
          </div>
        ) : (
          <div className="status">
            <MdSmsFailed className="icon info" />
            <p className="info">failed</p>
            <div style={{ fontSize: ".8rem" }}>
              {date} / {time}
            </div>
          </div>
        )}
      </div>
      {data?.type == "DEBITED" ? (
        <div className="details">
          <div
            style={{
              position: "absolute",
              top: "-12px",
            }}
          >
            <p
              style={{
                padding: "2px 20px",
                background: "var(--bg)",
                color: "var(--primary-text)",
                borderRadius: "10px",
                fontFamily: "var(--p)",
                fontSize: "0.8rem",
              }}
            >
              From :
            </p>
          </div>
          <p>
            <span>transfered from :</span> ------------
            {data?.account.account_number.slice(12)}
          </p>
          <p>
            <span>holder : </span>
            {data?.account.user.name}
          </p>
          <p>
            <span>type : </span>
            {data?.account.type}
          </p>
          <p>
            <span>{data?.type} : </span>
            <span>
              {data?.amount} <FaIndianRupeeSign />
            </span>
          </p>
        </div>
      ) : (
        <div className="details">
          <div
            style={{
              position: "absolute",
              top: "-12px",
            }}
          >
            <p
              style={{
                padding: "2px 20px",
                background: "var(--bg)",
                color: "var(--primary-text)",
                borderRadius: "10px",
                fontFamily: "var(--p)",
                fontSize: "0.8rem",
              }}
            >
              To :
            </p>
          </div>
          <p>
            <span>transfered to :</span> ------------
            {data?.account.account_number.slice(12)}
          </p>
          <p>
            <span>holder : </span>
            {data?.account.user.name}
          </p>
          <p>
            <span>type : </span>
            {data?.account.type}
          </p>
          <p>
            <span>{data?.type} : </span>
            <span>
              {data?.amount} <FaIndianRupeeSign />
            </span>
          </p>
        </div>
      )}
      {data?.type == "DEBITED" ? (
        <div className="details">
          <div
            style={{
              position: "absolute",
              top: "-12px",
            }}
          >
            <p
              style={{
                padding: "2px 20px",
                background: "var(--bg)",
                color: "var(--primary-text)",
                borderRadius: "10px",
                fontFamily: "var(--p)",
                fontSize: "0.8rem",
              }}
            >
              To :
            </p>
          </div>
          <p>
            <span>transfered to :</span> ------------
            {data?.involved.account_number.slice(12)}
          </p>
          <p>
            <span>holder : </span>
            {data?.involved.user.name}
          </p>
        </div>
      ) : (
        <div className="details">
          <div
            style={{
              position: "absolute",
              top: "-12px",
            }}
          >
            <p
              style={{
                padding: "2px 20px",
                background: "var(--bg)",
                color: "var(--primary-text)",
                borderRadius: "10px",
                fontFamily: "var(--p)",
                fontSize: "0.8rem",
              }}
            >
              From :
            </p>
          </div>
          <p>
            <span>transfered From :</span> ------------
            {data?.involved.account_number.slice(12)}
          </p>
          <p>
            <span>holder : </span>
            {data?.involved.user.name}
          </p>
        </div>
      )}

      <div className="actions">
        <p>
          <MdOutlineDownloadForOffline /> recipt
        </p>
        <p>
          <IoMdHelpCircleOutline /> help
        </p>
      </div>
    </div>
  );
}

export default TransactionDetailsCard;
