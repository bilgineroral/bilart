import {useRouter} from "next/router";
import * as React from "react";

import {
  Stack,
  TextField,
  Autocomplete, 
  Box,
  Button,
} from "@mui/material"
import {styled} from "@mui/system"; 
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const FieldsBox = styled(Box)(({theme}) => ({
  backgroundColor : "#fff", 
  width : "100%", 
  height : "100%", 
  overflowY: "scroll",
  display : "flex",
  flexDirection : "column",
  gap: 15,
  padding : "1rem"
})) as typeof Box;

import { ActionButtonProps, DomainDivider, DomainImageUpload, PostActionsBar } from "@/components/shared";

export default function CreateArt() {

  const router = useRouter();
  const {edit} = router.query;

  const [tags, setTags] = React.useState(["tag one", "tag two", "tag three"]);

  const handleImageFinal = (imgSrc : string) => {
    console.log(imgSrc);
  }

  const handleOnSave = React.useCallback(() => {
    console.log("saving");
  }, []);

  const handleOnCancel = React.useCallback(() => {
    router.replace("/artist");
  }, []);

  const handleOnDelete = React.useCallback(() => {
    console.log("Deleting");
  }, []);

  const actionButtons = React.useMemo(() => {
    const buttons : ActionButtonProps[] = [];
    buttons.push(
      {
        text : "Save",
        onClick: handleOnSave,
        icon : <SaveIcon style={{fill : "white"}} />
      }
    );
    buttons.unshift(
      {
        text: "Delete",
        onClick: handleOnDelete,
        icon: <DeleteIcon style={{fill : "white"}} />
      }
    );
    buttons.unshift(
      {
        text: "Cancel",
        onClick: handleOnCancel,
        icon: <CloseIcon  style={{fill : "white"}} />
      }
    )
    return buttons;
  }, [handleOnSave])

  return(
    <Stack direction="column" gap={2} sx={{height : "100%"}} >
      <PostActionsBar 
        title={edit ? "Edit Post" : "Create Post"}
        actions={actionButtons}
      />
      <DomainDivider color="#fff" />
      <FieldsBox>
        <TextField 
          size="small"
          label={"Art Title"}
          placeholder="Enter Art Title"
          fullWidth={true}
          required
        />
        <TextField 
          size="small"
          label={"Art Description"}
          placeholder="Describe your art piece"
          fullWidth={true}
          multiline={true}
          minRows={3}
          required
        />
        <TextField 
          size="small"
          label={"Price"}
          placeholder="Starting price of your art piece in TL"
          fullWidth={true}
          type="number"
          required
        />
        <Autocomplete 
          options={tags}
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Categorize your art piece"
              variant="outlined"
              size="small"
            />
          )}
        />

        <Button
          variant="outlined"
          disabled
          sx={{
            textTransform : "none"
          }}
        >
          Select Image For your art piece
        </Button>
        <DomainImageUpload 
          onImageFinal={handleImageFinal}
          justifyContent="left"
        />
      </FieldsBox>
    </Stack>
  )
}

export async function getStaticProps()  {
  return {
    props : {
      navbar : true,
      accountType : "artist"
    }
   }
}