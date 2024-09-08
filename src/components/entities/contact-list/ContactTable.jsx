import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useContactTable from "./useContactTable";
import EditContactDialog from "./EditContactDialog";
import DeleteDialog from "./DeleteDialog";
import Notification from "../notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerContact,
  fetchHspContact,
  resetContactList,
} from "./contactListSlice";
import { Dropdown } from "primereact/dropdown";

const filterBy = [
  { name: "Role", code: "role" },
  { name: "Location", code: "location" },
];

const ContactTable = ({ contactLabel }) => {
  const dispatch = useDispatch();

  const hspContact = useSelector((state) => state.contactList.hspContact);
  const customerContact = useSelector(
    (state) => state.contactList.customerContact
  );
  const generalStatus = useSelector((state) => state.contactList.status);

  useEffect(() => {
    if (generalStatus === "idle") {
      dispatch(fetchHspContact());
      dispatch(fetchCustomerContact());
    }
  }, [generalStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetContactList());
    };
  }, []);

  const {
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    isAddMode,
    rowToEdit,
    setRowToEdit,
    message,
    setMessage,
    successMessage,
    setSuccessMessage,
    first,
    rows,
    onPageChange,
    showEditDialog,
    showAddDialog,
    showDeleteDialog,
    deleteRow,
    searchDataArr,
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    selectedItem,
    setSelectedItem,
    filterToggle,
    setFilterToggle,
    role,
    location,
  } = useContactTable(hspContact || [], customerContact || [], contactLabel);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center">
        <span
          className="pi pi-pencil ml-4 mr-3 pencil-pointer"
          onClick={() => showEditDialog(rowData)}
        ></span>
        <span
          className="pi pi-trash mr-6 pencil-pointer"
          onClick={() => showDeleteDialog(rowData)}
        ></span>
      </div>
    );
  };

  const handleSave = async () => {
    if (isAddMode) {
      try {
        const hspResponse = await fetch("/entity/entity_id/add_hsp_contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hspContact),
        });
        const hspData = await hspResponse.json();
        if (hspData.ok) {
          dispatch(fetchHspContact());
        }

        const customerResponse = await fetch(
          "/entity/entity_id/add_customer_contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customerContact),
          }
        );
        const customerData = await customerResponse.json();
        if (customerData.ok) {
          dispatch(fetchCustomerContact());
        }

        if (hspResponse.ok || customerResponse.ok) {
          setSuccessMessage(hspData.message || customerData.message);
        } else {
          setSuccessMessage("Failed to add address details");
        }
      } catch (error) {
        console.error("Error adding information:", error);
      }
    } else {
      try {
        const hspResponse = await fetch(
          "/entity/entity_id/update_hsp_contact",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(hspContact),
          }
        );
        const hspData = await hspResponse.json();
        if (hspData.ok) {
          dispatch(fetchHspContact());
        }

        const customerResponse = await fetch(
          "/entity/entity_id/update_customer_contact",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customerContact),
          }
        );
        const customerData = await customerResponse.json();
        if (customerData.ok) {
          dispatch(fetchCustomerContact());
        }

        if (hspResponse.ok || customerResponse.ok) {
          setSuccessMessage(hspData.message || customerData.message);
        } else {
          setSuccessMessage("Failed to update address details");
        }
      } catch (error) {
        console.error("Error updating information:", error);
      }
    }
    setEditVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="formgrid grid">
        <div className="field col-4 mb-0 pl-0">
          <div className="input-wrapper ml-2">
            <span className="pi pi-search span-left"></span>
            <input
              type="text"
              placeholder="Search contact by name, last name, role, email.."
              className="input-field appearance-none outline-none w-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="pi pi-search span-right"></span>
          </div>
        </div>
        <div className="field col-6 mb-0">
          <div className="flex align-items-center gap-2">
            <p className="filter-by">Filter By </p>
            <Dropdown
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.value);
                setSelectedItem(null);
                setFilterToggle(true);
                setSearchTerm("");
              }}
              options={filterBy}
              optionLabel="name"
              placeholder="Filter By"
              className="w-full md:w-11rem"
            />

            <Dropdown
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.value)}
              options={
                selectedFilter
                  ? selectedFilter.code === "role"
                    ? role
                    : location
                  : []
              }
              optionLabel="name"
              placeholder="All"
              className="w-full md:w-11rem"
              disabled={!filterToggle}
            />
          </div>
        </div>
        <div className="field col-2 mb-0">
          <div className="flex justify-content-end gap-2">
            <button className="add-new-button" onClick={showAddDialog}>
              Add New <i className="pi pi-plus ml-2"></i>
            </button>
          </div>
        </div>

        <Notification
          message={message}
          setMessage={setMessage}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
        <div className="field col-12 table-section">
          <div className="card">
            <DataTable
              value={searchDataArr}
              sortMode="multiple"
              tableStyle={{ minWidth: "50rem" }}
              paginator
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              first={first}
              rows={rows}
              onPage={onPageChange}
              rowsPerPageOptions={[10, 20, 30]}
              className="datatable-right-align"
              emptyMessage="No results were found"
            >
              <Column
                field="firstname"
                header="First Name"
                sortable
                className="table-col-width"
              ></Column>
              <Column
                field="lastname"
                header="Last Name"
                sortable
                className="table-col-width"
              ></Column>
              <Column
                field="company"
                header="Company"
                sortable
                className="table-col-width"
              ></Column>
              <Column
                field="role"
                header="Role"
                sortable
                className="table-col-width"
              ></Column>
              <Column
                field="email"
                header="Email"
                sortable
                className="table-col-width"
              ></Column>
              <Column
                field="phonenumber"
                header="Phone Number"
                sortable
                className="table-col-width"
              ></Column>
              <Column
                field="location"
                header="Location"
                sortable
                className="table-col-width"
              ></Column>
              <Column
                body={actionBodyTemplate}
                className="table-col-width"
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>

      <DeleteDialog
        visible={visible}
        onHide={() => setVisible(false)}
        onConfirm={deleteRow}
      />

      <EditContactDialog
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        rowToEdit={rowToEdit}
        setRowToEdit={setRowToEdit}
        onSave={handleSave}
        isAddMode={isAddMode}
      />
    </>
  );
};

export default ContactTable;
