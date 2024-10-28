import React from 'react'
import AddButton from '@/components/AddButton'
import { Typography } from '@mui/material'
function index() {
  return (
    <div>
        <AddButton onClick={() => console.log('Add button clicked')} />
        <Typography sx={{color:"black", display:"flex",justifyItems:"center",
            alignItems:"center",
            fontSize:"2rem",
            fontWeight:"bold"
          
        }}>Notes</Typography>
    </div>
  )
}

export default index