import Link from "next/link";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { CardContent, Typography, useTheme } from '@mui/material';

import LinkIcon from '@mui/icons-material/Link';

interface ArtCardProps {
  title: string;
  content: string; 
  description: string; 
  artId: number;
}

export function ArtCard({title, content, description, artId} : ArtCardProps) {
  
  const theme = useTheme();

  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        sx={{ width: "100%", aspectRatio: "1/1" }}
        image={`http://localhost:8000/${content}`}
        title="art"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/art/${artId}`}>
          <Button size="small" startIcon={<LinkIcon style={{fill : theme.palette.primary.main}}/>}>Open</Button>       
        </Link>
      </CardActions>
    </Card>
  );
}
