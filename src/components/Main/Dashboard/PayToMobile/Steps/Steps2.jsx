import React, { useContext, useEffect, useState } from "react";
import "./Steps.css";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import { messageContext } from "../../../../../context/MassageContext";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
function Steps2({ accounts, setSender, setStage, amount }) {
  const { message, setMessage } = useContext(messageContext);

  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);

  function pay() {
    if (setSender.sender?.id) {
      if (amount.amount > 0) {
        setStage((pre) => pre + 1);
      } else {
        setMessage({
          data: "amount must be graterthan 0",
          danger: true,
        });
      }
    } else {
      setMessage({
        data: "Please select any account",
        danger: true,
      });
    }
  }

  useEffect(() => {
    accounts.map((item) => {
      if (item.default) {
        setSelected(item);
      }
    });
  }, [accounts]);
  useEffect(() => {
    setSender.setSender(selected);
  }, [selected]);

  return (
    <div className="step step2">
      <div className="enter-amount">
        <input
          type="number"
          placeholder="0.0RS"
          autoFocus
          value={amount.amount}
          onChange={(e) => amount.setAmount(e.target.value)}
        />
      </div>
      <div className="footer">
        <button className="back" onClick={() => setStage((pre) => pre - 1)}>
          <FaAngleDoubleLeft />
        </button>
        <button onClick={pay}>
          Pay <FaAngleDoubleRight />
        </button>
      </div>
      <div className={open ? "select-account open" : "select-account"}>
        <div className="selected">
          <div className="card">
            <h4>
              ----
              {selected?.account_number
                ? selected?.account_number.slice(12)
                : null}
            </h4>
            <p>{selected?.type}</p>
          </div>
          <p className="up" onClick={() => setOpen((pre) => !pre)}>
            {open ? <FaAngleDown /> : <FaAngleUp />}
          </p>
        </div>
        <div className="accounts">
          {accounts.map((item) => (
            <div
              className="step2-account-card"
              key={item.id}
              onClick={() => setSelected(item)}
            >
              <h4>----{item.account_number.slice(12)}</h4>
              <p>{item.type}</p>
              {selected.id == item.id ? (
                <p className="selected-item">
                  <FcOk />
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Steps2;
