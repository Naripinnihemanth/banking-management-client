import React, { useEffect, useState } from "react";
import "./Steps.css";
import api from "../../../../../api";
import SearchUserCard from "../SearchUserCard/SearchUserCard";
function Steps1({ stages, receiver }) {
  const [mobile, setMobile] = useState("");
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);
  async function getSearch() {
    setLoading(true);
    try {
      const res = await api.get(`/auth/search_user/${mobile}`);
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (mobile != "") {
      getSearch();
    }
  }, [mobile]);

  return (
    <div className="step step1">
      <h2>pay to mobile</h2>
      <input
        type="text"
        placeholder="Mobile"
        onChange={(e) => setMobile(e.target.value)}
        autoFocus
      />
      <div className="search-items">
        {Loading ? (
          <p
            style={{
              width: "100%",
              fontFamily: "var(--p)",
              textAlign: "center",
            }}
          >
            Loading..
          </p>
        ) : users.length == 0 ? (
          <p
            style={{
              width: "100%",
              fontFamily: "var(--p)",
              textAlign: "center",
            }}
          >
            no active users
          </p>
        ) : (
          users.map((item) => (
            <SearchUserCard
              data={item}
              key={item.id}
              stages={stages}
              receiver={receiver}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Steps1;
