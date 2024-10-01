import React, { useState, useCallback } from "react";
import DetailView from "./DetailView";

const DetailViewWrapper = ({ object, selectedDataSet }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  return (
    <DetailView
      object={object}
      selectedDataSet={selectedDataSet}
      tabValue={tabValue}
      handleTabChange={handleTabChange}
    />
  );
};

export default DetailViewWrapper;
