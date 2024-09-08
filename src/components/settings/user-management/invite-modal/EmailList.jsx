import React from "react";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import SendInviteController from "./InviteModalController";

const EmailList = ({ emails, setEmails, removeEmail }) => {
  const { t } = useTranslation();

  const { allentites, userroles } = SendInviteController();

  const updateEmail = (email, key, value) => {
    const updatedEmails = emails.map((e) =>
      e.email === email ? { ...e, [key]: value } : e
    );
    setEmails(updatedEmails);
  };

  const truncateEmail = (email, maxLength = 20) => {
    if (email.length <= maxLength) return email;
    return `${email.slice(0, maxLength)}...`;
  };

  const demoOptions = [
    { name: "demo 1", code: "1" },
    { name: "demo 2", code: "2" },
    { name: "demo 3", code: "3" },
    { name: "demo 4", code: "4" },
    { name: "demo 5", code: "5" },
  ];

  return (
    <>
      <h5 className="email-list-heading">{t("INVITED_MEMBERS")}</h5>
      <div className="email-list-wrapper">
        <div className="email-items">
          {emails.map((email) => (
            <div key={email.email} className="email-item">
              <span>
                <i className="pi pi-user mr-3 user-icon" />
                {truncateEmail(email.email)}
              </span>
              <div className="email-actions">
                <Dropdown
                  value={email.role}
                  onChange={(e) => updateEmail(email.email, "role", e.value)}
                  options={userroles}
                  optionLabel="label"
                  placeholder="Select Role"
                  className="dropdown-width mr-3"
                />
                <Dropdown
                  value={email.entity}
                  onChange={(e) => updateEmail(email.email, "entity", e.value)}
                  options={allentites}
                  optionLabel="name"
                  placeholder="Select Entity"
                  className="dropdown-width mr-3"
                />
                <div
                  className="delete-container"
                  onClick={() => removeEmail(email.email)}
                >
                  <i className="pi pi-trash delete-btn "></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EmailList;
