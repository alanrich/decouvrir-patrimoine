import React, { memo } from "react";
import { Card, CardContent, Typography, Box, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import GeoLocationTab from "./DetailViewTabs/GeoLocationTab";
import IncidentsTab from "./DetailViewTabs/IncidentsTab";
import PersonsOfInterestTab from "./DetailViewTabs/PersonsOfInterestTab";
import NotesTab from "./DetailViewTabs/NotesTab";
import TabPanel from "./DetailViewTabs/TabPanel";

const ChromeTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    display: "none", // Hide the default MUI tab indicator
  },
  "& .Mui-selected": {
    color: "#1976d2", // Blue color for active tab text
    fontWeight: "bold",
  },
});

const ChromeTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minWidth: 72,
  marginRight: theme.spacing(0.5),
  padding: "0.5rem 1rem", // Padding for spacing between tabs
  borderRadius: "0.75rem 0.75rem 0 0",
  backgroundColor: "#e0e0e0",
  transition: "background-color 0.3s ease-in-out",

  "&.Mui-selected": {
    backgroundColor: "#ADD8E6",
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)", // Slight shadow to elevate active tab
  },

  "&:hover": {
    backgroundColor: "#ADD8E6", // Hover effect for inactive tabs
  },
}));

const DetailView = memo(
  ({
    object,
    tabValue,
    handleTabChange,
    incidents,
    notes,
    personsOfInterest,
    handleAddIncident,
    handleAddNote,
    handleAddPerson,
    incidentDescription,
    noteText,
    personName,
    personDescription,
    setIncidentDescription,
    setNoteText,
    setPersonName,
    setPersonDescription,
  }) => {
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          border: "1px solid #ddd",
          overflow: "auto",
          mb: "16px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f4f6f8",
            padding: "8px 8px",
            borderBottom: "1px solid #ddd",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            height: "3.5rem",
          }}
        >
          <ChromeTabs value={tabValue} onChange={handleTabChange}>
            {["GeoLocation", "Incidents", "Persons of Interest", "Notes"].map(
              (label, index) => (
                <ChromeTab
                  key={label}
                  label={label}
                  selected={tabValue === index}
                />
              )
            )}
          </ChromeTabs>
        </Box>

        <CardContent sx={{ padding: "16px", flex: 1 }}>
          {object ? (
            <>
              <TabPanel value={tabValue} index={0}>
                <GeoLocationTab object={object} />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <IncidentsTab
                  incidents={incidents}
                  handleAddIncident={handleAddIncident}
                  incidentDescription={incidentDescription}
                  setIncidentDescription={setIncidentDescription}
                />
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <PersonsOfInterestTab
                  personsOfInterest={personsOfInterest}
                  handleAddPerson={handleAddPerson}
                  personName={personName}
                  setPersonName={setPersonName}
                  personDescription={personDescription}
                  setPersonDescription={setPersonDescription}
                />
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <NotesTab
                  notes={notes}
                  handleAddNote={handleAddNote}
                  noteText={noteText}
                  setNoteText={setNoteText}
                />
              </TabPanel>
            </>
          ) : (
            <Typography color="textSecondary">No item selected.</Typography>
          )}
        </CardContent>
      </Card>
    );
  }
);

DetailView.propTypes = {
  object: PropTypes.object,
  tabValue: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  incidents: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  personsOfInterest: PropTypes.array.isRequired,
  handleAddIncident: PropTypes.func.isRequired,
  handleAddNote: PropTypes.func.isRequired,
  handleAddPerson: PropTypes.func.isRequired,
  incidentDescription: PropTypes.string.isRequired,
  noteText: PropTypes.string.isRequired,
  personName: PropTypes.string.isRequired,
  personDescription: PropTypes.string.isRequired,
  setIncidentDescription: PropTypes.func.isRequired,
  setNoteText: PropTypes.func.isRequired,
  setPersonName: PropTypes.func.isRequired,
  setPersonDescription: PropTypes.func.isRequired,
};

export default DetailView;
