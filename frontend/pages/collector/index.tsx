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
import {AddCollectionButton, CollectionCard} from "@/components/collector"


export default function CollecterPage() {

  return (
    <>
      <GalleryView
        cards={[<CollectionCard />,<CollectionCard />,<CollectionCard />,<CollectionCard />,<AddCollectionButton/>]}
      >
      </GalleryView>
    </>
  )
}

export async function getStaticProps() {
  return {
    props : {
      navbar : true
    }
  }
}
