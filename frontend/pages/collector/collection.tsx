import { ArtCardOfCollector } from "@/components/collector";
import { GalleryView } from "@/components/shared";

export default function CollectionPage() {

    return (
    <>
        <GalleryView
        cards={[<ArtCardOfCollector />,<ArtCardOfCollector />,<ArtCardOfCollector />,<ArtCardOfCollector />]}
        >
        </GalleryView>
    </>
    );
}

export async function getStaticProps()  {
    return {
        props : {
        navbar : true
        }
    }
    }