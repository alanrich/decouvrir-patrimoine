import React, { useState, useEffect, useCallback } from "react";
import DetailView from "./DetailView";

const DetailViewWrapper = ({ object }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const [incidents, setIncidents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [personsOfInterest, setPersonsOfInterest] = useState([]);

  const [incidentDescription, setIncidentDescription] = useState("");
  const [noteText, setNoteText] = useState("");
  const [personName, setPersonName] = useState("");
  const [personDescription, setPersonDescription] = useState("");

  useEffect(() => {
    if (object && object.id != null) {
      const savedIncidents = JSON.parse(
        localStorage.getItem(`incidents_${object.id}`)
      );
      setIncidents(savedIncidents || []);

      const savedNotes = JSON.parse(localStorage.getItem(`notes_${object.id}`));
      setNotes(savedNotes || []);

      const savedPersons = JSON.parse(
        localStorage.getItem(`persons_${object.id}`)
      );
      setPersonsOfInterest(savedPersons || []);
    }
  }, [object]);

  const handleAddIncident = () => {
    if (incidentDescription.trim()) {
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
    if (noteText.trim()) {
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
    if (personName.trim() && personDescription.trim()) {
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
    <DetailView
      object={object}
      tabValue={tabValue}
      handleTabChange={handleTabChange}
      incidents={incidents}
      notes={notes}
      personsOfInterest={personsOfInterest}
      handleAddIncident={handleAddIncident}
      handleAddNote={handleAddNote}
      handleAddPerson={handleAddPerson}
      incidentDescription={incidentDescription}
      noteText={noteText}
      personName={personName}
      personDescription={personDescription}
      setIncidentDescription={setIncidentDescription}
      setNoteText={setNoteText}
      setPersonName={setPersonName}
      setPersonDescription={setPersonDescription}
    />
  );
};

export default DetailViewWrapper;
