import React, { useEffect, useState } from "react";
import "./PaymentStatus.css";
import { Link } from "react-router-dom";
function PaymentSuccess() {
  const [add, setAdd] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAdd(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="payment-success">
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
        className={add ? "wallet success" : "receiver-wallet wallet"}
        alt=""
        width={"100px"}
      />
      {add ? (
        <>
          <p>Success</p>
        </>
      ) : null}
    </div>
  );
}

export default PaymentSuccess;
