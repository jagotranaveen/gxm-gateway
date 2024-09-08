import React from "react";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import ContactTable from "./ContactTable";

const ContactList = () => {
  return (
    <>
      <Card className="gen-card h-full">
        <div className="flex justify-content-between formgrid grid grid-nogutter">
          <div>
            <p className="general-info">Contact List</p>
          </div>
        </div>
        <div className="card">
          <TabView>
            <TabPanel header="HSP" className="tab-panel">
              <ContactTable contactLabel="HSP" />
            </TabPanel>
            <TabPanel header="Customer" className="tab-panel">
              <ContactTable contactLabel="Customer" />
            </TabPanel>
          </TabView>
        </div>
      </Card>
    </>
  );
};

export default ContactList;
