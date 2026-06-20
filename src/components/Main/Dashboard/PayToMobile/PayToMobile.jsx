import React, { useContext, useEffect, useState } from "react";
import "./PayToMobile.css";
import Steps1 from "./Steps/Steps1";
import Steps3 from "./Steps/Steps3";
import Steps2 from "./Steps/Steps2";
import Stage5 from "../Transfer/Stages/Stage5";
import { IoClose } from "react-icons/io5";
import { siderContext } from "../../../../context/RightSiderContext";
import { accountContext } from "../../../../context/AccountContext";
import Stage6 from "../Transfer/Stages/Stage6";
import { popUpContext } from "../../../../context/PopUpContext";
function PayToMobile() {
  const { PopUp, setPopUp } = useContext(popUpContext);
  const { accounts } = useContext(accountContext);
  const { setSider } = useContext(siderContext);
  const [sender, setSender] = useState({});
  const [receiver, setReceiver] = useState({});
  const [amount, setAmount] = useState("");
  const [stages, setStages] = useState(0);
  const [otp, setOtp] = useState("");
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
  return (
    <div className="pay-to-mobile">
      <IoClose
        onClick={
          windowSize.width <= 500 ? () => setPopUp(null) : () => setSider(null)
        }
      />
      {stages === 0 ? (
        <Steps1 stages={setStages} receiver={setReceiver}></Steps1>
      ) : stages === 1 ? (
        <Steps2
          accounts={accounts}
          setStage={setStages}
          setSender={{ sender, setSender }}
          amount={{ amount, setAmount }}
        ></Steps2>
      ) : stages == 2 ? (
        <Steps3 otpData={{ otp, setOtp }} sender={sender} stages={setStages} />
      ) : stages == 3 ? (
        <Stage6
          getSender={sender?.account_number}
          getReceiver={receiver?.account_number}
          amount={amount}
        ></Stage6>
      ) : null}
    </div>
  );
}

export default PayToMobile;
