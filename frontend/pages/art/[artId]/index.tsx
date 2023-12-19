import { useRouter } from "next/router";
import * as React from "react";
import type {Tag, Art, Auction, Rating} from "@/api/api_types";
import {
  Grid,
  Stack,
  Box,
  Chip,
  useTheme,
  Typography,
  ButtonGroup,
  Button,
  Paper,
} from "@mui/material";

import {
  PostActionsBar,
  DomainDivider,
  DomainImage,
} from "@/components/shared";

import { useSnackbar } from "@/store/snackbar";
import { getArt } from "@/api/art";
import { getAuctions } from "@/api/auction";
import { getTags } from "@/api/tags";
import { getRatings } from "@/api/rating";

import { AxiosError } from "axios";
import { AuthError } from "@/api/crude";


export default function ArtPage() {
  const router = useRouter();
  const { query } = router;
  const artId = query.artId;

  const snackbar = useSnackbar();
  const [artInfo, setArtInfo] = React.useState<Art | null>(null);
  const theme = useTheme();
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [auctions, setAuctions] = React.useState<Auction[]>([]);
  const [comments, setComments] = React.useState<Rating[]>([]);

  React.useEffect(() => {
    const fetchArtInfo = async () : Promise<Art | null> => {
      try {
        const data = await getArt(Number(artId));
        console.log(data);
        setArtInfo(data.data);
        if ("data" in data) {
          setArtInfo(data.data);
          return data.data;
        } else {
          snackbar("error", "failed to fetch art");
          return null;
        }
      } catch (err) {
        if (err instanceof AuthError) {
          snackbar("error", "Session does not exist");
          router.replace("/login")
        }
        if (err instanceof AxiosError && err.response?.status === 401) {
          snackbar("error", "Incorrect username or password");
          router.replace("/login");
        } else {
          snackbar("error", "an error occured. See console for more details");
          console.error(err);
        }
      }
      return null;
    };

    const fetchAuctions = async (art: Art) => {
      try {
        const data = await getAuctions({ art_id: Number(art.art_id) });
        console.log(data);
        if (data.data != null) {
          setAuctions(data.data);
        } else {
          snackbar("error", "failed to fetched");
        }
      } catch (err) {
        console.log(err);
        snackbar("error", "failed to fetched");
      }
    };
    const fetchTags = async (art: Art) => {
      try {
        const data = await getTags({ post_id: art.post_id });
        console.log(data);
        if (data.data != null) {
          setTags(data.data);
        } else {
          snackbar("error", "failed to fetched");
        }
      } catch (err) {
        console.log(err);
        snackbar("error", "failed to fetched");
      }
    };

    const fetchComments = async (art: Art) => {
      try {
        const data = await getRatings({ post_id: art.post_id });
        if ( data.data != null) {
          setComments(data.data);
        } else {
          snackbar("error", "failed to fetched");
        }
      } catch (err) {
        console.log(err);
        snackbar("error", "failed to fetched");
      }
    };

    const fetch = async () => {
      const art = await fetchArtInfo();
      if (art != null) {
        fetchAuctions(art);
        fetchTags(art);
        fetchComments(art);
      }
    };
    if (artId) 
      fetch();
  }, [artId]);

  const formatDate = (dateString: string): string => {
    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  return (
    <Stack direction="column" gap={2} sx={{ height: "100%" }}>
      <Grid container gap={0.5} justifyContent="space-between">
        <Grid item xs={4}>
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center"    
            }}
          >
            <DomainImage 
              src={`http://localhost:8000/${artInfo?.content}`}
              alt={"art image"}
            />
          </Box>
        </Grid>
        <Grid item xs={7.5}>
          <Stack
            direction="column"
            gap={1}
            sx={{ position: "relative", height: "100%" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" color="#fff">
                {artInfo?.title}
              </Typography>
              <div>
                {React.Children.toArray(
                  tags.map((tagname) => (
                    <Chip
                      label={tagname.tag_name}
                      sx={{ marginLeft: "10px" }}
                      color="primary"
                    />
                  ))
                )}
              </div>
            </div>
            <DomainDivider color={theme.palette.primary.main} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" color="#fff">
                TL {artInfo?.price}
              </Typography>
              <Typography variant="h6" color="#fff">
                starting price
              </Typography>
            </div>
            <Typography color="#fff">{artInfo?.description}</Typography>
            <ButtonGroup
              variant="contained"
              sx={{ position: "absolute", bottom: 0, right: 0 }}
            >
              <Button sx={{ color: "#fff" }}>Auction</Button>
              <Button sx={{ color: "#fff" }}>Delete</Button>
              <Button sx={{ color: "#fff" }}>Edit</Button>
            </ButtonGroup>
          </Stack>
        </Grid>
      </Grid>

      <Typography variant="h4" color="#fff">
        Auctions
      </Typography>

      <Grid container gap={1} width={1000}>
        {React.Children.toArray(
          auctions.map((data, index) => (
            <Grid item xs={2}>
              <Paper sx={{ padding: "0.25rem 1rem" }}>
                <Typography>Auction {index + 1}</Typography>
                <DomainDivider color="black" />{" "}
                {data.start_time != null ? (
                  <Typography variant="body2" color="grey">
                    Starting: {formatDate(data.start_time as any)}
                  </Typography>
                ) : null}
                {data.start_time != null ? (
                  <Typography variant="body2" color="grey">
                    Ending: {formatDate(data.end_time as any)}
                  </Typography>
                ) : null}
                {data.active != null ? (
                  <Typography variant="body2" color="grey">
                    Active: {data.active ? "True" : "False"}
                  </Typography>
                ) : null}
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      <Typography variant="h4" color="#fff">
        Comments
      </Typography>
      <Ratings ratings={comments} />
    </Stack>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps() {
  return {
    props: {
      navbar: true,
    },
  };
}

type RatingsProps = {
  ratings: Rating[];
};

const Ratings: React.FC<RatingsProps> = ({ ratings }) => {
  return (
    <div style={{ padding: "20px", borderRadius: "10px" }}>
      {ratings.map((rating) => (
        <div
          key={rating.rating_id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "white",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {rating.profile_image && (
              <img
                src={rating.profile_image}
                alt={`${rating.username}'s profile`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "15px",
                }}
              />
            )}
            <div>
              <div style={{ fontWeight: "bold" }}>{rating.username}</div>
              <div style={{ color: "#999" }}>{rating.comment}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {"★".repeat(rating.score)}
            {"☆".repeat(5 - rating.score)}
          </div>
        </div>
      ))}
    </div>
  );
};
