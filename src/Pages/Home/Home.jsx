import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import Rightbar from "../../Components/Rightbar/Rightbar";

export default function Home({}) {
  return (
    <div>
      <Topbar />
      <div className="container-fuild">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-6">
            <Feed />
          </div>
          <div className="col-3">
            <Rightbar />
          </div>
        </div>
      </div>
    </div>
  );
}
