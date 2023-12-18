import { getArts } from "@/api/art";
import { getMe } from "@/api/user";
import { ArtCard, CreateArtButton } from "@/components/artist";
import { GalleryView } from "@/components/shared/GalleryView";
import { useSnackbar } from "@/store/snackbar";
import { userAtom } from "@/store/user";
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";
/* 
export type Art = {
  art_id : number;
  artist_id : number;
  content: string;
  created_at: string;
  description: string;
  post_id: number;
  price: number;
  title: string;
} */


export default function ArtistHomePage() {

  const snackbar = useSnackbar();
  const [arts, setArt] = React.useState<Art[]>([]);

  React.useEffect(() => {
    const fetchArts = async() => {
      try {
        const me = await getMe();
        const data = await getArts({artist_id: me.data?.artist_id});
        console.log(data);
        if (data.success && data.data != null) {
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
          title={art.title ?? ""}
          content={art.content ?? ""}
          description={art.description ?? ""}
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