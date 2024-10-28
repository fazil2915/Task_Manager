import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function EditNoteDialog({ open, onClose, note, onSubmit }) {
  const [title, setTitle] = useState(note?.title || '');
  const [subheader, setSubheader] = useState(note?.subheader || '');
  const [description, setDescription] = useState(note?.description || '');

  const handleSubmit = () => {
    // Submit form data to parent component
    onSubmit({ title, subheader, description });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Subheader"
          value={subheader}
          onChange={(e) => setSubheader(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditNoteDialog;
