import React from "react";
import { Card } from "primereact/card";
import Notification from "../../entities/notification/Notification";
import useMyProfile from "./useMyProfile";

const MyProfile = () => {
  const {
    profilePicture,
    isEditing,
    successMessage,
    fileInputRef,
    handleIconClick,
    handleFileChange,
    handleDiscardClick,
    handleSaveClick,
    setSuccessMessage,
    handleNameChange,
    name,
  } = useMyProfile();

  return (
    <>
      <Card className="gen-card h-full">
        <div className="general-info-container flex justify-content-between formgrid grid grid-nogutter">
          <div>
            <p className="profile-heading">My Profile</p>
            <p className="profile-para">
              Manage your personal information and account preferences here.
            </p>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <button className="edit-button" onClick={handleDiscardClick}>
                Discard
              </button>
              <button className="add-btn" onClick={handleSaveClick}>
                Save Changes
              </button>
            </div>
          ) : null}
          <Notification
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
          <div className="formgrid grid">
            <div className="field col-12 mb-0 mt-5">
              <div className="profile-circle">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="profile-picture"
                  />
                ) : (
                  <p className="para-circle">P</p>
                )}
                <div className="edit-container" onClick={handleIconClick}>
                  <span className="pi pi-pencil edit-pen"></span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="input-display"
                />
              </div>
            </div>
            <div className="field col-12">
              <p className="user-role-heading">General Information</p>
            </div>
            <div className="field col-12 md:col-6 mb-0">
              <label className="input-label">Employee Name</label>
              <input
                type="text"
                name="Employee Name"
                placeholder="Enter Employee Name"
                value={name}
                onChange={handleNameChange}
                className="appearance-none outline-none w-full input"
              />
            </div>
            <div className="field col-12 md:col-6 mb-0">
              <label className="input-label">Registered Email</label>
              <input
                type="text"
                name="Registered Email"
                placeholder="Enter Registered Email"
                value="AArcand@email.com"
                disabled
                className="appearance-none outline-none w-full disabled-input"
              />
            </div>
            <div className="field col-12">
              <p className="user-role-heading">User Role & Access</p>
            </div>
            <div className="field col-12 md:col-6">
              <label className="input-label">User Role</label>
              <input
                type="text"
                name="User Role"
                placeholder="Enter User Role"
                value="System Admin"
                disabled
                className="appearance-none outline-none w-full disabled-input"
              />
            </div>
            <div className="field col-12 md:col-6">
              <label className="input-label">Allowed Entities</label>
              <input
                type="text"
                name="Allowed Entities"
                placeholder="Enter Allowed Entities"
                value="🇰🇷 Wisa Technologies (South Korea), 🇵🇹 Wisa Technologies (Portugal)"
                disabled
                className="appearance-none outline-none w-full disabled-input"
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MyProfile;
