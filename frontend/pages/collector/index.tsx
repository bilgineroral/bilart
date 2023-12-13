import Link from "next/link";

import * as React from "react";

import {
  Stack, 
  useTheme,
  Button,
  ButtonGroup,
  Typography,
  CircularProgress,
} from "@mui/material";

import {GalleryView} from "@/components/shared";


export default function CollecterPage() {

  return (
    <>
      <GalleryView/>
    </>
  )
}

export async function getStaticProps()  {
  return {
    props : {
      navbar : true,
      accountType : "collector"
    }
  }
}