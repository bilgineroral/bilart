import { ArtCardOfCollector, CollectionsButton } from "@/components/collector";
import * as React from "react";

import {GalleryView} from "@/components/shared";


export default function CollecterPage() {
  return (
    <>
      <CollectionsButton/>
      <GalleryView
        cards={[<ArtCardOfCollector />,<ArtCardOfCollector />,<ArtCardOfCollector />,<ArtCardOfCollector />]}
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
