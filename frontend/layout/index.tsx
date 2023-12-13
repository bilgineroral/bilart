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
  useTheme
} from "@mui/material";
import {styled} from "@mui/system";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

import {
  snackbarAtom,
  snackbarMessage,
  snackbarSeverity
} from "@/store/snackbar";

import { DomainImage } from "@/components/shared";
import { useNoticationCount } from "@/store/notificationcount";
import { accountTypeAtom, useToggleAccountType } from "@/store/accounttype";

interface LayoutProps {
  show: boolean | undefined;
  children : React.ReactNode
}

const PageContainer = styled("div")(({theme}) => ({
  backgroundColor : theme.palette.background.default,
  flexGrow : 1,
  position : "relative",
  overflowY: "scroll",
}))

export default function Layout(props : LayoutProps) {

  const theme = useTheme();

  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const [severity, __] = useAtom(snackbarSeverity);
  const [message, ___] = useAtom(snackbarMessage);


  const [notificationCount] = useNoticationCount(2500);
  const [accountType] = useAtom(accountTypeAtom);
  const toggleAccountType = useToggleAccountType();

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
        <Grid container sx={{width : "100%"}}>
          <Grid item xs={1} sx={{height : 35}}>
          <DomainImage 
            alt="bil art"
            src="/app-logo.svg"
          />
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={1}>
            <div style={{display : "flex", justifyContent : "right", width: "100%"}}>
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
              <IconButton
                size="small"  
              >
                <PersonIcon 
                  style={{
                    fill: "#fff"
                  }}
                />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div style={{display : "flex", alignItems : "center"}}>
              <Button 
                color="secondary" 
                variant="contained" 
                size="small"
                onClick={toggleAccountType}
                fullWidth={true}
              >
                Switch To {accountType}
              </Button>
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