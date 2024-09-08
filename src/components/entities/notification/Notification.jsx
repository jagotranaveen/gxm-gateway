import React, { useEffect } from "react";

const Notification = ({
  successMessage,
  setSuccessMessage,
  message,
  setMessage,
}) => {
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, setSuccessMessage]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!successMessage && !message) return null;

  return (
    <div className="col-12">
      {successMessage && (
        <div className="success-message w-full">
          <span className="pi pi-check mr-2 check-color"></span>
          <p>{successMessage}</p>
        </div>
      )}
      {message && (
        <div className="deletion-msg w-full">
          <span className="pi pi-times-circle mr-2 cancel-color"></span>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
