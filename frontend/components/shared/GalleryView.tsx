import * as React from "react";

import {
  Grid,
  CardProps
} from "@mui/material";


interface CardView extends CardProps {
    cards : React.ReactNode[]
}

export function GalleryView( props: CardView ) {

    return(
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {props.cards?.map((element, index) => (
                <Grid item xs={1} sm={2} md={4} key={index}>
                    {element}
                </Grid>
            ))}
            
        </Grid>

    )
};
