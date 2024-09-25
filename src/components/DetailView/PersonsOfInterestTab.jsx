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

const PersonsOfInterestTab = ({
  personsOfInterest,
  handleAddPerson,
  personName,
  setPersonName,
  personDescription,
  setPersonDescription,
}) => {
  return (
    <div>
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
      <Button variant="contained" color="primary" onClick={handleAddPerson}>
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
    </div>
  );
};

PersonsOfInterestTab.propTypes = {
  personsOfInterest: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleAddPerson: PropTypes.func.isRequired,
  personName: PropTypes.string.isRequired,
  setPersonName: PropTypes.func.isRequired,
  personDescription: PropTypes.string.isRequired,
  setPersonDescription: PropTypes.func.isRequired,
};

export default PersonsOfInterestTab;
