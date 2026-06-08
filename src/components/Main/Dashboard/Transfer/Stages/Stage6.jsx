import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Stages.css";
import PaymentProcessing from "../PaymentStatus/PaymentProcessing";
import PaymentSuccess from "../PaymentStatus/PaymentSuccess";
import PaymentFailed from "../PaymentStatus/PaymentFailed";
import Loading from "../../../../Loading/Loading";
import api from "../../../../../api";
function Stage6({ stages, getSender, getReceiver, amount }) {
  const [isSuccess, setIsSuccess] = useState(null);

  async function transfer() {
    try {
      const res = await api.post("/account/transfer", {
        senderAccount: getSender,
        receiverAccount: getReceiver.accountNumber,
        amount: amount,
      });
      if (res.status === 200) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    }
  }

  function previos() {
    stages((pre) => pre - 1);
  }
  function next() {
    stages((pre) => pre + 1);
  }
  useEffect(() => {
    transfer();
  }, []);
  return (
    <div className="stage6">
      {isSuccess == null ? (
        <PaymentProcessing></PaymentProcessing>
      ) : isSuccess ? (
        <PaymentSuccess></PaymentSuccess>
      ) : (
        <PaymentFailed></PaymentFailed>
      )}
    </div>
  );
}

export default Stage6;
