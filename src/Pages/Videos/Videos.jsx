import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import VideosComponent from "../../Components/VideosComponent/VideosComponent";

export default function Videos() {
  return (
    <div>
      <Topbar />
      <div className="container-fuild ">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <VideosComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
