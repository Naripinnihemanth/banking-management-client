import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Stages.css";

function Stage3({ getAllAccounts, stages, sender }) {
  const [active, setActive] = useState(null);

  function previos() {
    stages((pre) => pre - 1);
  }
  function next() {
    stages((pre) => pre + 1);
  }

  return (
    <div className="stage">
      {getAllAccounts.map((item) => (
        <div
          className="sender-account-card"
          key={item.id}
          onClick={() => {
            setActive(item.id);
            sender(item.account_number);
          }}
        >
          <div className="sender-account-number">
            ------------
            {item.account_number.slice(12, item.account_number.length)}
          </div>
          <p className="balance">
            <span>balance : </span>
            {item.balance}
          </p>
          <div className="type">{item.type}</div>
          <div className="out-circle">
            {active == item.id ? <div className="in-circle"></div> : null}
          </div>
        </div>
      ))}
      <button className="next-btn transfer-btn" onClick={next}>
        <FaArrowRight />
      </button>
      <button className="pre-btn transfer-btn" onClick={previos}>
        <FaArrowLeft />
      </button>
    </div>
  );
}

export default Stage3;
