import React from "react";
import { Link } from "react-router-dom";
export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link
      to={`/profile/${user.username}`}
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      <li className="p-1 ml-2 hoverDiv" style={{ borderRadius: "10px" }}>
        <div className="ml-2 mr-2 d-flex align-items-center">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "noUserImage.png"
            }
            alt=""
            style={{ height: "30px", width: "30px" }}
            className="rounded-circle"
          ></img>
          <div style={{ width: "15px" }}></div>
          <span>{user.username}</span>
        </div>
      </li>
    </Link>
  );
}
