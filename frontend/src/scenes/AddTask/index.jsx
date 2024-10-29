import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

function AddNoteDialog({ open, onClose, onSubmit }) {
  const [newNote, setNewNote] = useState({ title: '', contents: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(newNote);
    setNewNote({ title: '', contents: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a New Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={newNote.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="contents"
          label="Contents"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={newNote.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} >Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Note</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddNoteDialog;
