import React from "react";
import "./SearchItemCard.css";
import { RiArrowRightDoubleFill } from "react-icons/ri";
function SearchItemCard({ data }) {
  return (
    <div className="search-item-card">
      <h4>{data.user.name}</h4>
      <p>
        {data.account_number.slice(12, data.account_number.length)} |{" "}
        {data.type}
      </p>
      <RiArrowRightDoubleFill />
    </div>
  );
}

// account_number: "ACC1780811360166";
// balance: 150;
// id: 2;
// status: "ACTIVE";
// type: "SEVINGS";
// user:
// email: "hemanthnaripinni125@gmail.com";
// id: 6;
// mobile: "8985145540";
// name: "Madhavi Naripinni";
// password: "$2a$10$0tSAZsZmuh.s5qYa6KrARuwu5tNViObwcQl9QTbHphDwAbQgfJNlu";
// role: "USER";
// username: "hemanthnaripinni125";

export default SearchItemCard;
