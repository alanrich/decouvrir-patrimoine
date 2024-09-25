// DetailView.js
import React, { useState, memo, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import GeoLocationTab from "./GeoLocationTab";
import IncidentsTab from "./IncidentsTab";
import PersonsOfInterestTab from "./PersonsOfInterestTab";
import NotesTab from "./NotesTab";
import TabPanel from "./TabPanel";

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

const DetailView = memo(({ object }) => {
  DetailView.propTypes = {
    object: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      adresse: PropTypes.string,
      code_insee: PropTypes.string,
      commune: PropTypes.string,
      geo_point_2d: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number,
      }),
    }),
  };

  DetailView.defaultProps = {
    object: null,
  };

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  // State for incidents, notes, and persons of interest
  const [incidents, setIncidents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [personsOfInterest, setPersonsOfInterest] = useState([]);

  // State for form inputs
  const [incidentDescription, setIncidentDescription] = useState("");
  const [noteText, setNoteText] = useState("");
  const [personName, setPersonName] = useState("");
  const [personDescription, setPersonDescription] = useState("");

  // Load existing data from localStorage when the component mounts or object changes
  useEffect(() => {
    if (object && object.id != null) {
      // Load incidents
      const savedIncidents = JSON.parse(
        localStorage.getItem(`incidents_${object.id}`)
      );
      if (savedIncidents) {
        setIncidents(savedIncidents);
      } else {
        setIncidents([]);
      }

      // Load notes
      const savedNotes = JSON.parse(localStorage.getItem(`notes_${object.id}`));
      if (savedNotes) {
        setNotes(savedNotes);
      } else {
        setNotes([]);
      }

      // Load persons of interest
      const savedPersons = JSON.parse(
        localStorage.getItem(`persons_${object.id}`)
      );
      if (savedPersons) {
        setPersonsOfInterest(savedPersons);
      } else {
        setPersonsOfInterest([]);
      }
    }
  }, [object]);

  // Handlers for saving data
  const handleAddIncident = () => {
    if (incidentDescription.trim() !== "") {
      const newIncident = {
        id: Date.now(),
        description: incidentDescription.trim(),
        date: new Date().toLocaleString(),
      };
      const updatedIncidents = [...incidents, newIncident];
      setIncidents(updatedIncidents);
      localStorage.setItem(
        `incidents_${object.id}`,
        JSON.stringify(updatedIncidents)
      );
      setIncidentDescription("");
    }
  };

  const handleAddNote = () => {
    if (noteText.trim() !== "") {
      const newNote = {
        id: Date.now(),
        text: noteText.trim(),
        date: new Date().toLocaleString(),
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem(`notes_${object.id}`, JSON.stringify(updatedNotes));
      setNoteText("");
    }
  };

  const handleAddPerson = () => {
    if (personName.trim() !== "" && personDescription.trim() !== "") {
      const newPerson = {
        id: Date.now(),
        name: personName.trim(),
        description: personDescription.trim(),
      };
      const updatedPersons = [...personsOfInterest, newPerson];
      setPersonsOfInterest(updatedPersons);
      localStorage.setItem(
        `persons_${object.id}`,
        JSON.stringify(updatedPersons)
      );
      setPersonName("");
      setPersonDescription("");
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1, // Allow the component to grow and fill the parent
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        border: "1px solid #ddd",
        overflow: "auto",
      }}
    >
      {/* Tabs for DetailView */}
      <Box
        sx={{
          backgroundColor: "#f4f6f8",
          padding: "8px 8px",
          borderBottom: "1px solid #ddd",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          height: "3.5rem", // Set height of header area so active tab covers full height
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

      {/* Tab Content */}
      <CardContent sx={{ padding: "16px", flex: 1 }}>
        {object ? (
          <>
            {/* GeoLocation Tab */}
            <TabPanel value={tabValue} index={0}>
              <GeoLocationTab object={object} />
            </TabPanel>

            {/* Incidents Tab */}
            <TabPanel value={tabValue} index={1}>
              <IncidentsTab
                incidents={incidents}
                handleAddIncident={handleAddIncident}
                incidentDescription={incidentDescription}
                setIncidentDescription={setIncidentDescription}
              />
            </TabPanel>

            {/* Persons of Interest Tab */}
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

            {/* Notes Tab */}
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
});

export default DetailView;
