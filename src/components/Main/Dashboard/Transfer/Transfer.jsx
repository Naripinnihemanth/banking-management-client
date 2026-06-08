import React, { useEffect, useState } from "react";
import "./Transfer.css";
import { useContext } from "react";
import { accountContext } from "../../../../context/AccountContext";
import Stage1 from "./Stages/Stage1";
import Stage2 from "./Stages/Stage2";
import Stage3 from "./Stages/Stage3";
import Stage4 from "./Stages/Stage4";
import Stage5 from "./Stages/Stage5";
import Stage6 from "./Stages/Stage6";
import api from "../../../../api";
import Loading from "../../../Loading/Loading";
import emailjs from "@emailjs/browser";
function Transfer() {
  const { accounts } = useContext(accountContext);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [sender, setSender] = useState("");
  const [otp, setOtp] = useState("");
  const [stages, setStages] = useState(0);
  const [receiverDetails, setReceiverDetails] = useState({});
  const [receiverAccountError, setReceiverAccountError] = useState({});
  const [loading, setLoading] = useState(false);
  // accountNumber: "ACC1778146674457",
  // balance: 0,
  // email: "deepak4119@gmail.com",
  // name: "Deepak Naripinni",
  // role: "USER",
  // status: "ACTIVE",
  // type: "SEVINGS",
  // userId: 3,

  async function getReceiverAccount() {
    if (receiver != "") {
      setLoading(true);
      try {
        const res = await api.get(`/account/get_account_details/${receiver}`);
        setReceiverDetails(res.data);
        console.log(res.data);
      } catch (error) {
        setStages(0);
        setReceiverAccountError(error.response.data);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <div className="transfer" popover="auto" id="transfer">
      {loading ? (
        <Loading></Loading>
      ) : stages == 0 ? (
        <Stage1
          receiverAcc={{ receiver, setReceiver }}
          requestAmount={{ amount, setAmount }}
          stages={setStages}
          getAccount={getReceiverAccount}
          error={receiverAccountError}
        ></Stage1>
      ) : stages == 1 && receiverDetails != null ? (
        <Stage2
          getReceiverDetails={receiverDetails}
          stages={setStages}
        ></Stage2>
      ) : stages == 2 ? (
        <Stage3
          stages={setStages}
          getAllAccounts={accounts}
          sender={setSender}
        ></Stage3>
      ) : stages == 3 ? (
        <Stage4
          stages={setStages}
          getReceiver={receiverDetails}
          getSender={{ accounts, sender }}
          amount={amount}
        ></Stage4>
      ) : stages == 4 ? (
        <Stage5
          stages={setStages}
          senderData={{ sender, accounts }}
          otpData={{ otp, setOtp }}
        ></Stage5>
      ) : stages == 5 ? (
        <Stage6
          stages={setStages}
          getSender={sender}
          getReceiver={receiverDetails}
          amount={amount}
        ></Stage6>
      ) : null}
    </div>
  );
}

export default Transfer;
