import React from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import NewsComponent from "../../Components/NewsComponent/NewsComponent";

export default function News() {
  return (
    <div>
      <Topbar />
      <div className="container-fuild ">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <NewsComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
