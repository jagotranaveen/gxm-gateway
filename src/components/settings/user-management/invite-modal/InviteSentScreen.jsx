import React from 'react';
import { Dialog } from 'primereact/dialog';
import "./modal.scss";

const InvitesSentScreen = ({ visible, handleDone, setVisible }) => {
  return (
    <Dialog className='invite-dialog' visible={visible} onHide={() => setVisible(false)}>
      <div className="success-screen">
        <div className='upper-container'>
        <i className="pi pi-send icon-size" ></i>
        <h5 className='invite-sent-heading'>Invites Sent</h5>
        <p className='invite-sent-desc'>Your invites have been shared to your team.</p>
        </div>
        <div className="success-buttons">
             <button  className="skip-btn mr-2"  onClick={handleDone}> Update Settings </button>
             <button className="send-invite-btn"  onClick={handleDone}> Done </button>
        </div>
      </div>
    </Dialog>
  );
};

export default InvitesSentScreen;
