import { useEffect, useState } from "react";
import useDebounce from "../contact-list/useDebounce";

const useDocumentsGrid = (documents) => {
  const Documents = documents || [];
  const [tableData, setTableData] = useState([]);
  const [searchDataArr, setSearchDataArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState([]);
  const [uploadedBy, setUploadedBy] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedUploadedBy, setSelectedUploadedBy] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    setTableData(Array.isArray(Documents) ? Documents : []);
  }, [documents]);

  const filterData = (
    tableData,
    searchTerm,
    selectedType,
    selectedUploadedBy
  ) => {
    let filteredData = tableData;

    if (searchTerm !== "") {
      const lowercasedFilter = searchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        Object.keys(item).some((key) => {
          const value = item[key];
          return (
            value !== null &&
            value !== undefined &&
            value.toString().toLowerCase().includes(lowercasedFilter)
          );
        })
      );
    }

    if (selectedType && selectedType.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedType.includes(item.type)
      );
    }

    if (selectedUploadedBy) {
      filteredData = filteredData.filter(
        (item) => item.createdby === selectedUploadedBy
      );
    }

    if (fromDate && toDate) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.createdat);
        return (itemDate >= fromDate && itemDate <= toDate);
      });
    }

    return filteredData;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    if (tableData) {
      setSearchDataArr(
        filterData(
          tableData,
          debouncedSearchTerm,
          selectedType,
          selectedUploadedBy,
          fromDate,
          toDate
        )
      );
    }
  }, [
    debouncedSearchTerm,
    selectedType,
    selectedUploadedBy,
    fromDate,
    toDate,
    tableData,
  ]);

  useEffect(() => {
    if (tableData) {
      const types = [...new Set(tableData.map((documents) => documents.type))];
      setType(types);
    }
  }, [tableData]);

  useEffect(() => {
    if (tableData) {
      const uploadedBy = [
        ...new Set(tableData.map((documents) => documents.createdby)),
      ];
      setUploadedBy(uploadedBy);
    }
  }, [tableData]);

  return {
    tableData,
    setTableData,
    searchDataArr,
    setSearchDataArr,
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
  };
};

export default useDocumentsGrid;
