import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import EmailList from "./EmailList";
import "./modal.scss";
import InviteSentScreen from "./InviteSentScreen";
import useInviteModal from "./useInviteModal";

export default function InviteModal({ visible, setIsModalVisible }) {
  const {
    emails,
    setEmails,
    inputValue,
    invitesSent,
    handleKeyDown,
    removeEmail,
    handleSendInvite,
    message,
    handleInputChange,
    emailArr,
    setInvitesSent,
  } = useInviteModal();

  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const handleCheckEmails = () => {
    if (emails.length) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  };

  useEffect(() => {
    handleCheckEmails();
  }, [emails]);

  const handleDone = () => {
    setInvitesSent(false);
    setEmails([]);
    setIsModalVisible(false);
  };

  const renderScreen = () => {
    if (invitesSent) {
      return (
        <InviteSentScreen
          visible={visible}
          setVisible={setIsModalVisible}
          handleDone={handleDone}
        />
      );
    }

    return (
      <Dialog
        visible={visible}
        className="invite-dialog-width"
        onHide={() => {
          if (!visible) return;
          setIsModalVisible(false);
        }}
      >
        <p className="invite-dialog-heading">Invite Team Members</p>
        <div className="email-invite-content-container">
          <div>
            <p className="invite-dialog-para mb-3">
              Fill in individual emails below, assign a role and hit send!
            </p>
            {(message || (emailArr && emailArr.length > 0)) && (
              <div className="deletion-msg w-full mb-3">
                <span className="pi pi-times-circle mr-2 cancel-color"></span>
                <p>
                  {emailArr} {message}
                </p>
              </div>
            )}
            <div className="search-input-wrapper">
              {!emails.length && <i className="pi pi-search" />}
              <div className="email-input">
                {emails.map((email) => (
                  <div key={email.email} className="email-tag">
                    {email.email}
                    <Button
                      onClick={() => removeEmail(email.email)}
                      className="ml-1 search-cancel"
                      icon="pi pi-times"
                      rounded
                      outlined
                      severity="secondary"
                      aria-label="Cancel"
                    />
                  </div>
                ))}
                <input
                  className="email-input-field"
                  placeholder={
                    emails.length
                      ? ""
                      : "Search People by name, last name, email"
                  }
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <EmailList
              emails={emails}
              removeEmail={removeEmail}
              setEmails={setEmails}
            />
          </div>
          <div className="email-invite-buttons-container">
            <div className="flex align-items-center back-btn-hover">
              <button
                className="invite-back-btn mx-2"
                onClick={() => {
                  setIsModalVisible(false);
                  setEmails([]);
                }}
              >
                <i className="pi pi-arrow-left mr-1" /> Back
              </button>
            </div>
            <div className="flex">
              <button
                className="skip-btn mr-2"
                onClick={() => {
                  setIsModalVisible(false);
                  setEmails([]);
                }}
              >
                Skip
              </button>
              <button
                disabled={isBtnDisabled}
                className={`${isBtnDisabled && "disabled"} send-invite-btn`}
                onClick={handleSendInvite}
              >
                Send Invites
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <div className="modal-main-container card flex justify-content-center">
      {renderScreen()}
    </div>
  );
}
