import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const EditContactDialog = ({
  visible,
  onHide,
  onSave,
  isAddMode,
}) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  })

  return (
    <Dialog visible={visible} onHide={onHide} className="edit-contact-dialog">
      <form onSubmit={handleSubmit(onSave)} className="form-container">
        <p className="del-dialog-heading">
          {isAddMode ? "Add New Contact" : "Edit Contact"}
        </p>
        <p className="del-dialog-para mb-3">
          {isAddMode
            ? "Fill in the new contact's information below and hit add contact when ready!"
            : "Change the contact information and hit save changes when ready!"}
        </p>

        <div className="formgrid grid">
          <div className="field col-6">
            <label className="contact-label">First Name</label>
            <Controller
              name="firstname"
              control={control}
              defaultValue=""
              rules={{ required: "First Name is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter First Name"
                  className={`input-field appearance-none outline-none w-full ${errors.firstname ? "error" : ""
                    }`}
                />
              )}
            />
            {errors.firstname && (
              <small className="error-message">{errors.firstname.message}</small>
            )}
          </div>
          <div className="field col-6">
            <label className="contact-label">Last Name</label>
            <Controller
              name="lastname"
              control={control}
              defaultValue=""
              rules={{ required: "Last Name is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Last Name"
                  className={`input-field appearance-none outline-none w-full ${errors.lastname ? "error" : ""
                    }`}
                />
              )}
            />
            {errors.lastname && (
              <small className="error-message">{errors.lastname.message}</small>
            )}
          </div>
          <div className="field col-12">
            <label className="contact-label">Role</label>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: "Role is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Role"
                  className={`input-field appearance-none outline-none w-full ${errors.role ? "error" : ""
                    }`}
                />
              )}
            />
            {errors.role && (
              <small className="error-message">{errors.role.message}</small>
            )}
          </div>
          <div className="field col-6">
            <label className="contact-label">Contact Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid.",
                },
              }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Email Address"
                  className={`input-field appearance-none outline-none w-full ${errors.email ? "error" : ""
                    }`}
                />
              )}
            />
            {errors.email && (
              <small className="error-message">{errors.email.message}</small>
            )}
          </div>
          <div className="field col-6">
            <label className="contact-label">Location</label>
            <Controller
              name="location"
              control={control}
              defaultValue=""
              rules={{ required: "Location is required." }}
              render={({ field }) => (
                <InputText
                  {...field}
                  type="text"
                  placeholder="Enter Location"
                  className={`input-field appearance-none outline-none w-full ${errors.location ? "error" : ""
                    }`}
                />
              )}
            />
            {errors.location && (
              <small className="error-message">{errors.location.message}</small>
            )}
          </div>
          <div className="field col-12">
            <label className="contact-label">Phone Number</label>
            <div className="flex justify-content-between">
              <InputText
                type="text"
                placeholder="Country Code"
                className="input-field appearance-none outline-none country-code"
              />
              <Controller
                name="phonenumber"
                control={control}
                defaultValue=""
                rules={{ required: "Phone Number is required." }}
                render={({ field }) => (
                  <InputText
                    {...field}
                    type="text"
                    placeholder="Enter Phone Number"
                    className={`input-field appearance-none outline-none phone-number ${errors.phonenumber ? "error" : ""
                      }`}
                  />
                )}
              />
            </div>
            {errors.phonenumber && (
              <small className="error-message">{errors.phonenumber.message}</small>
            )}
          </div>
        </div>
        <div className="flex justify-content-end gap-2 mt-4">
          <button type="button" className="edit-button" onClick={onHide}>
            Skip
          </button>
          <button type="submit" className="add-btn">
            {isAddMode ? "Add Contact" : "Save Changes"}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default EditContactDialog;