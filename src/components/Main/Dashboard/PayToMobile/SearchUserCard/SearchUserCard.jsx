import React, { useContext } from "react";
import "./SearchUserCard.css";
import { FaAnglesRight } from "react-icons/fa6";
import api from "../../../../../api";
import { messageContext } from "../../../../../context/MassageContext";
function SearchUserCard({ data, stages, receiver }) {
  const { message, setMessage } = useContext(messageContext);
  async function getAccount() {
    try {
      const res = await api.get(`/account/get_default/${data.mobile}`);
      if (res.status == 200) {
        receiver(res.data);
        stages((pre) => pre + 1);
      }
    } catch (err) {
      setMessage({
        data: err.response.data,
        danger: true,
      });
      console.log(err.response.data);
    }
  }

  return (
    <div className="search-user-card" onClick={getAccount}>
      <h4>{data?.name}</h4>
      <p>
        <span>mobile : </span>------{data?.mobile.slice(6)}
      </p>
      <FaAnglesRight />
    </div>
  );
}

export default SearchUserCard;
