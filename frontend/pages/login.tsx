import Link from "next/link";

import * as React from "react";

import {
  Stack, 
  useTheme,
  Button,
  ButtonGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import {styled} from "@mui/system";

import { useSnackbar } from "@/store/snackbar";

import {FilledInputField, DomainImage, DomainDivider, DomainButton} from "@/components/shared";
import { useRouter } from "next/router";

const LoginStack = styled(Stack)(({theme}) => ({
  background : theme.palette.primary.main,
  width : "fit-content",
  position : "absolute",
  top : "50%",
  left : "50%",
  transform : "translate(-50%, -50%)",
  padding : "1.5rem 3rem",
  borderRadius : "5px",
  alignItems : "center",
  boxShadow : "2px 2px 2px 2px black"
})) as typeof Stack;

export default function LoginPage() {

  const router = useRouter();
  const theme = useTheme();
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword]  = React.useState<string>("");
  const [loggingIn, setLoggingIn] = React.useState<boolean>(false);

  const snackbar = useSnackbar();

  React.useEffect(() => {
    setUsername("");
    setPassword("");
    setLoggingIn(false);
  }, [])

  const handleCollectorLogin = async () => {
    router.replace("/");
  } 

  const handleArtistLogin = async () => {
    router.replace("/artist/profile");
  }

  return (
    <>
      {
        loggingIn && 
        <div
          style={{
            position : "absolute",
            inset : "0",
            backgroundColor : "rgba(0,0,0,0.5)",
            zIndex : 999,
            display : "flex",
            justifyContent : "center",
            alignItems : "center"
          }}
        >
          <CircularProgress
            color="primary" 
            size={80}
            thickness={3}
          />
        </div>
      }
      <LoginStack
        gap={2}
      >
        <DomainImage 
          src="/app-logo.svg"
          alt="bilart logo"
        />
        <DomainDivider />
        <FilledInputField
          disabled={loggingIn}
          placeholder="Username"
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          multiline={false}
          size="small"
          background={theme.palette.primary.light}
          hoverbackground={theme.palette.secondary.light}
          focusedbackground={theme.palette.secondary.light}
          labelColor={theme.palette.secondary.main}
        />
        <FilledInputField 
          disabled={loggingIn}
          placeholder="Password"
          label="Password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          multiline={false}
          size="small"
          background={theme.palette.primary.light}
          hoverbackground={theme.palette.secondary.light}
          focusedbackground={theme.palette.secondary.light}
          labelColor={theme.palette.secondary.main}
        />

        <Typography 
          variant="body2"
          sx={{
            textTransform : "none",
            width : "fit-content",
            color : theme.palette.primary.light
          }}
        >
        Choose Account Type:
        </Typography>

        <ButtonGroup
          disabled={loggingIn}
          size="small"
          fullWidth
          variant="contained"
        >
          <DomainButton 
            onClick={handleCollectorLogin}
            domainType="primary"
            text="Login As Collector"
          />
          <DomainButton 
            onClick={handleArtistLogin}
            domainType="secondary"
            text="Login As Artist"
          />
        </ButtonGroup>
        
        <DomainDivider />

        <Typography variant="h6" sx={{color : theme.palette.primary.light}}>
          Do you not have an account yet?
        </Typography>
        <Link href={"/register"}>
          <Button
            disabled={loggingIn}
            size="small"
            variant="outlined"
            color="secondary"
            sx={{
              textTransform : "none",
              width : "fit-content"
            }}
          >
            Create Account 
          </Button>
        </Link>
      </LoginStack>
    </>
  )
}