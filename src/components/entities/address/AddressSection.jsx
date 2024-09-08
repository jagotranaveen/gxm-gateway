import React from "react";

const AddressSection = ({
  officeLabel,
  isEditing,
  formData,
  handleInputChange,
}) => {
  return (
    <div className="formgrid grid">
      <div className="field col-12">
        <label className="input-label">{officeLabel}</label>
        <input
          type="text"
          name="office_label"
          placeholder={`Enter ${officeLabel}`}
          value={formData?.office_label}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="input-field appearance-none outline-none w-full"
        />
      </div>
      <div className="field col-12 md:col-6">
        <label className="input-label">City</label>
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={formData?.city}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="input-field appearance-none outline-none w-full"
        />
      </div>
      <div className="field col-12 md:col-6">
        <label className="input-label">State / Province</label>
        <input
          type="text"
          name="state_province"
          placeholder="Enter State / Province"
          value={formData?.state_province}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="input-field appearance-none outline-none w-full"
        />
      </div>
      <div className="field col-12 md:col-6">
        <label className="input-label">Postal code</label>
        <input
          type="text"
          name="postal_code"
          placeholder="Enter Postal code"
          value={formData?.postal_code}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="input-field appearance-none outline-none w-full"
        />
      </div>
      <div className="field col-12 md:col-6">
        <label className="input-label">Country</label>
        <input
          type="text"
          name="country"
          placeholder="Enter Country"
          value={formData?.country}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="input-field appearance-none outline-none w-full"
        />
      </div>
      <div className="field col-12 md:col-6">
        <label className="input-label">Phone number</label>
        <input
          type="text"
          name="phone_number"
          placeholder="Enter Phone number"
          value={formData?.phone_number}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="input-field appearance-none outline-none w-full"
        />
      </div>
      <div className="field col-12 md:col-6">
        <label className="input-label">Contact email</label>
        <input
          type="text"
          name="contact_email"
          placeholder="Enter Contact email"
          value={formData?.contact_email}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="input-field appearance-none outline-none w-full"
        />
      </div>
    </div>
  );
};

export default AddressSection;
