import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "primereact/card";
import useGeneralInformation from "./UseGeneralInformation";
import Notification from "../notification/Notification";
import {
  fetchGeneralInformation,
  resetGeneralInformation,
} from "./generalInformationSlice";

const GeneralInformation = () => {
  const dispatch = useDispatch();
  const generalInformation = useSelector(
    (state) => state.generalInformation.generalInformation
  );
  const generalStatus = useSelector((state) => state.generalInformation.status);
  const error = useSelector((state) => state.generalInformation.error);

  useEffect(() => {
    if (generalStatus === "idle") {
      dispatch(fetchGeneralInformation());
    }
  }, [generalStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetGeneralInformation());
    };
  }, []);

  const {
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
  } = useGeneralInformation(generalInformation || {});

  if (generalStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (generalStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Card className="gen-card h-full">
        <div className="general-info-container flex justify-content-between formgrid grid grid-nogutter">
          <div>
            <p className="general-info">General Information</p>
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
            <label className="input-label">Salesforce number</label>
            <input
              type="text"
              name="salesforce_number"
              placeholder="Enter Salesforce number"
              value={tempFormData?.salesforce_number}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
          </div>
          <div className="field col-12 md:col-6">
            <label className="input-label">Registered name*</label>
            <input
              type="text"
              name="registered_name"
              placeholder="Enter Registered name*"
              value={tempFormData?.registered_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
            {errorMessage && <p className="p-error">{errorMessage}</p>}
          </div>
          <div className="field col-12 md:col-6">
            <label className="input-label">Trading Name</label>
            <input
              type="text"
              name="trading_name"
              placeholder="Enter Trading Name"
              value={tempFormData?.trading_name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
          </div>
          <div className="field col-12 md:col-6">
            <label className="input-label">Country of incorporation*</label>
            <input
              type="text"
              name="country_of_incorporation"
              placeholder="Enter Country of incorporation"
              value={tempFormData?.country_of_incorporation}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
            {errorCountry && <p className="p-error">{errorCountry}</p>}
          </div>
          <div className="field col-12 md:col-6">
            <label className="input-label">Date of incorporation</label>
            <input
              type="text"
              name="date_of_incorporation"
              placeholder="Enter Date of incorporation"
              value={tempFormData?.date_of_incorporation}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
          </div>
          <div className="field col-12">
            <label className="input-label">Registration number</label>
            <input
              type="text"
              name="registration_number"
              placeholder="Enter Registration number"
              value={tempFormData?.registration_number}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
          </div>
          <div className="field col-12">
            <label className="input-label">Business activity</label>
            <input
              type="text"
              name="activity"
              placeholder="Enter Business activity"
              value={tempFormData?.activity}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field appearance-none outline-none w-full"
            />
          </div>
          <div className="field col-12">
            <label className="input-label">Company website</label>
            <input
              type="text"
              name="website"
              placeholder="Enter Company website"
              value={tempFormData?.website}
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

export default GeneralInformation;
