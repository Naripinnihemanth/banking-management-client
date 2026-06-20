import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import api from "../../../../../api";
import emailjs from "@emailjs/browser";
import Loading from "../../../../Loading/Loading";
import "./Stages.css";
import { messageContext } from "../../../../../context/MassageContext";
function Stage5({ stages, senderData, otpData }) {
  const { sender, accounts } = senderData;
  const [account, setAccount] = useState({});
  const [userOtp, setUserOtp] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [massage, setMessage] = useState("");
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  function filter() {
    accounts.map((item) => {
      if (item.account_number === sender) {
        setAccount(item);
      }
    });
  }
  function verify() {
    if (userOtp == otpData.otp) {
      setDisabled(false);
      setMessage({
        data: "OTP verified !",
        danger: false,
      });
    } else {
      setDisabled(true);
      setMessage({
        data: "invalide OTP !",
        danger: true,
      });
    }
  }
  async function getOtp() {
    try {
      const res = await api.get(`/account/get_otp/${sender}`);
      otpData.setOtp(res.data);
      setOtp(res.data);
    } catch (err) {
      console.log(err.respose.data);
    }
  }

  async function sendOtp() {
    setLoading(true);
    try {
      if (account != null && otp != null) {
        const emailRes = await emailjs.send(
          "service_nwrhn9j",
          "template_k2o7zz2",
          {
            email: account.user.email,
            passcode: otp,
          },
          "ocrUYNN414NkaV6XY",
        );
        if (emailRes.status === 200) {
          setMessage({
            data: "otp send successful !!",
            danger: false,
          });
        }
      }
    } catch (err) {
      setMessage({
        data: err.response.data,
        danger: true,
      });
    } finally {
      setLoading(false);
    }
  }

  function previos() {
    stages((pre) => pre - 1);
  }
  function next() {
    if (disabled == false) {
      stages((pre) => pre + 1);
    }
  }
  useEffect(() => {
    filter();
    getOtp();
  }, []);
  useEffect(() => {
    sendOtp().catch((err) => console.log(err));
  }, [otp]);

  return (
    <div className="stage">
      {loading ? <Loading></Loading> : null}
      <div className="stage5-note">
        <span>Note : </span>we'r sent a OTP to linked email address{" "}
        <span>{account?.user?.email}</span>
      </div>
      <div className="otp-verify">
        <input
          type="number"
          placeholder="Enter OTP"
          value={userOtp}
          onChange={(e) => setUserOtp(e.target.value)}
        />
        <button onClick={verify}>Verify</button>
      </div>
      {disabled == false ? (
        <button className="next-btn disabled transfer-btn" onClick={next}>
          Pay
        </button>
      ) : null}
      <button className="pre-btn transfer-btn" onClick={previos}>
        <FaArrowLeft />
      </button>
    </div>
  );
}

export default Stage5;
