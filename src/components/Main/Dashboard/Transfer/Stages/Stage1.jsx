import React, { useEffect, useRef, useState } from "react";
import "./Stages.css";
import { FaArrowRight } from "react-icons/fa6";
function Stage1({ receiverAcc, requestAmount, stages, getAccount, error }) {
  const nextBtn = useRef();
  const [amountMassage, setAmountMassage] = useState(null);
  function next() {
    if (requestAmount.amount != null && requestAmount.amount > 0) {
      stages((pre) => pre + 1);
      getAccount();
    } else {
      setAmountMassage(
        "amount must be graterthan 0 and no symbols are allowed",
      );
      getAccount();
      stages(0);
    }
  }
  return (
    <div className="stage">
      <div className="transfer-input">
        <p>transfer to :</p>
        <input
          type="text"
          required
          placeholder="account number"
          value={receiverAcc.receiver}
          onChange={(e) => receiverAcc.setReceiver(e.target.value)}
        />
        {error != null ? <p style={{ color: "red" }}>{error.massage}</p> : null}
      </div>
      <div className="transfer-input">
        <p>amount :</p>
        <input
          type="number"
          required
          placeholder="amount"
          value={requestAmount.amount}
          onChange={(e) => requestAmount.setAmount(e.target.value)}
        />
        {amountMassage != null ? (
          <p style={{ color: "red" }}>{amountMassage}</p>
        ) : null}
      </div>
      <button ref={nextBtn} className="next-btn transfer-btn" onClick={next}>
        <FaArrowRight />
      </button>
    </div>
  );
}

export default Stage1;
