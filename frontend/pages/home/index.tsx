import * as React from "react";
import { getArts, getAvailableArts } from "@/api/art";
import { ArtCard } from "@/components/artist";
import { useSnackbar } from "@/store/snackbar";
import { getTags } from "@/api/tags";
import {
    ListItemIcon, IconButton, Select, MenuItem, FormControl,
    InputLabel, Chip, Button, Menu, Grid, Tooltip, Typography, Divider,
    Fab, Box
} from '@mui/material';
import { useAtom } from "jotai";
import { accountTypeAtom, useToggleAccountType } from "@/store/accounttype";
import { ArrowUpward, ArrowDownward, Tune, Sell, Collections } from "@mui/icons-material";
import Link from "next/link";
import { Art } from "@/api/api_types";


export default function Home() {

    const snackbar = useSnackbar();
    const [accountType] = useAtom(accountTypeAtom);

    const [arts, setArts] = React.useState<Art[]>([]);
    const [tags, setTags] = React.useState<any>([]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

    const [sort, setSort] = React.useState<any>("");
    const [tag, setTag] = React.useState('');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickTag = (event: any) => {
        setAnchorEl2(event.currentTarget)
    };

    const handleCloseSort = (value: any) => {
        setSort(value);
        setAnchorEl(null);
    };

    const handleCloseTag = (val: any) => {
        console.log(val);

        setTag(val);
        setAnchorEl2(null);
    };


    React.useEffect(() => {
        const fetchArts = async () => {
            try {
                console.log("sort= ", sort);
                console.log("tag= ", tag);

                
                const resp = await getAvailableArts({
                    date_order: sort == "da" ? "asc" :
                        sort == "dd" ? "desc" : null,
                    price_order: sort == "pa" ? "asc" :
                        sort == "pd" ? "desc" : null,
                    tag_name: tag || null
                });
                if (resp.success && resp.data != null) {
                    setArts(resp.data);
                } else {
                    snackbar("error", "Couldn't fetch arts");
                }
            } catch (err) {
                console.log(err);
            }
        };
        const fetchTags = async () => {
            try {
                const resp = await getTags({});
                if (resp.success && resp.data != null) {
                    setTags(resp.data);
                } else {
                    snackbar("error", "Couldn't fetch tags");
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchArts();
        fetchTags();
        console.log(tags);
    }, [arts.length, sort, tag]);

    const ArtCards = React.useMemo(() => {
        const artcards = arts.map((art, index) => {
            return (
                <ArtCard
                    key={index}
                    artId={art.art_id}
                    title={art.title ?? ""}
                    content={art.content ?? ""}
                    description={art.description ?? ""}
                />
            )
        });
        return artcards;
    }, [arts]);

    return (
        <div style={{ alignContent: 'center' }}>
            <Grid container gap={3} style={{ marginBottom: '20px' }}>
                <Tooltip title="Sort art works">
                    <Button variant="contained" endIcon={<Tune />} onClick={handleClick} style={{ minWidth: 150 }}>
                        Sort
                    </Button>

                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="options-menu"
                    open={anchorEl ? true : false}
                    onClose={() => setAnchorEl(null)}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => handleCloseSort('da')}>
                        <ListItemIcon>
                            <ArrowUpward fontSize="small" />
                        </ListItemIcon>
                        Date ascending
                    </MenuItem>
                    <MenuItem onClick={() => handleCloseSort("dd")}>
                        <ListItemIcon>
                            <ArrowDownward fontSize="small" />
                        </ListItemIcon>
                        Date descending
                    </MenuItem>
                    <MenuItem onClick={() => handleCloseSort("pa")}>
                        <ListItemIcon>
                            <ArrowUpward fontSize="small" />
                        </ListItemIcon>
                        Price ascending
                    </MenuItem>
                    <MenuItem onClick={() => handleCloseSort("pd")}>
                        <ListItemIcon>
                            <ArrowDownward fontSize="small" />
                        </ListItemIcon>
                        Price descending
                    </MenuItem>
                </Menu>
                <Tooltip title="Filter by tags">
                    <Button variant="contained" endIcon={<Sell />} onClick={handleClickTag} style={{ minWidth: 150 }}>
                        Tags
                    </Button>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl2}
                    id="tags-menu"
                    open={Boolean(anchorEl2)}
                    onClose={() => setAnchorEl2(null)}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => handleCloseTag(null)}>
                        <em>None</em>
                    </MenuItem>
                    {
                        tags.map((tag: any, index: any) => (
                            <MenuItem key={index} value={tag.tag_name} onClick={() => handleCloseTag(tag.tag_name)}>
                                {tag.tag_name}
                            </MenuItem>
                        ))
                    }
                </Menu>
            </Grid>
            <Grid container direction="row" style={{ marginTop: '20px' }}>
                {
                    React.Children.toArray(
                        ArtCards.map((card) => {
                            return (
                                <Grid item xs={3} style={{ marginRight: '40px', marginBottom: '40px' }}>
                                    {card}
                                </Grid>
                            )
                        })
                    )
                }
            </Grid>
        </div>
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