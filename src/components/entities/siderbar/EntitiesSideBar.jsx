import React from "react";
import { Card } from "primereact/card";
import { Link, useLocation } from "react-router-dom";

const EntitiesSideBar = () => {
  const location = useLocation();
  const activeTab = location.pathname.split("/")[2] || "general-information";

  return (
    <>
      <Card className="card-style h-full p-0">
        <div className="flex flex-column">
          <Link
            to="/entities/general-information"
            className={`sidebar-align ${activeTab === "general-information" ? "active-entity" : "menu-hover"}`}
          >
            <div className="flex align-items-center">
              <span className="pi pi-id-card icon-color"></span>
              <p className="sidebar-menu">General Information</p>
            </div>
            <span className="pi pi-angle-right icon-color"></span>
          </Link>
          <Link
            to="/entities/addresses"
            className={`sidebar-align ${activeTab === "addresses" ? "active-entity" : "menu-hover"}`}
          >
            <div className="flex align-items-center">
              <span className="pi pi-users icon-color"></span>
              <p className="sidebar-menu">Addresses</p>
            </div>
            <span className="pi pi-angle-right icon-color"></span>
          </Link>
          <Link
            to="/entities/bank-details"
            className={`sidebar-align ${activeTab === "bank-details" ? "active-entity" : "menu-hover"}`}
          >
            <div className="flex align-items-center">
              <span className="pi pi-calendar icon-color"></span>
              <p className="sidebar-menu">Bank Details</p>
            </div>
            <span className="pi pi-angle-right icon-color"></span>
          </Link>
          <Link
            to="/entities/contact-list"
            className={`sidebar-align ${activeTab === "contact-list" ? "active-entity" : "menu-hover"}`}
          >
            <div className="flex align-items-center">
              <span className="pi pi-cog icon-color"></span>
              <p className="sidebar-menu">Contact List</p>
            </div>
            <span className="pi pi-angle-right icon-color"></span>
          </Link>
          <Link
            to="/entities/documents-grid"
            className={`sidebar-align ${activeTab === "documents-grid" ? "active-entity" : "menu-hover"}`}
          >
            <div className="flex align-items-center">
              <span className="pi pi-file icon-color"></span>
              <p className="sidebar-menu">Documents Grid</p>
            </div>
            <span className="pi pi-angle-right icon-color"></span>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default EntitiesSideBar;
