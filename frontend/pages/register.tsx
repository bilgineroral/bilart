import Link from "next/link";

import * as React from "react";

import {
  Stack, 
  useTheme,
  Button,
  ButtonGroup,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import {styled} from "@mui/system";

import { useSnackbar } from "@/store/snackbar";

import {
  FilledInputField, 
  DomainImage, 
  DomainDivider, 
  DomainButton,
  DomainImageUpload
} from "@/components/shared";
import { useRouter } from "next/router";

const RegisterStack = styled(Stack)(({theme}) => ({
  background : theme.palette.primary.main,
  width : "fit-content",
  position : "absolute",
  top : "50%",
  left : "50%",
  transform : "translate(-50%, -50%)",
  padding : "1.5rem 3rem",
  borderRadius : "5px",
  alignItems : "center",
  boxShadow : "2px 2px 2px 2px black",
})) as typeof Stack;


export default function RegisterPage() {
  const router = useRouter();
  const theme = useTheme();

  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");

  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword]  = React.useState<string>("");

  const [phonenumber, setPhonenumber] = React.useState<string>("");

  const [registering, setRegistering] = React.useState<boolean>(false);

  const snackbar = useSnackbar();

  const [imageBlob, setImageBlob] =  React.useState<Blob | null>(null);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  const onImageSelect = React.useCallback((filelist : FileList | null) => {
    if (filelist) {
      setImageBlob(filelist[0]);
      setImageSrc(URL.createObjectURL(filelist[0]));
    } else {
      setImageBlob(null);
      setImageSrc(null);
    }
  }, []);


  React.useEffect(() => {
    setUsername("");
    setPassword("");
    setRegistering(false);
  }, [])

  const handleRegister = async () => {
    router.replace("/");
  }

  return (
    <>
      {
        registering && 
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
      <RegisterStack
        gap={2}
      >
        <DomainImage 
          src="/app-logo.svg"
          alt="bilart logo"
        />
        <DomainDivider />
        <Grid container gap={0.5} justifyContent="space-between">
          <Grid item xs={5.75}>
            <FilledInputField
              disabled={registering}
              placeholder="First Name"
              label="First Name"
              fullWidth
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              multiline={false}
              size="small"
              background={theme.palette.primary.light}
              hoverbackground={theme.palette.secondary.light}
              focusedbackground={theme.palette.secondary.light}
              labelColor={theme.palette.secondary.main}
            />
          </Grid>
          <Grid item xs={5.75}>
            <FilledInputField 
              disabled={registering}
              placeholder="Last Name"
              label="Last Name"
              fullWidth
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              multiline={false}
              size="small"
              background={theme.palette.primary.light}
              hoverbackground={theme.palette.secondary.light}
              focusedbackground={theme.palette.secondary.light}
              labelColor={theme.palette.secondary.main}
            />
          </Grid>
        </Grid>
        <FilledInputField
          disabled={registering}
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
          disabled={registering}
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

        <DomainImageUpload 
          imageBlob={imageBlob}
          imageSrc={imageSrc}
          onImageSelect={onImageSelect}
        />

        <div>
          <DomainButton 
            variant="contained"
            onClick={handleRegister}
            domainType="primary"
            text="Register Account"
            disabled={registering}
          />

          <Link href={"/login"}>
            <Button
              disabled={registering}
              variant="text"
              color="secondary"
              sx={{
                textTransform : "none",
                width : "fit-content"
              }}
            >
              or click here to Log In 
            </Button>
          </Link>
        </div>
      </RegisterStack>
    </>
  )

}