import React from 'react';
import { Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddButton({ onClick }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        m:2,
        left: "6rem",
       
      }}
    >
      <Fab sx={{color:"whitesmoke",bgcolor:"black"}} aria-label="add" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default AddButton;
