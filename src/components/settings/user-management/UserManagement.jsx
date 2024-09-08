import React,{useState} from "react";
import { Card } from "primereact/card";
import InviteModal from "./invite-modal/InviteModal";

const UserManagement = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <Card className="gen-card h-full">
        <div className="general-info-container flex justify-content-between formgrid grid grid-nogutter">
          <div>
            <p className="profile-heading">User Management</p>
            <p className="profile-para">Management of personal information.</p>
          </div>
          <button className="send-invite-btn" onClick={() => setIsModalVisible(true)}> Invite Email </button>
        </div>
        <InviteModal visible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </Card>
    </>
  );
};

export default UserManagement;
