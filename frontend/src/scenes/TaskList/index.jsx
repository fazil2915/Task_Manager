import React, { useState, useEffect } from 'react';
import AddButton from '@/components/AddButton';
import { Typography, Box, Grid, Pagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import CardNote from '@/components/CardNote';
import EditNoteDialog from '@/scenes/AddTask';
import AddNoteDialog from '@/scenes/AddTask';
import { useSelector } from 'react-redux';
import NoteDetailView from '@/scenes/viewNote';

function NotesPage() {
  const [notesData, setNotesData] = useState([]);
  const [page, setPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const user = useSelector((state) => state.user) || {};
  const token = useSelector((state) => state.token);

  const notesPerPage = 9;
  const totalPages = Math.ceil(notesData.length / notesPerPage);

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const fetchAllNotes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/getAllTasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNotesData(data);
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  };

  const handleNoteClick = async (noteId) => {
    setSelectedNoteId(noteId);
    setDetailViewOpen(true);

    // Fetch the individual note data here
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/getTask/${noteId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch note');
      const noteData = await response.json();
      setSelectedNote(noteData); // Set the fetched note to selectedNote
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  const handleChangePage = (event, value) => setPage(value);

  const handleEditClick = (note) => {
    setSelectedNote(note);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (note) => {
    setSelectedNote(note);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/deleteTask/${selectedNote._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete note');
      const updatedData = notesData.filter((note) => note._id !== selectedNote._id);
      setNotesData(updatedData);
      setDeleteDialogOpen(false);
      setSelectedNote(null);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEditSubmit = async (updatedNote) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/updateTask/${selectedNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
      const updatedData = notesData.map((note) =>
        note._id === selectedNote._id ? updatedNote : note
      );
      setNotesData(updatedData);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleAddClick = () => setAddDialogOpen(true);

  const handleAddSubmit = async (newNote) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/createTask/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newNote),
      });
      const createdNote = await response.json();
      setNotesData((prevData) => [...prevData, createdNote]);
      setAddDialogOpen(false);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const displayedNotes = notesData.slice((page - 1) * notesPerPage, page * notesPerPage);

  return (
    <Box sx={{ padding: { xs: '1rem', md: '2rem' } }}>
      <AddButton onClick={handleAddClick} />

      <Typography
        sx={{
          color: "black",
          textAlign: "center",
          fontSize: { xs: "1.5rem", md: "2.5rem" },
          fontWeight: "bold",
          margin: { xs: "1rem 0", md: "1.5rem 0" },
        }}
      >
        Notes
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {displayedNotes.map((note, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardNote
              title={note.title}
              contents={note.contents}
              onEdit={() => handleEditClick(note)}
              onDelete={() => handleDeleteClick(note)}
              onClick={() => handleNoteClick(note._id)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3, position: "fixed", bottom: 10, left: 0, right: 0 }}>
        <Pagination count={totalPages} page={page} onChange={handleChangePage} color="primary" shape="rounded" />
      </Box>

      {selectedNote && (
        <EditNoteDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          note={selectedNote}
          onSubmit={handleEditSubmit}
        />
      )}


      <AddNoteDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSubmit={handleAddSubmit}
      />

      {detailViewOpen && selectedNote && (
        <NoteDetailView
          note={selectedNote}
          onClose={() => setDetailViewOpen(false)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NotesPage;
