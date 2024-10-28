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

export default function CardNote({ title, subheader, description, onPin, isPinned,onEdit }) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 4, backgroundColor: isPinned ? 'lightblue' : 'white', color: isPinned ? 'white' : 'black' }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      
      <CardContent>
        <Typography variant="body2" sx={{ color: isPinned ? 'white' : 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      
      <IconButton aria-label="pin" onClick={onPin}>
        <PushPinRoundedIcon sx={{ color: isPinned ? 'white' : 'black' }} />
      </IconButton>
      <IconButton aria-label="edit" onClick={onEdit}>
        <EditRoundedIcon sx={{ color: "black" }} />
      </IconButton>
    </Card>
  );
}
