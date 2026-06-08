import React from "react";
import "./PaymentStatus.css";
import Loading from "../../../../Loading/Loading";
function PaymentProcessing() {
  return (
    <div className="Payment-processing">
      <img src="./icons/money.png" className="money" width={"100px"} alt="" />
      <img
        src="./icons/wallet.png"
        className="sender-wallet wallet"
        alt=""
        width={"100px"}
      />
      <img
        src="./icons/wallet.png"
        className="receiver-wallet wallet"
        alt=""
        width={"100px"}
      />
      <p>Processing</p>
    </div>
  );
}

export default PaymentProcessing;
