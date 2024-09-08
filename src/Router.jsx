import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard"; // Replace with your actual Home component
import About from "./Pages/About"; // Replace with your actual About component
import Entities from "./Pages/Entities";
import MyEntities from "./Pages/MyEntities";
import GeneralInformation from "./components/entities/general-information/GeneralInformation";
import Addresses from "./components/entities/address/Addresses";
import BankDetails from "./components/entities/bank-details/BankDetails";
import ContactList from "./components/entities/contact-list/ContactList";
import DocumentsGrid from "./components/entities/documents-grid/DocumentsGrid";
import Settings from "./Pages/Settings";
import MyProfile from "./components/settings/my-profile/MyProfile";
import Notifications from "./components/settings/notifications/Notifications";
import UserManagement from "./components/settings/user-management/UserManagement";

const Router = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/entities" element={<Entities />}>
        <Route
          path="/entities/general-information"
          element={<GeneralInformation />}
        />
        <Route path="/entities/addresses" element={<Addresses />} />
        <Route path="/entities/bank-details" element={<BankDetails />} />
        <Route path="/entities/contact-list" element={<ContactList />} />
        <Route path="/entities/documents-grid" element={<DocumentsGrid />} />
      </Route>
      <Route path="/settings" element={<Settings />}>
        <Route path="/settings/my-profile" element={<MyProfile />} />
        <Route path="/settings/notification" element={<Notifications />} />
        <Route path="/settings/user-management" element={<UserManagement />} />
      </Route>
      <Route path="/my-entities" element={<MyEntities />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Router;
