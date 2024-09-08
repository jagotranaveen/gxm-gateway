import { useState } from "react";
import SendInviteController from "./InviteModalController";

const useInviteModal = () => {
  const { isLoading, inviteResponse, error } = SendInviteController();
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [invitesSent, setInvitesSent] = useState(false);
  const [message, setMessage] = useState("");
  const [allEmails, setAllEmails] = useState([]);
  const [emailArr, setEmailArr] = useState([]);

  const validateEmail = (email) => {
    const regExpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regExpEmail.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      if (!validateEmail(inputValue)) {
        setMessage("Invalid Email address");
        return;
      }
      setEmails([...emails, { email: inputValue, role: "", entity: "" }]);
      setInputValue("");
      setMessage("");
    }
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email.email !== emailToRemove));
    setEmailArr([]);
    setMessage("");
  };

  const handleSendInvite = async () => {
    const invalidEmails = allEmails.filter(
      (allEmail) => !validateEmail(allEmail.email)
    );

    if (invalidEmails.length > 0) {
      setMessage("Invalid Email address");
      return;
    }

    const validEmails = allEmails.filter((allEmail) =>
      validateEmail(allEmail.email)
    );

    if (inputValue) {
      if (!validateEmail(inputValue)) {
        setMessage("Invalid Email address");
        return;
      }
      validEmails.push({ email: inputValue, role: "", entity: "" });
      emails.push({ email: inputValue, role: "", entity: "" });
    }

    setAllEmails(validEmails);
    setInputValue("");
    setMessage("");
    try {
      const response = await fetch("/user-management/users/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails: emails.map(item => ({
          email: item.email,
          role: item.role.id,
          entity: item.entity.id,
        })) }),
      });
      const data = await response.json();
      setMessage(data.message);

      if (data.status === true) {
        setInvitesSent(true);
      }
    } catch (error) {
      console.error("Error :", error);
      setEmailArr(error.message);
    }
  };

  return {
    isLoading,
    inviteResponse,
    error,
    emails,
    setEmails,
    inputValue,
    invitesSent,
    handleKeyDown,
    removeEmail,
    handleSendInvite,
    setInvitesSent,
    message,
    handleInputChange,
    emailArr,
  };
};

export default useInviteModal;
