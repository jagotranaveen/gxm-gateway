import React from "react";
import { useLocation } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";

export default function BasicDemo() {
  const location = useLocation();

  const renderPath = () => {
    console.log("location-----------", location.pathname.split("/")[1]);
    const path = location.pathname.split("/")[1];
    switch (path) {
      case "dashboard":
        return [{ label: "dashboard" }, { label: "" }];
      case "entities":
        return [
          { label: "Company & Entities" },
          { label: "Wisa Technology (Korea)" },
        ];
      case "settings":
        return { heading: "Settings" };
      default:
        return [{ label: "dashboard" }, { label: "" }];
    }
  };

  const items = renderPath();

  return (
    <div className="mb-4">
      {items.heading ? (
        <p className="settings-heading">{items.heading}</p>
      ) : (
        <BreadCrumb model={items} />
      )}
    </div>
  );
}
