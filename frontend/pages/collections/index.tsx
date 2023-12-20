import { Fab, Box, Typography, CardMedia, Card, CardContent, Divider, CardActions, Button, IconButton, Grid, Chip } from "@mui/material"
import { accountTypeAtom, useToggleAccountType } from "@/store/accounttype";
import { AddToPhotos, ThumbUpAlt, ThumbUpOffAlt } from "@mui/icons-material";
import LinkIcon from '@mui/icons-material/Link';
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { getCollections } from "@/api/collection";
import { getArts } from "@/api/art";
import { getMe } from "@/api/user";
import { useSnackbar } from "@/store/snackbar";

export default function CollectionsPage() {

    const snackbar = useSnackbar();
    /* const infoString = localStorage.getItem("bilart-me");
    const user = infoString ? JSON.parse(infoString) : null; */
    const [accountType] = useAtom(accountTypeAtom);
    const toggleAccountType = useToggleAccountType();
    const [me, setMe] = useState<any>({});
    const [artsCount, setArtsCount] = useState<any>(0);

    const [collections, setCollections] = useState<any>([]);

    useEffect(() => {
        if (accountType == "artist") {
            toggleAccountType();
        }
        else if (accountType != "collector") {
            snackbar("error", "Internal server error");
        }
        const fetchMe = async () => {
            const data: any = await getMe();
            setMe(data);
        };
        const fetchAllArts = async () => {
            try {
                const resp = await getArts({ collector_id: me.collector_id });
                setArtsCount(resp.count);
            } catch (e: any) {
                snackbar("error", e.message);
            }
        };
        fetchMe();
        fetchAllArts();
    }, []);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                console.log(me.collector_id);
                const resp = await getCollections({ collector_id: me.collector_id });
                console.log(resp);
                setCollections(resp.data);
            } catch (e) {
                console.log(e);
            }
        }

    }, [collections.length]);

    return (
        <div>
            <Typography variant="h2" marginBottom={'20px'}>Collections</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Link href={'/collections/my-arts'}>
                        <Card sx={{
                            width: "100%", minHeight: '100%', display: 'flex',
                            flexDirection: 'column', maxHeight: '500px', maxWidth: '400px'
                        }}>
                            <CardMedia
                                sx={{ width: "100%", aspectRatio: "1/1" }}
                                style={{

                                }}
                                image={`/app-logo.svg`}
                                title="My arts"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {"My arts"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" overflow={'auto'} maxHeight={'100px'}>
                                    {"All the arts owned."}
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
                </Grid>
                <Grid item xs={12} sm={6} md={4}> {

                    collections.map((collection: any) => {
                        <Card sx={{
                            width: "100%", minHeight: '100%', display: 'flex',
                            flexDirection: 'column', maxHeight: '500px', maxWidth: '400px'
                        }}>
                            <CardMedia
                                sx={{ width: "100%", aspectRatio: "1/1" }}
                                style={{

                                }}
                                image={`/app-logo.svg`}
                                title="art"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {"title"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" overflow={'auto'} maxHeight={'100px'}>
                                    {"description"}
                                </Typography>
                            </CardContent>
                            <Box sx={{ marginTop: 'auto' }}>
                                <Divider />
                                <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Link href={`/art/${"artId"}`}>
                                        <Button size="small" startIcon={<LinkIcon />}>Open</Button>
                                    </Link>
                                </CardActions>
                            </Box>
                        </Card>
                    })
                }
                </Grid>
            </Grid>

            {
                <Box position="fixed" right={50} bottom={50} m={2}>
                    <Link href={"/collections"}>
                        <Fab variant="extended">
                            <AddToPhotos sx={{ mr: 1 }} />
                            Create new collection
                        </Fab>
                    </Link>
                </Box>
            }
        </div>
    )
}

export async function getStaticProps() {
    return {
      props : {
        navbar : true,
        fallback : true
      }
    }
  }
  
