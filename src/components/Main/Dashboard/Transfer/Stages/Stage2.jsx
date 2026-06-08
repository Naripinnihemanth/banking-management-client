import React, { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Stages.css";
function Stage2({ getReceiverDetails, stages }) {
  function previos() {
    stages((pre) => pre - 1);
  }
  function next() {
    stages((pre) => pre + 1);
  }
  return (
    <div className="stage">
      <div className="receiver-account-card">
        <p>{getReceiverDetails.name}</p>
        <h6>
          ------------
          {getReceiverDetails.accountNumber.slice(
            12,
            getReceiverDetails.accountNumber.length,
          )}
        </h6>
        <span>{getReceiverDetails.status}</span>
      </div>
      <p className="note">
        <span>Note : </span>if account details is incorrect pleace re-enter
        correct account number.
      </p>
      <button className="next-btn transfer-btn" onClick={next}>
        <FaArrowRight />
      </button>
      <button className="pre-btn transfer-btn" onClick={previos}>
        <FaArrowLeft />
      </button>
    </div>
  );
}

export default Stage2;
