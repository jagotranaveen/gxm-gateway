import React from "react";
import { Dialog } from "primereact/dialog";

const DeleteDialog = ({ visible, onHide, onConfirm }) => {
  return (
    <Dialog visible={visible} className="edit-contact-dialog" onHide={onHide}>
      <p className="del-dialog-heading">Delete this contact?</p>
      <p className="del-dialog-para">
        Deleted contact information cannot be restored. Are you sure?
      </p>
      <div className="flex justify-content-end gap-2 mt-4">
        <button className="edit-button" onClick={onHide}>
          Cancel
        </button>
        <button className="confirm-btn" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
