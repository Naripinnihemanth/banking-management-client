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
import { messageContext } from "../../../../context/MassageContext";
import { popUpContext } from "../../../../context/PopUpContext";
function Transfer() {
  const { accounts } = useContext(accountContext);
  const { setMessage } = useContext(messageContext);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [sender, setSender] = useState("");
  const [otp, setOtp] = useState("");
  const [stages, setStages] = useState(0);
  const [receiverDetails, setReceiverDetails] = useState({});
  const [loading, setLoading] = useState(false);
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
  async function getReceiverAccount() {
    if (receiver != "") {
      setLoading(true);
      try {
        const res = await api.get(`/account/get_account_details/${receiver}`);
        setReceiverDetails(res.data);
      } catch (error) {
        setStages(0);
        setMessage({
          data: "please enter correct account number",
          danger: true,
        });
      } finally {
        setLoading(false);
      }
    }
  }
  return windowSize.width <= 500 ? (
    <div className="transfer">
      <div className="cancel" onClick={() => setPopUp(null)}>
        cancel
      </div>
      {loading ? (
        <Loading></Loading>
      ) : stages == 0 ? (
        <Stage1
          receiverAcc={{ receiver, setReceiver }}
          requestAmount={{ amount, setAmount }}
          stages={setStages}
          getAccount={getReceiverAccount}
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
          getSender={sender}
          getReceiver={receiverDetails}
          amount={amount}
        ></Stage6>
      ) : null}
    </div>
  ) : (
    <div className="transfer" popover="auto" id="transfer">
      {loading ? (
        <Loading></Loading>
      ) : stages == 0 ? (
        <Stage1
          receiverAcc={{ receiver, setReceiver }}
          requestAmount={{ amount, setAmount }}
          stages={setStages}
          getAccount={getReceiverAccount}
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
          getSender={sender}
          getReceiver={receiverDetails}
          amount={amount}
        ></Stage6>
      ) : null}
    </div>
  );
}

export default Transfer;
