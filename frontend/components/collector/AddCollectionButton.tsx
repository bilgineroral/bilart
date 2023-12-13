import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

var style = {
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
      <CardContent>
        <CardActions>
            <Button style={style}>Add Collection</Button>
            {/* add icon*/}
        </CardActions>
      </CardContent>
    </Card>
    </div>
  );
}
