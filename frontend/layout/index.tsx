import Link from "next/link";
import * as React from "react";

import { useAtom } from "jotai";

import {
  Snackbar,
  Alert,
  AppBar,
  Grid,
  IconButton,
  Badge,
  Button,
  Avatar,
  useTheme
} from "@mui/material";
import {styled} from "@mui/system";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getMe } from "@/api/user";
import { AxiosError } from "axios";



import {
  snackbarAtom,
  snackbarMessage,
  snackbarSeverity,
  useSnackbar
} from "@/store/snackbar";

import { DomainImage } from "@/components/shared";
import { useNoticationCount } from "@/store/notificationcount";
import { accountTypeAtom, useToggleAccountType } from "@/store/accounttype";

import type { AccountType } from "@/store/accounttype";
import { userAtom } from "@/store/user";
import { BACKEND_URL } from "@/routes";
import { useRouter } from "next/router";
import { AuthError } from "@/api/crude";

export interface LayoutProps {
  show: boolean | undefined;
  children : React.ReactNode
}

const PageContainer = styled("div")(({theme}) => ({
  backgroundColor : theme.palette.background.default,
  flexGrow : 1,
  position : "relative",
  overflowY: "scroll",
  padding: "2rem"
}))

export default function Layout(props : LayoutProps) {
  const router = useRouter();
  const theme = useTheme();

  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const [severity, __] = useAtom(snackbarSeverity);
  const [message, ___] = useAtom(snackbarMessage);

  const snackbar = useSnackbar();
  const [notificationCount] = useNoticationCount(2500);
  const [accountType] = useAtom(accountTypeAtom);
  const toggleAccountType = useToggleAccountType();

  const [profileImgSrc, setProfileImgSrc] = React.useState<string>("");
  const [user] = useAtom(userAtom);
  React.useEffect(() => {
      const fetchMe = async () => {
        try {
          const me = await getMe();
          console.info("Current User");
          console.info(me.data);
          setProfileImgSrc(`${BACKEND_URL}/${me.data?.profile_image}`);
        } catch (err) {
          if (err instanceof AuthError) {
            snackbar("error", "Session does not exist");
            router.replace("/login")
            return;
          }
          if (err instanceof AxiosError && err.response?.status === 401) {
            snackbar("error", "Incorrect username or password");
            router.replace("/login");
          } else {
            snackbar("error", "an error occured. See console for more details");
            console.error(err);
          }  
        }
      }

      fetchMe();
  }, [user]);


  return (
    <>
      <Snackbar open={snackbarStatus} autoHideDuration={6000} onClose={() => setSnackbarStatus(false)}>
        <Alert onClose={() => setSnackbarStatus(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {
        props.show &&
      <AppBar position="static" color="primary" sx={{height : "fit-content", padding : "0.25rem 0.5rem"}}>
        <Grid container sx={{width : "100%"}} spacing={1}>
          <Grid item xs={1} sx={{height : 35, display : "flex", alignItems : "center"}}>
          <DomainImage 
            alt="bil art"
            src="/app-logo.svg"
          />
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={1}>
            <div style={{display : "flex", justifyContent : "right", width: "100%"}}>
              <Link href={accountType === "artist" ?  "/artist/create" : "/collector/create"}>
                <IconButton>
                  <AddCircleOutlineIcon 
                    style={{
                      fill: "#fff"
                    }}
                  />
                </IconButton>
              </Link>
              
              <IconButton
                size="small"  
              >
                <Badge badgeContent={notificationCount} color="secondary">
                  <NotificationsIcon  
                    style={{
                      fill: "#fff"
                    }}
                  />
                </Badge>
              </IconButton>
              <Avatar 
                src={profileImgSrc}
              />
            </div>
          </Grid>
          <Grid item xs={2}>
            <div style={{display : "flex", alignItems : "center"}}>
              <Link href={accountType === "artist" ? "/collector" : "/artist"} style={{width : "100%"}}>
                <Button 
                  color="secondary" 
                  variant="contained" 
                  onClick={toggleAccountType}
                  fullWidth={true}
                >
                  Switch To {accountType === "artist" ? "collector" : "artist"}
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </AppBar> 
    } 
    <PageContainer>
      {props.children}
    </PageContainer>
    </>
  )

}