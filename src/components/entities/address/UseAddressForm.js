import { useState, useEffect } from "react";
import { fetchRegisterAddress, fetchTradingAddress } from "./addressesSlice";
import { useDispatch } from "react-redux";

const useAddressForm = (initialFormData, initialTradingFormData) => {
  const [isEditing, setIsEditing] = useState(false);
  const initialRegisterAddress = initialFormData?.result?.registerAddress || {};
  const [tempFormData, setTempFormData] = useState(initialRegisterAddress);
  const initialTradingAddress =
    initialTradingFormData?.result?.tradingAddress || {};
  const [tempTradingFormData, setTempTradingFormData] = useState(
    initialTradingAddress
  );
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setTempFormData(initialFormData?.result?.register_address || {});
    setTempTradingFormData(
      initialTradingFormData?.result?.trading_address || {}
    );
  }, [initialFormData, initialTradingFormData]);

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTradingInputChange = (e) => {
    const { name, value } = e.target;
    setTempTradingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const registerResponse = await fetch(
        "/entity/entity_id/register_address",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempFormData),
        }
      );
      const registerData = await registerResponse.json();
      if (registerData.ok) {
        dispatch(fetchRegisterAddress());
      }

      const tradingResponse = await fetch("/entity/entity_id/trading_address", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempTradingFormData),
      });
      const tradingData = await tradingResponse.json();
      if (tradingData.ok) {
        dispatch(fetchTradingAddress());
      }

      if (registerResponse.ok || tradingResponse.ok) {
        setSuccessMessage(registerData.message || tradingData.message);
      } else {
        setSuccessMessage("Failed to update address details");
      }
    } catch (error) {
      console.error("Error updating information:", error);
    }
    setIsEditing(false);
  };

  const handleDiscardClick = () => {
    setTempFormData(initialFormData);
    setTempTradingFormData(initialTradingFormData);
    setIsEditing(false);
  };

  return {
    isEditing,
    tempFormData,
    tempTradingFormData,
    successMessage,
    setSuccessMessage,
    handleEditClick,
    handleInputChange,
    handleTradingInputChange,
    handleSaveClick,
    handleDiscardClick,
  };
};

export default useAddressForm;
