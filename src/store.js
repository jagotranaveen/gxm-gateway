import { configureStore } from "@reduxjs/toolkit";
import generalInformationReducer from "./components/entities/general-information/generalInformationSlice";
import bankDetailsReducer from "./components/entities/bank-details/bankDetailsSlice";
import addressesReducer from "./components/entities/address/addressesSlice";
import contactListReducer from "./components/entities/contact-list/contactListSlice";
import counterReducer from "./components/counter/counterSlice";
import myEntityReducer from "./Pages/MyEntities/myEntitySlice";
import inviteModalReducer from "./components/settings/user-management/invite-modal/InviteModalSlice";
import documentsGridReducer from "./components/entities/documents-grid/documentsGridSlice";

export const store = configureStore({
  reducer: {
    generalInformation: generalInformationReducer,
    bankDetails: bankDetailsReducer,
    addresses: addressesReducer,
    contactList: contactListReducer,
    counter: counterReducer,
    myentities: myEntityReducer,
    inviteusers: inviteModalReducer,
    documentsGrid: documentsGridReducer,
  },
});
