import React from "react";
import { Card } from "primereact/card";

const Notifications = () => {
  return (
    <>
      <Card className="gen-card h-full">
        <div className="general-info-container flex justify-content-between formgrid grid grid-nogutter">
          <div>
            <p className="profile-heading">Notifications</p>
            <p className="profile-para">Notifications....</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Notifications;
