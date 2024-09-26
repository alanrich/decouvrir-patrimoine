import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const IncidentsTab = ({
  incidents,
  handleAddIncident,
  incidentDescription,
  setIncidentDescription,
}) => {
  return (
    <div>
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
      <Button variant="contained" color="primary" onClick={handleAddIncident}>
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
    </div>
  );
};

IncidentsTab.propTypes = {
  incidents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleAddIncident: PropTypes.func.isRequired,
  incidentDescription: PropTypes.string.isRequired,
  setIncidentDescription: PropTypes.func.isRequired,
};

export default IncidentsTab;
