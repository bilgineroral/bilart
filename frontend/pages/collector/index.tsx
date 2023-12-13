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

<<<<<<< HEAD:frontend/pages/collector/index.tsx
export async function getStaticProps()  {
  return {
    props : {
      navbar : true,
      accountType : "collector"
    }
  }
}
=======
export async function getStaticProps() {
  return {
    props : {
      navbar : true
    }
  }
}
>>>>>>> 431c37d0623ce99b905032c9a3ffca72d4d7d8b5:frontend/pages/collector/home.tsx
