import { ArtCard, CreateArtButton } from "@/components/artist";
import { GalleryView } from "@/components/shared/GalleryView";
import { useSnackbar } from "@/store/snackbar";
import { userAtom } from "@/store/user";
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

export type Art = {
  art_id : number;
  artist_id : number;
  content: string;
  created_at: string;
  description: string;
  post_id: 5;
  title: string;
}


export default function ArtistHomePage() {

  const snackbar = useSnackbar();
  const [arts, setArt] = React.useState<Art[]>([]);

  React.useEffect(() => {
    const fetchArts = async() => {
      try {
        // @ts-ignore
        const user = JSON.parse(localStorage.getItem('bilart-me'));
        const auth = Buffer.from(`${user?.username}:${user?.password_hash}`).toString("base64");
        const res = await fetch(`http://localhost:8000/arts/?artist_id=${user?.artist_id}`, {
            method : "GET",
            headers: {
              "Authorization": `Basic ${auth}`
            }
        })
        const data = await res.json();
        console.log(data);
        if (data.hasOwnProperty("success") && data.success) {
          setArt(data.data);
        } else {
          snackbar("error", "unknown error occured");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchArts();
  }, []);

  const ArtCards = React.useMemo(() => {
    const artcards = arts.map((art, index) => {
      return (
        <ArtCard 
          key={index}
          artId={art.art_id}
          title={art.title}
          content={art.content}
          description={art.description}
        />
      )
    });
    return artcards;
  }, [arts]);

  return (
    <Grid container gap={3}>
      {
        React.Children.toArray(
          ArtCards.map((card) => {
            return (
              <Grid item xs={3}>
                {card}
              </Grid>
            )
          })
        )
      }
    </Grid>
  )
}

export async function getStaticProps()  {
  return {
    props : {
      navbar : true
    }
  }
}