import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import type {Tag, Art, Auction, Rating, Tutorial} from "@/api/api_types";
import {
  Grid,
  Stack,
  Box,
  useTheme,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";

import {
  DomainDivider,
  DomainImage,
} from "@/components/shared";

import { useSnackbar } from "@/store/snackbar";
import { getRatings } from "@/api/rating";

import { AxiosError } from "axios";
import { AuthError } from "@/api/crude";
import { deleteTutorial, getTutorial } from "@/api/tutorial";


export default function ArtPage() {
  const router = useRouter();
  const { query } = router;
  const tutorialId = query.id;

  const snackbar = useSnackbar();
  const [tutorialInfo, setTutorialInfo] = React.useState<Tutorial | null>(null);
  const theme = useTheme();
  const [comments, setComments] = React.useState<Rating[]>([]);

  React.useEffect(() => {
    const fetchTutorialInfo = async () : Promise<Tutorial | null> => {
      try {
        const data = await getTutorial(Number(tutorialId));
        if ("data" in data) {
          setTutorialInfo(data.data);
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

    const fetchComments = async (tutorial : Tutorial) => {
      try {
        const data = await getRatings({ post_id: tutorial.post_id });
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
      const tutorial = await fetchTutorialInfo();
      if (tutorial !== null) {
        fetchComments(tutorial);
      }
    };
    if (tutorialId) 
      fetch();
  }, [tutorialId]);

  const formatDate = (dateString: string): string => {
    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  const handleTutorialDelete= async() => {
    try {
      await deleteTutorial(tutorialInfo!);
      snackbar("success", "art deleted");
      router.back();
    } catch (err) {
      console.log(err);
    }
  }

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
              src={`http://localhost:8000/${tutorialInfo?.media}`}
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
                {tutorialInfo?.title}
              </Typography>
            </div>
            <DomainDivider color={theme.palette.primary.main} />
            <Box sx={{padding: "1rem", borderRadius: 5, backgroundColor: theme.palette.primary.main, flexGrow: 1, overflowY: "scroll"}}>
              <Typography variant="h5" color="#fff">Description</Typography>
              <Typography variant="h6" color="#fff">{tutorialInfo?.description}</Typography>
            </Box>
            <ButtonGroup
              variant="contained"
              sx={{ alignSelf: "flex-end" }}
            >
              <Button sx={{ color: "#fff" }} onClick={handleTutorialDelete}>Delete</Button>
              <Link href={`/tutorial/create?edit=true&tutorial_id=${tutorialInfo?.tutorial_id}`}><Button sx={{ color: "#fff" }}>Edit</Button></Link>
            </ButtonGroup>
          </Stack>
        </Grid>
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
