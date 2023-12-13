import { ArtCard, CreateArtButton } from "@/components/artist";
import { GalleryView } from "@/components/shared/GalleryView";
import * as React from "react";


export default function ArtistHomePage() {
  return (
    <>
      <CreateArtButton/>
      <GalleryView
        cards={[<ArtCard />,<ArtCard />,<ArtCard />,<ArtCard />]}
      >
      </GalleryView>
    </>
  )
}

export async function getStaticProps()  {
  return {
    props : {
      navbar : true
    }
  }
}