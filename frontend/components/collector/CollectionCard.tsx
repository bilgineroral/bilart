import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import Link from "next/link";
import { Collection } from "@/api/api_types";
import { getArts } from "@/api/art";
import { useEffect, useState } from "react";


interface CollectionCardProps {
    collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {

    const [artsCount, setArtsCount] = useState<any>(0);
    useEffect(() => {
        const fetchArts = async () => {
            try {
                const resp = await getArts({ collection: collection.collection_id });
                console.log(resp);
                setArtsCount(resp.count);
            } catch (e) {
                console.log(e);
            }
        }
        fetchArts();
    }, []);

    return (
        <Link href={`/collections/${collection.collection_id}`}>
            <Card sx={{
                width: "100%", minHeight: '100%', display: 'flex',
                flexDirection: 'column', maxHeight: '500px', maxWidth: '400px'
            }}>
                <CardMedia
                    sx={{ width: "100%", aspectRatio: "1/1" }}
                    image={`/app-logo.svg`}
                    title="Collection"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {collection.name}
                    </Typography>
                </CardContent>
                <Box sx={{ marginTop: 'auto' }}>
                    <Divider />
                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link href={`/art/${"artId"}`}>
                            <Button size="small" startIcon={<LinkIcon />}>Open</Button>
                        </Link>
                        <Chip label={artsCount}></Chip>
                    </CardActions>
                </Box>
            </Card>
        </Link>
    )
}