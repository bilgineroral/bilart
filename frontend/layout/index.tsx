import Image from "next/image";
import * as React from "react";

import { useAtom } from "jotai";

import {
  Snackbar,
  Alert,
  AppBar,
  Typography,
  Grid,
  useTheme
} from "@mui/material";

import {
  snackbarAtom,
  snackbarMessage,
  snackbarSeverity
} from "@/store/snackbar";
import Searchbar from "@/components/layout/Searchbar";


interface LayoutProps {
  children : React.ReactNode
}


export default function Layout(props : LayoutProps) {

  const theme = useTheme();

  const [snackbarStatus, setSnackbarStatus] = useAtom(snackbarAtom);
  const [severity, __] = useAtom(snackbarSeverity);
  const [message, ___] = useAtom(snackbarMessage);

  return (
    <div
      style={{
        width : "100%",
        height : "100%",
        backgroundColor : theme.palette.background.default
      }}
    >
      <Snackbar open={snackbarStatus} autoHideDuration={6000} onClose={() => setSnackbarStatus(false)}>
        <Alert onClose={() => setSnackbarStatus(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {/* <AppBar position="static" color="secondary" sx={{height : "fit-content", padding : "0.25rem 0.5rem"}}>
        <Grid container sx={{width : "100%"}}>
          <Grid item xs={1} sx={{height : 40}}>
          <Image
            alt="campus connect logo"
            src="/app-logo.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%' }} // optional
          />
          </Grid>
          <Grid item xs={6}>
          </Grid>
        </Grid>
      </AppBar> */}
      {props.children}
    </div>
  )

}