import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

function EditNoteDialog({ open, onClose, note, onSubmit }) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContents(note.contents);
    }
  }, [note]);

  const handleSubmit = () => {
    const updatedNote = { ...note, title, contents };
    onSubmit(updatedNote);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Contents"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditNoteDialog;
