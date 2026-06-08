import React, { useEffect, useState } from "react";
import "./PaymentStatus.css";

function PaymentFailed() {
  const [add, setAdd] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAdd(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="payment-failed">
      <img
        src="./icons/money.png"
        className={add ? "money hide" : "money"}
        width={"100px"}
        alt=""
      />
      <img
        src="./icons/wallet.png"
        className={add ? "sender-wallet wallet hide" : "sender-wallet wallet"}
        alt=""
        width={"100px"}
      />
      <img
        src="./icons/wallet.png"
        className={add ? "wallet failed" : "receiver-wallet wallet"}
        alt=""
        width={"100px"}
      />
      {add ? (
        <>
          <p>Failed</p>
        </>
      ) : null}
    </div>
  );
}

export default PaymentFailed;
