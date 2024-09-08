import React, { useEffect } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { fetchDocuments, resetDocuments } from "./documentsGridSlice";
import { useDispatch, useSelector } from "react-redux";
import useDocumentsGrid from "./useDocumentsGrid";
import { format } from "date-fns";

const DocumentsGrid = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetDocuments());
    };
  }, [dispatch]);

  const documents = useSelector((state) => state?.documentsGrid?.documents);

  const {
    searchDataArr,
    searchTerm,
    setSearchTerm,
    type,
    uploadedBy,
    selectedType,
    setSelectedType,
    selectedUploadedBy,
    setSelectedUploadedBy,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  } = useDocumentsGrid(documents);

  const documentTemplate = (data) => {
    return (
      <a
        href={data.downloadurl}
        target="_blank"
        rel="noopener noreferrer"
        className="document-link"
      >
        {data.name}
      </a>
    );
  };

  const dateTemplate = (rowData) => {
    const formattedDate = format(new Date(rowData.createdat), "dd-MM-yyyy");
    return formattedDate;
  };

  return (
    <>
      <Card className="gen-card h-full">
        <div className="flex justify-content-between formgrid grid grid-nogutter">
          <div className="documents-grid">
            <p className="general-info">Documents Grid</p>
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col-3 mb-0 pl-0">
            <div className="input-wrapper ml-2">
              <span className="pi pi-search span-left"></span>
              <input
                type="text"
                placeholder="Search document"
                className="input-field appearance-none outline-none w-full"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setSelectedType("");
                  setSelectedUploadedBy("");
                  setFromDate("");
                  setToDate("");
                }}
              />
              <span className="pi pi-search span-right"></span>
            </div>
          </div>
          <div className="field col-9 mb-0">
            <div className="flex align-items-center gap-2">
              <div className="filter-container">
                <p className="filter-by">Filter By </p>
              </div>
              <Dropdown
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.value);
                  setSearchTerm("");
                }}
                options={type}
                optionLabel="name"
                placeholder="Type"
                className="w-full md:w-9rem"
              />
              <Dropdown
                value={selectedUploadedBy}
                onChange={(e) => {
                  setSelectedUploadedBy(e.value);
                  setSearchTerm("");
                }}
                options={uploadedBy}
                optionLabel="name"
                placeholder="Uploaded by"
                className="w-full md:w-9rem"
              />

              <label htmlFor="from_date">From</label>
              <Calendar
                id="from_date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.value);
                  setSearchTerm("");
                }}
                placeholder="Select date"
              />

              <label htmlFor="to_date">To </label>
              <Calendar
                id="to_date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.value);
                  setSearchTerm("");
                }}
                placeholder="Select date"
                disabled={!fromDate}
              />
            </div>
          </div>
          <div className="field col-12 table-section">
            <div className="card">
              <DataTable
                value={searchDataArr}
                sortMode="multiple"
                tableStyle={{ minWidth: "50rem" }}
                paginator
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                rows={10}
                rowsPerPageOptions={[10, 20, 30]}
                className="datatable-right-align"
                emptyMessage="No results were found"
              >
                <Column
                  field="name"
                  header="Document Name"
                  sortable
                  className="table-col-width"
                  body={documentTemplate}
                ></Column>
                <Column
                  field="type"
                  header="Document Type"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  field="createdat"
                  header="Date Created"
                  sortable
                  className="table-col-width"
                  body={dateTemplate}
                ></Column>
                <Column
                  field="createdby"
                  header="Uploaded by"
                  sortable
                  className="table-col-width"
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default DocumentsGrid;
