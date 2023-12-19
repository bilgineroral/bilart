import {useRouter} from "next/router";
import * as React from "react";
import { AxiosError } from "axios";
import { AuthError } from "@/api/crude";

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
import { NewArtData, createNewArt } from "@/api/art";
import { useSnackbar } from "@/store/snackbar";
import { TagPostModel, addTagToPost, getTags } from "@/api/tags";

export default function CreateArt() {

  const router = useRouter();
  const {edit} = router.query;
  const snackbar = useSnackbar();

  const [tags, setTags] = React.useState<string[]>([]);
  React.useEffect(() => {
      getTags({})
      .then(res => {
        setTags(Object.entries(res.data!).map(([key, value]) => value.tag_name));
      });
  }, []);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [assignedTags, setAssignedTags] = React.useState<string[]>([]);


  const [imgBlob, setImgBlob] = React.useState<Blob | null>(null);  
  const handleImageFinal = (imgSrc : string, imgBlob : Blob) => {
    console.log(imgBlob);
    setImgBlob(imgBlob);
  }

  const handleOnSave = async () => {
    console.log("sending");
    if (imgBlob) {
      try {
        const newArt : NewArtData = {
          title: title,
          description: description,
          price: price,
          image: imgBlob,
        };
        const res = await createNewArt(newArt);
        console.log(res);
        assignedTags.forEach(tagName => {
          const categorize : TagPostModel = {
            tag_name: tagName as string,
            post_id: res.data!.post_id
          }
          console.log(categorize);
          addTagToPost(categorize);
        })
        router.replace("/artist");
      }catch (err) {
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
  };

  const handleOnCancel = React.useCallback(() => {
    router.replace("/artist");
  }, []);

  const handleOnDelete = React.useCallback(() => {
    console.log("Deleting");
  }, []);

  const handleOnChangeTags = (_ : any , newValues : string[]) => {
    setAssignedTags(newValues);
  };

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField 
          size="small"
          label={"Art Description"}
          placeholder="Describe your art piece"
          fullWidth={true}
          multiline={true}
          minRows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}

        />
        <TextField 
          size="small"
          label={"Price"}
          placeholder="Starting price of your art piece in TL"
          fullWidth={true}
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(+(e.target.value))}

        />
        <Autocomplete 
          options={tags}
          multiple
          value={assignedTags!}
          onChange={handleOnChangeTags}  
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
      navbar : true
    }
   }
}