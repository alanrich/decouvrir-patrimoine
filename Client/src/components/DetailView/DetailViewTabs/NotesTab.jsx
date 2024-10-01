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

const NotesTab = ({ notes, handleAddNote, noteText, setNoteText }) => {
  return (
    <div>
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
      <Button variant="contained" color="primary" onClick={handleAddNote}>
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
                <ListItemText primary={note.text} secondary={note.date} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

NotesTab.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleAddNote: PropTypes.func.isRequired,
  noteText: PropTypes.string.isRequired,
  setNoteText: PropTypes.func.isRequired,
};

export default NotesTab;
