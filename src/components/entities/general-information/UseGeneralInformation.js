import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGeneralInformation } from "./generalInformationSlice";

const useGeneralInformation = (initialFormData) => {
  const [isEditing, setIsEditing] = useState(false);
  const initialCompanyInformation =
    initialFormData?.result?.company_information || {};
  const [tempFormData, setTempFormData] = useState(initialCompanyInformation);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCountry, setErrorCountry] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const newCompanyInformation =
      initialFormData?.result?.company_information || {};
    if (
      JSON.stringify(newCompanyInformation) !== JSON.stringify(tempFormData)
    ) {
      setTempFormData(newCompanyInformation);
    }
  }, [initialFormData]);

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
    setErrorMessage("");
    setErrorCountry("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    let Error = false;
    if (!tempFormData.registered_name) {
      setErrorMessage("Registered name is mandatory.");
      Error = true;
    }
    if (!tempFormData.country_of_incorporation) {
      setErrorCountry("Country of incorporation is mandatory.");
      Error = true;
    }
    if (Error) {
      return;
    }
    dispatch(fetchGeneralInformation(tempFormData));
    try {
      const response = await fetch("/entity/entity_id/company_information", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        dispatch(fetchGeneralInformation());
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error updating information:", error);
      setErrorMessage("Failed to update general information.");
    }
    setIsEditing(false);
    setErrorMessage("");
    setErrorCountry("");
  };

  const handleDiscardClick = () => {
    setTempFormData(initialCompanyInformation);
    setIsEditing(false);
    setErrorMessage("");
    setErrorCountry("");
  };

  return {
    isEditing,
    tempFormData,
    successMessage,
    errorMessage,
    errorCountry,
    setSuccessMessage,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleDiscardClick,
  };
};

export default useGeneralInformation;
