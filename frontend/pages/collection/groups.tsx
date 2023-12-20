import CollectionsLayout from "@/layout/collections";
import * as React from "react";
import {Stack} from "@mui/material";
import { PostActionsBar } from "@/components/shared";

export default function CollectionGroupPage() {
  return (
    <>
      <Stack direction="column" gap={2} sx={{height: "100%"}}>
        <PostActionsBar 
          title={"My Arts Collections"}
          actions={[]}
        />
      </Stack>
    </>
  )
}

CollectionGroupPage.getLayout = (page: React.ReactNode) => {
  return <CollectionsLayout>{page}</CollectionsLayout>
}

export async function getStaticProps() {
  return {
    props : {
      navbar : true
    }
  }
}
