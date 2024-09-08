import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import AddressSection from "./AddressSection";
import useAddressForm from "./UseAddressForm";
import Notification from "../notification/Notification";
import {
  fetchRegisterAddress,
  fetchTradingAddress,
  resetAddresses,
} from "./addressesSlice";

const Addresses = () => {
  const dispatch = useDispatch();

  const registerAddress = useSelector(
    (state) => state.addresses.registerAddress
  );
  const tradingAddress = useSelector((state) => state.addresses.tradingAddress);
  const generalStatus = useSelector((state) => state.addresses.status);

  useEffect(() => {
    if (generalStatus === "idle") {
      dispatch(fetchRegisterAddress());
      dispatch(fetchTradingAddress());
    }
  }, [generalStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetAddresses());
    };
  }, []);

  const {
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
  } = useAddressForm(registerAddress || {}, tradingAddress || {});

  return (
    <>
      <Card className="gen-card h-full">
        <div className="flex justify-content-between formgrid grid grid-nogutter">
          <div>
            <p className="general-info">Addresses</p>
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
        <div className="card">
          <TabView>
            <TabPanel header="Register" className="tab-panel">
              <AddressSection
                officeLabel="Register office address"
                isEditing={isEditing}
                formData={tempFormData}
                handleInputChange={handleInputChange}
              />
            </TabPanel>
            <TabPanel header="Trading" className="tab-panel">
              <AddressSection
                officeLabel="Trading office address"
                isEditing={isEditing}
                formData={tempTradingFormData}
                handleInputChange={handleTradingInputChange}
              />
            </TabPanel>
          </TabView>
        </div>
      </Card>
    </>
  );
};

export default Addresses;
