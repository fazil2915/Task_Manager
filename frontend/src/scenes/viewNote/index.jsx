import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

function NoteDetailView({ note, onClose }) {
 
  

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {note.title}
      </Typography>
      <Typography variant="body1">{note.contents}</Typography>
      <Button variant="outlined" onClick={onClose} sx={{ marginTop: 2 }}>
        Close
      </Button>
    </Box>
  );
}

export default NoteDetailView;
