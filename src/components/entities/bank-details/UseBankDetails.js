import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchBankDetails from "./bankDetailsSlice";

const useBankDetails = (initialFormData) => {
  const [isEditing, setIsEditing] = useState(false);
  const initialBankDetails = initialFormData?.result?.bank_details || {};
  const [tempFormData, setTempFormData] = useState(initialBankDetails);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const newBankDetails = initialFormData?.result?.bank_details || {};
    if (JSON.stringify(newBankDetails) !== JSON.stringify(tempFormData)) {
      setTempFormData(newBankDetails);
    }
  }, [initialFormData]);

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch("/entity/entity_id/bank_details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        dispatch(fetchBankDetails());
      }
    } catch (error) {
      console.error("Error updating information:", error);
    }
    setIsEditing(false);
  };

  const handleDiscardClick = () => {
    setTempFormData(initialBankDetails);
    setIsEditing(false);
  };

  return {
    isEditing,
    tempFormData,
    successMessage,
    setSuccessMessage,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleDiscardClick,
  };
};

export default useBankDetails;
