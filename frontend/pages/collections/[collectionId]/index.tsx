import { getArts } from '@/api/art';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ArtCard } from '@/components/artist';
import { useSnackbar } from '@/store/snackbar';
import { getMe } from '@/api/user';
import { getFavoritePosts } from '@/api/favorite';
import { getFavoriteArts } from '@/api/favorite';
import { Typography, Box, Grid, Fab } from '@mui/material';
import { AddToPhotos, SentimentDissatisfied } from '@mui/icons-material';

export default function Collection() {
    const snackbar = useSnackbar();
    const router = useRouter();
    const [me, setMe] = useState<any>({});
    const [favs, setFavs] = useState<any>([]);
    const { collectionId }: any = router.query;

    useEffect(() => {
        const fetchMe = async () => {
            const resp: any = await getMe();
            setMe(resp.data);
        }
        fetchMe();
    }, [])

    useEffect(() => {
        const fetchAllFavs = async () => { // called if collectionId is my-arts
            try {
                //const resp = await getArts({ collector_id: +me.collector_id });
                const resp = await getFavoriteArts();
                console.log("resp: ", resp);
                setFavs(resp.data);
                console.log("favs: ", favs);
            } catch (e: any) {
                console.error(e);
            }
        };
        const fetchCollectionFavs = async () => { // called if collectionId is not my-arts
            try {
                //const resp = await getArts({ collection: +collectionId, collector_id: +me.collector_id });
                const resp = await getFavoriteArts();
                setFavs(resp);
            } catch (e: any) {
                console.error(e);
            }
        }
        if (collectionId == "my-arts") {
            fetchAllFavs();
            console.log("favs: ", favs);

        }
        else if (!isNaN(collectionId)) {
            fetchCollectionFavs();
        }
        else {
            snackbar("error", "Invalid collection id")
            return;
        }
    }, [collectionId]);

    console.log("before return, favs:", favs);

    return (
        (favs.length > 0) ? (
            <Grid container spacing={2}>
                {favs.map((art: any, index: any) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <ArtCard
                            artId={art.art_id}
                            title={art.title ?? ""}
                            content={art.content ?? ""}
                            description={art.description ?? ""}
                        />
                    </Grid>
                ))}
            </Grid>
        ) : (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                minHeight="50vh"
            >
                <img src="/collection_empty.jpg" alt="No arts" style={{maxWidth: '300px', maxHeight: '300px'}}/>
                <Typography variant="h5" color="textSecondary" marginTop={'50px'}>
                    No arts found in this collection
                </Typography>
                <Box mt={3}>
                    <Fab variant="extended">
                        <AddToPhotos sx={{ mr: 1 }} />
                        Add arts to collection
                    </Fab>
                </Box>
            </Box>
        )
    )
}

export async function getStaticProps() {
    return {
        props: {
            navbar: true,
            fallback: true
        }
    }
}

export async function getStaticPaths() {
    // Replace this with your code to fetch artist IDs
    /* const users = await getUsers({}); // Pass an empty object as the argument
    console.log(users.data);
    const paths = users?.data?.map((user) => ({
      params: { id: user.artist_id.toString() },
    })); */

    return { paths: [], fallback: true };
}