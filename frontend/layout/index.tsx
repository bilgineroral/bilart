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
  Avatar,
  Menu,
  useTheme,
  Button,
  MenuItem
} from "@mui/material";
import {styled} from "@mui/system";
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  

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
          <Grid item xs={1} sx={{display : "flex", alignItems : "center"}}>
          <DomainImage 
            alt="bil art"
            src="/app-logo.svg"
          />
          </Grid>
          <Grid item xs={9} />
          <Grid item xs={2}>
            <div style={{display : "flex", justifyContent : "right", width: "100%", gap: 5}}>
              <Link href="/home">
                <IconButton size="small">
                  <HomeIcon 
                    fontSize="large"
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
                    fontSize="large"
                    style={{
                      fill: "#fff"
                    }}
                  />
                </Badge>
              </IconButton>
              <Button
                id="menu-btn" 
                size="small"
                onClick={handleClick}
              >
                <Avatar 
                  src={profileImgSrc}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'menu- btn'
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <Link href="/art">
                  <MenuItem onClick={handleClose}>My Arts</MenuItem>
                </Link>
                <Link href="/collections">
                  <MenuItem onClick={handleClose}>My Collections</MenuItem>
                </Link>
                <Link href="/tutorial">
                  <MenuItem onClick={handleClose}>My Tutorials</MenuItem>
                </Link>
              </Menu>
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