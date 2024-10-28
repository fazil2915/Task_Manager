import React, { useState } from 'react';
import AddButton from '@/components/AddButton';
import { Typography, Box, Grid, Pagination } from '@mui/material';
import CardNote from '@/components/CardNote';
import EditNoteDialog from '@/scenes/AddTask'

const initialNotesData = [
  {
    title: "Shrimp and Chorizo Paella",
    subheader: "September 14, 2016",
    description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
    isPinned: false,
  }
];
function NotesPage() {
  const [notesData, setNotesData] = useState(initialNotesData); // Assuming initialNotesData is defined
  const [page, setPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  
  const notesPerPage = 9;
  const totalPages = Math.ceil(notesData.length / notesPerPage);

  const handleChangePage = (event, value) => setPage(value);

  const handleEditClick = (note) => {
    setSelectedNote(note);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async (updatedNote) => {
    try {
      const response = await fetch('/api/notes/update', { // Replace with your API endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
      if (!response.ok) throw new Error('Failed to update note');

      const updatedData = notesData.map((note) => 
        note.title === selectedNote.title ? updatedNote : note
      );
      setNotesData(updatedData);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const displayedNotes = notesData.slice((page - 1) * notesPerPage, page * notesPerPage);

  return (
    <Box sx={{ padding: { xs: '1rem', md: '2rem' } }}>
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
              subheader={note.subheader}
              description={note.description}
              onEdit={() => handleEditClick(note)} // Pass the note to be edited
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
    </Box>
  );
}

export default NotesPage;