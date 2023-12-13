import * as React from "react";

import {
  Grid,
  Box,
  IconButton,
  SvgIcon,
  useTheme,
  Badge,
  Typography,
  Card,
  CardProps
} from "@mui/material";
import {styled} from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';

interface CardView extends CardProps {

}

export function GalleryView( props: CardView ) {

    return(
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {Array.from(Array(250)).map((_, index) => (
                <Grid item xs={1} sm={2} md={3} key={index}>
                <Card {...props}>card</Card>
                </Grid>
            ))}

        </Grid>

    )
};
