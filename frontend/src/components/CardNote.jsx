import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
export default function CardNote({ title, contents, onPin, isPinned,onEdit,onDelete,onClick }) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 4, backgroundColor: isPinned ? 'lightblue' : 'white', color: isPinned ? 'white' : 'black' 
    }}    onClick={onClick}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      
      />
      
      <CardContent>
        <Typography variant="body2" sx={{ color: isPinned ? 'white' : 'text.secondary' }}>
          {contents}
        </Typography>
      </CardContent>
      
      <IconButton aria-label="pin" onClick={onPin}>
        <PushPinRoundedIcon sx={{ color: isPinned ? 'white' : 'black' }} />
      </IconButton>
      <IconButton aria-label="edit" onClick={onEdit}>
        <EditRoundedIcon sx={{ color: "black" }} />
      </IconButton>
      <IconButton aria-label="delete" onClick={onDelete}>
      <DeleteRoundedIcon sx={{ color: "black" }} /> 
      </IconButton>

    </Card>
  );
}                 
