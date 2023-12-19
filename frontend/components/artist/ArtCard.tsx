import Link from "next/link";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { Stack, Divider, CardContent, Typography, Box } from '@mui/material';
import { ThumbUpAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import LinkIcon from '@mui/icons-material/Link';

interface ArtCardProps {
  title: string;
  content: string;
  description: string;
  artId: number;
}

export function ArtCard({ title, content, description, artId }: ArtCardProps) {

  const [liked, setLiked] = React.useState<boolean>(false);

  return (
    <Card sx={{ width: "100%", minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        sx={{ width: "100%", aspectRatio: "1/1" }}
        image={`http://localhost:8000/${content}`}
        title="art"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" overflow={'auto'} maxHeight={'100px'}>
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ marginTop: 'auto' }}>
        <Divider />
        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href={`/art/${artId}`}>
            <Button size="small" startIcon={<LinkIcon />}>Open</Button>
          </Link>
          <IconButton onClick={() => setLiked((p) => !p)}>
            {liked ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
          </IconButton>

        </CardActions>
      </Box>
    </Card>
  );
}
