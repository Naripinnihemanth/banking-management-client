import React, { useContext, useEffect, useState } from "react";
import api from "../../api";
import "./Header.css";
import { userContext } from "../../context/UserContext";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import SearchItemCard from "./SearchItemCard/SearchItemCard";
import { CgMenuLeftAlt } from "react-icons/cg";
function Header({ sider }) {
  const { user } = useContext(userContext);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getSearch() {
    setLoading(true);
    try {
      const res = await api.get(`/account/search/${search}`);
      if (res.status === 200) {
        setResult(res.data);
      }
    } catch (err) {
      console.log(err?.response.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (search != "") {
      getSearch();
    }
  }, [search]);

  return (
    <div className="header">
      <p className="header-title">HELLO, {user?.name}!</p>
      <button onClick={() => sider((pre) => !pre)}>
        <CgMenuLeftAlt />
      </button>
      <div className="header-actions">
        <div className="search-bar">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Account number / mobile"
            onChange={(e) => setSearch(e.target.value)}
          />
          {search != "" && search != null ? (
            <div className="search-accounts">
              {loading ? (
                <p>loading...</p>
              ) : result.length == 0 ? (
                <p>No active users found</p>
              ) : (
                <div className="items-container">
                  {result.map((item) => (
                    <SearchItemCard data={item} key={item.id}></SearchItemCard>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
        <IoIosNotifications className="notification-icon" />
      </div>
    </div>
  );
}

export default Header;
