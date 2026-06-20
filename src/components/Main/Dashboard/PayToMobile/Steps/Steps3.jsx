import React, { useContext, useEffect, useState } from "react";
import "./Steps.css";
import OtpField from "../../../../OtpField/OtpField";
import api from "../../../../../api";
import emailjs from "@emailjs/browser";
import { useEffectEvent } from "react";
import { messageContext } from "../../../../../context/MassageContext";
import Loading from "../../../../Loading/Loading";
function Steps3({ otpData, sender, stages }) {
  const { message, setMessage } = useContext(messageContext);
  const [UserOtp, setUserOtp] = useState("");
  const [loading, setLoading] = useState(false);
  function handleOtp(otp) {
    setUserOtp(otp);
  }
  async function getOtp() {
    setLoading(true);
    try {
      const res = await api.get(`/account/get_otp/${sender.account_number}`);
      if (res.status === 200) {
        otpData.setOtp(res?.data);
        sendOtp(res?.data);
      }
    } catch (err) {
      console.log(err?.respose.data);
      setLoading(false);
    }
  }

  async function sendOtp(otp) {
    setLoading(true);
    try {
      if ((sender?.account_number, otp)) {
        const emailRes = await emailjs.send(
          "service_nwrhn9j",
          "template_k2o7zz2",
          {
            email: sender?.user.email,
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
        data: err?.response.data,
        danger: true,
      });
    } finally {
      setLoading(false);
    }
  }

  function verifyOtp() {
    setLoading(true);
    if (UserOtp == otpData.otp) {
      setMessage({
        data: "OTP verifyed !",
        danger: false,
      });
      stages((pre) => pre + 1);
    } else {
      setMessage({
        data: "OTP Invalide !",
        danger: true,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    getOtp();
  }, []);

  useEffect(() => {
    if (UserOtp.length == 4) {
      verifyOtp();
    }
  }, [UserOtp]);

  return (
    <div className="step step3">
      {loading ? <Loading></Loading> : null}
      <div className="otp-container">
        <p>Enter OTP :</p>
        <OtpField length={4} superOtp={handleOtp}></OtpField>
      </div>
      <p
        style={{
          fontSize: "0.75rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        OTP sended to this mail {sender?.user.email}
      </p>
    </div>
  );
}

export default Steps3;
