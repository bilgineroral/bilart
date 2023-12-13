import { useRouter } from "next/router";
import * as React from "react";

import {
  Grid,
  Stack,
  Box,
  Chip,
  useTheme,
  Typography,
  ButtonGroup,
  Button,
  Paper
} from "@mui/material";

import type { Art } from "@/pages/artist";

import { PostActionsBar, DomainDivider, DomainImage } from "@/components/shared";
import { User } from "@/store/user";
import { useSnackbar } from "@/store/snackbar";

export default function ArtPage() {

  const router = useRouter()
  const {query} = router;
  const artId = query.artId;

  const snackbar = useSnackbar();
  const [artInfo, setArtInfo] = React.useState<Art | null>(null);

  React.useEffect(() => {
    const fetchArtInfo = async () => {
      try {
        // @ts-ignore
        const user = JSON.parse(localStorage.getItem('bilart-me')) as User;
        const auth = Buffer.from(`${user.username}:${user.password_hash}`).toString('base64');
        const res = await fetch(`http://localhost:8000/arts/${artId}`);
        const data = await res.json()  
        console.log(data);
        if ("data" in data) {
          setArtInfo(data.data);
        } else {
          snackbar("error", "failed to fetched");
        }
      } catch (err) {
        console.log(err);
        snackbar("error", "failed to fetched");
      }
    }

    fetchArtInfo();
  },[])

  const theme = useTheme();
  const [tags, setTags] = React.useState(["tag", "tag"]);
  const [title, setTitle] = React.useState("Water Art");
  const [price, setPrice] = React.useState(1000);

  const [auctions, setAuctions] = React.useState([
    {
      name: "something",
      starting: "some data",
      ending: "some other date",
      active: false,
      auction: 12,
      id: "12345"
    },
    {
      name: "something",
      starting: "some data",
      ending: "some other date",
      active: false,
      auction: 12,
      id: "12345"
    },
    {
      name: "something",
      starting: "some data",
      ending: "some other date",
      active: true,
      auction: 12,
      id: "12345"
    }


  ]
  )


  return (
    <Stack direction="column" gap={2} sx={{height : "100%"}} >
      <PostActionsBar 
        title="Godly Cat"
      />
      <DomainDivider color="#fff" />
      <Grid container gap={0.5} justifyContent="space-between">
        <Grid item xs={4}>
          <Box 
            sx={{
              width : "100%",
              aspectRatio: "1/1",
              backgroundColor: theme.palette.primary.main
            }}
          >
            <DomainImage 
              alt="art piece image"
              src={`http://localhost:8000/${artInfo?.content}`}
            />  
          </Box>          
        </Grid>
        <Grid item xs={7.5}>
            <Stack direction="column" gap={1} sx={{position : "relative", height: "100%"}}>
              <div style={{display :"flex", justifyContent: "space-between"}}>
                <Typography variant="h4" color="#fff">
                  {artInfo?.title}
                </Typography> 
                <div>
                  {
                    React.Children.toArray(
                      tags.map(tagname => <Chip label={tagname}  sx={{marginLeft: "10px"}} color="primary"/>)
                    )
                  }
                </div>
              </div>
              <DomainDivider color={theme.palette.primary.main} />
              <div style={{display :"flex", justifyContent: "space-between"}}>
                <Typography variant="h4" color="#fff">
                  TL {price}
                </Typography>
                <Typography variant="h6" color="#fff">
                  starting price
                </Typography> 
              </div>
              <Typography color="#fff">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
              <ButtonGroup
                variant="contained"
                sx={{position : "absolute", bottom : 0, right :0}}
              >
                <Button sx={{color : "#fff"}}>Auction</Button>
                <Button sx={{color : "#fff"}}>Delete</Button>
                <Button sx={{color : "#fff"}}>Edit</Button>
              </ButtonGroup>
            </Stack>
        </Grid>
      </Grid>

      <Typography variant="h4" color="#fff">
        Auctions
      </Typography>

      <Grid container gap={1}>
      {
        React.Children.toArray(
          auctions.map((data) => (
            <Grid item xs={2}>
            <Paper sx={{padding : "0.25rem 1rem"}}>
              <Typography>{data.name}</Typography>
              <DomainDivider color="black" />
              <Typography variant="body2" color="grey">Starting: {data.starting}</Typography>
              <Typography variant="body2" color="grey">Ending: {data.ending}</Typography>
              <Typography variant="body2" color="grey">Auction Count: {data.auction}</Typography>
            </Paper>
            </Grid>
          ))
        )
      }
      </Grid>


      <Typography variant="h4" color="#fff">
        Comments
      </Typography>
    </Stack>
  )


}

export async function getStaticPaths() {

  return {
    paths: [],
    fallback : true
  }
}

export async function getStaticProps()  {
  return {
    props : {
      navbar : true
    }
   }
}