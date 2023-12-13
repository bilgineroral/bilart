import { CollectionCard, AddCollectionButton } from "@/components/collector";
import { GalleryView } from "@/components/shared";

export default function CollectionsPage() {

    return (
      <>
        <GalleryView
          cards={[<CollectionCard />,<CollectionCard />,<CollectionCard />,<CollectionCard />,<AddCollectionButton/>]}
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