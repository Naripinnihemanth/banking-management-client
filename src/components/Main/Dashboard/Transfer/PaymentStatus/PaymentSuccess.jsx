import React, { useContext, useEffect, useState } from "react";
import "./PaymentStatus.css";
import { Link } from "react-router-dom";
import { navContext } from "../../../../../context/NavContext";
import Transactions from "../../../Transactions/Transactions";
import { popUpContext } from "../../../../../context/PopUpContext";
function PaymentSuccess() {
  const [add, setAdd] = useState(false);
  const { setElement } = useContext(navContext);
  const { PopUp, setPopUp } = useContext(popUpContext);

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
      {add ? <p>Success</p> : <p className="pro">Processing</p>}
      <button
        className="done"
        onClick={() =>
          windowSize.width
            ? setPopUp(null)
            : setElement(<Transactions></Transactions>)
        }
      >
        Done
      </button>
    </div>
  );
}

export default PaymentSuccess;
