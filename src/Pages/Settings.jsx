import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../components/entities/entities.scss";
import "../components/settings/settings.scss";
import SettingsSideBar from "../components/settings/sidebar/SettingsSidebar";

const Settings = () => {
  const location = useLocation();
  const activeTab = location.pathname.split("/")[2] || "my-profile";

  return (
    <div className="grid grid-nogutter">
      <div className="col-12 Entities-container">
        <div className="grid">
          <div className="col-3">
            <SettingsSideBar activeTab={activeTab} setActiveTab={() => {}} />
          </div>
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
