import React, { useState } from 'react';
import { Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddButton({ onClick }) {
  const [rotate, setRotate] = useState(false);

  const handleClick = () => {
    setRotate(true);
    onClick && onClick();
  };

  return (
    <Box
      sx={{
        // position: 'fixed',
        // bottom: { xs: '1rem', sm: '2rem', md: '2rem' },
        left: { xs: '1rem', sm: '3rem', md: '6rem' },
        m: 2,
      }}
    >
      <Fab
        sx={{
          color: "whitesmoke",
          bgcolor: "black",
          '&:hover': { bgcolor: "grey.800" },
          animation: rotate ? 'rotate 0.5s ease-in-out' : 'none',
        }}
        aria-label="add"
        onClick={handleClick}
        onAnimationEnd={() => setRotate(false)}
      >
        <AddIcon />
      </Fab>

      {/* Keyframes for rotation animation */}
      <style>
        {`
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default AddButton;
