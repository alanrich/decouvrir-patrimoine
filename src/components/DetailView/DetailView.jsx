import React, { useState, memo, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import BusinessIcon from "@mui/icons-material/Business";
import PublicIcon from "@mui/icons-material/Public";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

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
    backgroundColor: "#ADD8E6", // Hover effect for inactive tabs ==> Change color
  },
}));

// Tab Panel renders content based on which tab is selected
const TabPanel = ({ children, value, index }) => {
  return value === index ? <Box sx={{ padding: 2 }}>{children}</Box> : null;
};

// Temporarily memoize it all, (probably too much overhead)
// As the component grows more complex we will see what's expensive to re-render
const DetailView = memo(({ object }) => {
  // consider refactoring to TypeScript for a refresher on TS syntax
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
          height: "3.5rem", // Set height of header area so active tab covers full height ==> Might complicate future styling work
        }}
      >
        <ChromeTabs value={tabValue} onChange={handleTabChange}>
          {["General", "Incidents", "Persons of Interest", "Notes"].map(
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
            {/* General Tab */}
            <TabPanel value={tabValue} index={0}>
              {object ? (
                <Grid container spacing={2}>
                  {/* Address */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocationOnIcon
                      sx={{ color: "#1976d2", marginRight: "8px" }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Address:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ marginLeft: "8px", fontWeight: "bold" }}
                    >
                      {object.adresse || "N/A"}
                    </Typography>
                  </Grid>

                  {/* INSEE Code */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <MapIcon sx={{ color: "#1976d2", marginRight: "8px" }} />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      INSEE Code:
                    </Typography>
                    <Chip
                      label={object.code_insee || "N/A"}
                      sx={{
                        marginLeft: "8px",
                        backgroundColor: "#e0f7fa",
                        fontWeight: "bold",
                      }}
                    />
                  </Grid>

                  {/* Municipality */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <BusinessIcon
                      sx={{ color: "#1976d2", marginRight: "8px" }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Municipality:
                    </Typography>
                    <Chip
                      label={object.commune || "N/A"}
                      sx={{
                        marginLeft: "8px",
                        backgroundColor: "#e8eaf6",
                        fontWeight: "bold",
                      }}
                    />
                  </Grid>

                  {/* Latitude */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PublicIcon sx={{ color: "#1976d2", marginRight: "8px" }} />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Latitude:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ marginLeft: "8px", fontWeight: "bold" }}
                    >
                      {object.geo_point_2d?.lat || "N/A"}
                    </Typography>
                  </Grid>

                  {/* Longitude */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <GpsFixedIcon
                      sx={{ color: "#1976d2", marginRight: "8px" }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Longitude:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ marginLeft: "8px", fontWeight: "bold" }}
                    >
                      {object.geo_point_2d?.lon || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Typography color="textSecondary">No item selected.</Typography>
              )}
            </TabPanel>

            {/* Incidents Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography>
                <Typography variant="h6" gutterBottom>
                  Add Incident
                </Typography>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={incidentDescription}
                  onChange={(e) => setIncidentDescription(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddIncident}
                >
                  Add Incident
                </Button>

                {incidents.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                      Previous Incidents
                    </Typography>
                    <List>
                      {incidents.map((incident) => (
                        <ListItem key={incident.id} alignItems="flex-start">
                          <ListItemText
                            primary={incident.description}
                            secondary={incident.date}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Typography>
            </TabPanel>

            {/* Persons of Interest Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography>
                <Typography variant="h6" gutterBottom>
                  Add Person of Interest
                </Typography>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={personDescription}
                  onChange={(e) => setPersonDescription(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddPerson}
                >
                  Add Person
                </Button>

                {personsOfInterest.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                      Persons of Interest
                    </Typography>
                    <List>
                      {personsOfInterest.map((person) => (
                        <ListItem key={person.id} alignItems="flex-start">
                          <ListItemText
                            primary={person.name}
                            secondary={person.description}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Typography>
            </TabPanel>

            {/* Notes Tab */}
            <TabPanel value={tabValue} index={3}>
              <Typography>
                <Typography variant="h6" gutterBottom>
                  Add Note
                </Typography>
                <TextField
                  label="Note"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNote}
                >
                  Add Note
                </Button>

                {notes.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                      Notes
                    </Typography>
                    <List>
                      {notes.map((note) => (
                        <ListItem key={note.id} alignItems="flex-start">
                          <ListItemText
                            primary={note.text}
                            secondary={note.date}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Typography>
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
