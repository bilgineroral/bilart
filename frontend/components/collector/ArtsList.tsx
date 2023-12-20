import { getFavoriteArts } from "@/api/favorite";
import { getArts } from "@/api/art";
import { getMe } from "@/api/user";
import { useEffect, useState } from "react";


type CollectionProps = {
    collectionId: number;
};

export default function Collection({ collectionId }: CollectionProps) {

    const [artIds, setArtIds] = useState<any>([]);    
    
    useEffect(() => {
        const fetchArts = async () => {
            try {
                const resp = await getFavoriteArts();
                console.log(resp);
                
            } catch (e) {
                console.log(e);
            }
        }
        fetchArts();
    }, [])

}