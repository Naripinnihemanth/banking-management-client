import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Stages.css";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
function Stage4({ stages, getReceiver, getSender, amount }) {
  const { accounts, sender } = getSender;

  function previos() {
    stages((pre) => pre - 1);
  }
  function next() {
    stages((pre) => pre + 1);
  }

  return (
    <div className="stage">
      {accounts.map((item) => {
        if (item.account_number === sender) {
          return (
            <div className="stage4-sender" key={item.id}>
              <p>From : </p>
              <div className="sender-name">{item.user.name}</div>
              <div className="sender-account">{item.account_number}</div>
            </div>
          );
        }
      })}

      <div className="stage4-receiver">
        <p>To : </p>
        <div className="receiver-name">{getReceiver.name}</div>
        <div className="receiver-account">{getReceiver.accountNumber}</div>
      </div>
      <div className="stage4-transfer-amount">
        <span>amount to transfer : </span>
        <p>
          <RiMoneyRupeeCircleFill /> {amount}
        </p>
      </div>
      <button className="next-btn transfer-btn" onClick={next}>
        <FaArrowRight />
      </button>
      <button className="pre-btn transfer-btn" onClick={previos}>
        <FaArrowLeft />
      </button>
    </div>
  );
}

export default Stage4;
