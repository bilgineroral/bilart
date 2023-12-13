import { CollectionCard, AddCollectionButton } from "@/components/collector";
import { GalleryView } from "@/components/shared";

export default function CollectionPage() {

    return (
      <>
        <GalleryView
          cards={[<CollectionCard />,<CollectionCard />,<CollectionCard />,<CollectionCard />]}
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