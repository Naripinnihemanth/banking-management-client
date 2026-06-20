import React, { useEffect, useRef, useState } from "react";
import "./OtpField.css";
function OtpField({ length, superOtp }) {
  const [Otp, setOtp] = useState([...Array(length).fill("")]);
  const [active, setActive] = useState(0);
  const inputRef = useRef();
  function handleOtp(element, index) {
    const copy = [...Otp];
    copy[index] = element.value;
    setOtp(copy);
    if (index < length - 1 && element.value) {
      setActive(index + 1);
    }
  }
  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !Otp[index] && index > 0) {
      setActive(index - 1);
    }
  }
  useEffect(() => {
    inputRef.current?.focus();
  }, [active]);
  useEffect(() => {
    let newOtp = "";
    for (let i = 0; i < Otp.length; i++) {
      newOtp = newOtp + Otp[i];
    }
    superOtp(newOtp);
  }, [Otp]);

  return (
    <div className="otp-field">
      {Otp.map((item, i) => (
        <input
          ref={active == i ? inputRef : null}
          type="text"
          key={i}
          value={item}
          maxLength={1}
          onChange={(e) => handleOtp(e.target, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          inputMode="numeric"
        />
      ))}
    </div>
  );
}

export default OtpField;
