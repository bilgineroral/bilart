import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

var cardStyle = {
    display: 'block',
    width: '25vw',
    height: '25vw'
}

var mediaStyle = {
    display: 'block',
    width: '25vw',
    height: '20vw'
}
  
var viewButtonStyle = {
    fontFamily: "Josefin Slab",
    fontWeight: "Bold",
    display: 'block',
    width: '12vw',
    height: '3vw'
}

var deleteButtonStyle = {
    fontFamily: "Josefin Slab",
    fontWeight: "Italic",
    color: "Burgundy",
    display: 'block',
    width: '12vw',
    height: '3vw'
}

export function CollectionCard() {
  return (
    <div style={{margin: '15%'}}>
        <Card style={cardStyle}>
            <CardMedia
                component="img"
                alt="Image"
                style={mediaStyle}
                image='/app-logo.svg'
            />

            <CardActions>
                <Button style={deleteButtonStyle}>Delete Collection</Button>
                <Button style={viewButtonStyle}>View Collection</Button>
            </CardActions>
        </Card>
    </div>
  );
}
