import Link from "next/link";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { CardContent, Typography, useTheme } from '@mui/material';
import { DomainImage } from "../shared";

import LinkIcon from '@mui/icons-material/Link';

interface TutorialCardProps {
  title: string;
  content: string; 
  description: string; 
  tutorialId: number;
}

export function TutorialCard({title, content, description, tutorialId} : TutorialCardProps) {
  
  const theme = useTheme();

  return (
    <Card sx={{ width: "100%", backgroundColor: theme.palette.primary.light }}>
      <CardMedia
        sx={{ width: "100%", aspectRatio: "1/1", padding: "0.5rem" }}
        title="art"
      >
        <DomainImage 
          src={`http://localhost:8000/${content}`}
          alt="tutorial image"
        />
        
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="white">
          {title}
        </Typography>
        <Typography variant="body2" color="white">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/tutorial/${tutorialId}`}>
          <Button size="small" startIcon={<LinkIcon style={{fill : theme.palette.primary.main}}/>}>Open</Button>       
        </Link>
      </CardActions>
    </Card>
  );
}
