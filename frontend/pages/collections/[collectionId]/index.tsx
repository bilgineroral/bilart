import { getArts } from '@/api/art';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ArtCard } from '@/components/artist';


interface CollectionProps {
    collectorId: string;
  }
  
  export default function Collection({ collectorId }: CollectionProps) {
    const router = useRouter();
    const [arts, setArts] = useState<any>([]);
    const { collectionId }: any = router.query;

    useEffect(() => {
        const fetchAllArts = async () => { // called if collectionId is my-arts
            try {
                const resp = await getArts({ collector_id: +collectorId });
                setArts(resp);
            } catch (e: any) {
                console.log(e);
            }
        };
        const fetchCollectionArts = async () => { // called if collectionId is not my-arts
            try {
                const resp = await getArts({ collection: +collectionId, collector_id: +collectorId });
                setArts(resp);
            } catch (e: any) {
                console.log(e);
            }
        }
        if (collectionId == "my-arts") {
            fetchAllArts();
        }
        else {
            fetchCollectionArts();
        }
    }, [collectionId]);

    return (
        (arts.length > 0) ? (
            arts.map((art: any) => (
                <ArtCard
                    key={art.art_id}
                    artId={art.art_id}
                    title={art.title ?? ""}
                    content={art.content ?? ""}
                    description={art.description ?? ""}
                />
            ))
        ) : (
            <div>No arts found</div>
        )
    )
}