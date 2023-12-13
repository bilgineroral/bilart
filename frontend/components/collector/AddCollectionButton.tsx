import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
var style = {
  background : "#28B5A4",
  color: "white",
  fontFamily: "Josefin Slab",
  fontWeight: "Bold",
  display: 'block',
  width: '25vw',
  height: '25vw'
}


export function AddCollectionButton() {
  return (
    <div style={{margin: '15%'}}>
      <Card style={style}>
        <CardActions>
          <Button style={style}>Add Collection</Button>
          {/* add icon*/}
        </CardActions>
      </Card>
    </div>
  );
}
