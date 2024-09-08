import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "primereact/card";
import copy from "copy-to-clipboard";
import useBankDetails from "./UseBankDetails";
import Notification from "../notification/Notification";
import { fetchBankDetails, resetBankDetails } from "./bankDetailsSlice";

const BankDetails = () => {
  const dispatch = useDispatch();
  const bankDetails = useSelector((state) => state.bankDetails.bankDetails);
  const generalStatus = useSelector((state) => state.bankDetails.status);
  const error = useSelector((state) => state.bankDetails.error);

  useEffect(() => {
    if (generalStatus === "idle") {
      dispatch(fetchBankDetails());
    }
  }, [generalStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetBankDetails());
    };
  }, []);

  const {
    isEditing,
    tempFormData,
    successMessage,
    setSuccessMessage,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleDiscardClick,
  } = useBankDetails(bankDetails || {});

  if (generalStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (generalStatus === "failed") {
    return <div>Error: {error}</div>;
  }
  const handleCopyClick = () => {
    copy(tempFormData.bankAccountNumber);
  };

  return (
    <>
      <Card className="gen-card card-height">
        <div className="general-info-container flex justify-content-between formgrid grid grid-nogutter">
          <div>
            <p className="general-info">Bank Details</p>
            <p className="general-info-para">
              This body copy will explain the information below by setting
              context
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
          ) : (
            <button className="edit-button" onClick={handleEditClick}>
              Edit
              <span className="pi pi-pencil text-xs ml-2"></span>
            </button>
          )}
          <Notification
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </div>
        <div className="formgrid grid">
          <div className="field col-12">
            <label className="input-label">Bank name</label>
            <input
              type="text"
              name="bank_name"
              placeholder="Enter Bank name"
              value={tempFormData.bank_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
          </div>
          <div className="field col-12 md:col-6">
            <label className="input-label">Bank account number</label>
            <div className="flex relative">
              <input
                type="text"
                name="bank_account_number"
                placeholder="Enter Bank account number"
                value={tempFormData.bank_account_number}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field appearance-none outline-none w-full"
              />
              <span
                className="pi pi-copy copy-icon"
                onClick={handleCopyClick}
              ></span>
            </div>
          </div>
          <div className="field col-12 md:col-6">
            <label>Beneficiary Currency</label>
            <select
              name="beneficiary_currency"
              value={tempFormData.beneficiary_currency}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field surface-overlay outline-none w-full"
            >
              <option value="KRW">Select</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">Pound</option>
              <option value="JPY">Rupee</option>
            </select>
          </div>
          <div className="field col-12 md:col-4">
            <label className="input-label">Bank Address</label>
            <input
              type="text"
              name="bank_address"
              placeholder="Enter Bank Address"
              value={tempFormData.bank_address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
          </div>
          <div className="field col-12 md:col-4">
            <label className="input-label">City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={tempFormData.city}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
          </div>
          <div className="field col-12 md:col-4">
            <label className="input-label">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter Country"
              value={tempFormData.country}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default BankDetails;
