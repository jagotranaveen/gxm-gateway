import React from "react";
import { Card } from "primereact/card";
import { Link, useLocation } from "react-router-dom";

const SettingsSidebar = () => {
  const location = useLocation();
  const activeTab = location.pathname.split("/")[2] || "general-information";

  return (
    <>
      <Card className="card-style p-0">
        <div className="flex flex-column">
          <Link
            to="/settings/my-profile"
            className={`sidebar-align ${activeTab === "my-profile" ? "active-entity" : "menu-hover"}`}
          >
            <div className="flex align-items-center">
              <span className="pi pi-id-card icon-color"></span>
              <p className="sidebar-menu">My Profile</p>
            </div>
            <span className="pi pi-angle-right icon-color"></span>
          </Link>
          <Link
            to="/settings/notification"
            className={`sidebar-align ${activeTab === "notification" ? "active-entity" : "menu-hover"}`}
          >
            <div className="flex align-items-center">
              <span className="pi pi-bell icon-color"></span>
              <p className="sidebar-menu">Notification</p>
            </div>
            <span className="pi pi-angle-right icon-color"></span>
          </Link>
          <Link
            to="/settings/user-management"
            className={`sidebar-align ${activeTab === "user-management" ? "active-entity" : "menu-hover"}`}
          >
            <div className="flex align-items-center">
              <span className="pi pi-users icon-color"></span>
              <p className="sidebar-menu">User Management</p>
            </div>
            <span className="pi pi-angle-right icon-color"></span>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default SettingsSidebar;
