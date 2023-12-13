import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

var cardStyle = {
    background : "#28B5A4",
    display: 'block',
    width: '25vw',
    height: '25vw'
}

var mediaStyle = {
    display: 'block',
    width: '25vw',
    height: '20vw'
}
  
var addButtonStyle = {
    margin: "1vw",
    background : "#937200",
    color: "#D9CB53",
    fontFamily: "Josefin Slab",
    fontWeight: "Bold",
    display: 'block',
    width: '12vw',
    height: '3vw'
}

var viewButtonStyle = {
    margin: "1vw",
    background : "#91E3DE",
    color: "white",
    fontFamily: "Josefin Slab",
    fontWeight: "Bold",
    display: 'block',
    width: '12vw',
    height: '3vw'
}

var shareButtonStyle = {
    margin: "1vw",
    background : "#91E3DE",
    color: "white",
    fontStyle: "italic",
    fontFamily: "Josefin Slab",
    fontWeight: "Italic",
    display: 'block',
    width: '12vw',
    height: '3vw'
}

export function ArtCardOfCollector() {
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
                <Button style={shareButtonStyle}>Share Art</Button>
                <Button style={viewButtonStyle}>View Art</Button>
                <Button style={addButtonStyle}>Add to Collection</Button>
            </CardActions>
        </Card>
    </div>
  );
}
