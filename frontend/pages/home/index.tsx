import * as React from "react";
import { getArts } from "@/api/art";
import { ArtCard } from "@/components/artist";
import { useSnackbar } from "@/store/snackbar";
import { getTags } from "@/api/tags";
import { Select, MenuItem, FormControl, InputLabel, Chip, Button, Menu, Grid } from '@mui/material';




export default function Home() {

    const snackbar = useSnackbar();
    const [arts, setArts] = React.useState<Art[]>([]);
    const [tags, setTags] = React.useState<any>([]);
    const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
    const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
    const [selectedOptions, setSelectedOptions] = React.useState<any>([]);
    const [sortOption, setSortOption] = React.useState('');

    const handleOption = (event: React.ChangeEvent<{ value: unknown }>) => {

    };

    const handleChange = (event: any) => {
        setSelectedOptions(event.target.value);
    };


    const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    React.useEffect(() => {
        const fetchArts = async () => {
            try {

                const resp = await getArts({});
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
    }, [arts.length]);

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
        <div>
            <Grid container gap={3} style={{ marginBottom: '20px' }}>
                <FormControl>
                    <InputLabel id="demo-multiple-chip-label">Select Options</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={selectedOptions}
                        onChange={handleChange}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((value: any) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                    >
                        <MenuItem value={"Date ascending"} disabled={selectedOptions.includes("Date descending")}>Date ascending</MenuItem>
                        <MenuItem value={"Date descending"} disabled={selectedOptions.includes("Date ascending")}>Date descending</MenuItem>
                        <MenuItem value={"Price ascending"} disabled={selectedOptions.includes("Price descending")}>Price ascending</MenuItem>
                        <MenuItem value={"Price descending"} disabled={selectedOptions.includes("Price ascending")}>Price descending</MenuItem>
                    </Select>
                </FormControl>

                <Button aria-controls="dropdown-menu-2" aria-haspopup="true" onClick={handleClick2}>
                    Dropdown 2
                </Button>
                <Menu
                    id="dropdown-menu-2"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={handleClose2}
                >
                    {tags.map((tag: any) => (
                        <MenuItem key={tag} onClick={handleClose2}>
                            {tag}
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>
            <Grid container direction="row" style={{ marginTop: '20px' }}>
                {
                    React.Children.toArray(
                        ArtCards.map((card) => {
                            return (
                                <Grid item xs={3} style={{ marginRight: '40px' }}>
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
            navbar: true
        }
    }
}