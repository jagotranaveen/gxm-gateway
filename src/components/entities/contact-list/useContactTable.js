import { useState, useEffect } from "react";
import { fetchCustomerContact, fetchHspContact } from "./contactListSlice";
import { useDispatch } from "react-redux";
import useDebounce from "./useDebounce";

const useContactTable = (hspContact, customerContact, contactLabel) => {
  const HspContact = hspContact?.result || {};
  const CustomerContact = customerContact?.result || {};
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchDataArr, setSearchDataArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false);
  const [role, setRole] = useState([]);
  const [location, setLocation] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contactLabel === "HSP") {
      setData(Array.isArray(HspContact) ? HspContact : []);
    } else {
      setData(Array.isArray(CustomerContact) ? CustomerContact : []);
    }
  }, [HspContact, customerContact, contactLabel]);

  const filterData = (data, searchTerm) => {
    if (searchTerm === "") {
      return data;
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      return data.filter((item) =>
        Object.keys(item).some((key) =>
          item[key]?.toString().toLowerCase().includes(lowercasedFilter)
        )
      );
    }
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    setSearchDataArr(filterData(data, debouncedSearchTerm));
  }, [debouncedSearchTerm, data]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    if (data) {
      const roles = [...new Set(data.map((contact) => contact.role))];
      setRole(roles);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const locations = [...new Set(data.map((contact) => contact.location))];
      setLocation(locations);
    }
  }, [data]);

  useEffect(() => {
    if (selectedItem && selectedFilter?.code && Array.isArray(data)) {
      const filteredData = data.filter((item) => {
        let isMatch = false;

        if (selectedFilter.code === "role" && item?.role) {
          isMatch = item.role
            .toLowerCase()
            .includes(selectedItem.toLowerCase());
        } else if (selectedFilter.code === "location" && item?.location) {
          isMatch = item.location
            .toLowerCase()
            .includes(selectedItem.toLowerCase());
        }

        return isMatch;
      });

      setSearchDataArr(filteredData);
    } else {
      setSearchDataArr(data);
    }
  }, [selectedItem, selectedFilter, data]);

  const showEditDialog = (rowData) => {
    setRowToEdit(rowData);
    setIsAddMode(false);
    setEditVisible(true);
  };

  const showAddDialog = () => {
    setRowToEdit({
      id: data.length + 1,
      name: "",
      lastname: "",
      company: "",
      role: "",
      email: "",
      phonenumber: "",
      location: "",
    });
    setIsAddMode(true);
    setEditVisible(true);
  };

  const showDeleteDialog = (rowData) => {
    setRowToDelete(rowData);
    setVisible(true);
  };

  const deleteRow = async () => {
    try {
      const hspResponse = await fetch("/entity/entity_id/delete_hsp_contact", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(HspContact),
      });
      const hspData = await hspResponse.json();
      if (hspData.ok) {
        dispatch(fetchHspContact());
      }

      const customerResponse = await fetch(
        "/entity/entity_id/delete_customer_contact",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(CustomerContact),
        }
      );
      const customerData = await customerResponse.json();
      if (customerData.ok) {
        dispatch(fetchCustomerContact());
      }

      if (hspResponse.ok || customerResponse.ok) {
        setMessage(hspData.message || customerData.message);
      } else {
        setMessage("Failed to delete address details");
      }
    } catch (error) {
      console.error("Error deleting information:", error);
    }
    setVisible(false);
  };

  return {
    data,
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    isAddMode,
    rowToEdit,
    setRowToEdit,
    rowToDelete,
    setRowToDelete,
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
    setSearchDataArr,
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    selectedItem,
    setSelectedItem,
    filterToggle,
    setFilterToggle,
    role,
    setRole,
    location,
    setLocation,
  };
};

export default useContactTable;
