import * as React from "react";

export default function ArtistProfilePage() {

  return (
    <div
    style={{
      height : "1000px"
    }}>
    <h1>
      Artist Page
    </h1>

    </div>
  )
}


export async function getStaticProps() {
  return {
    props : {
      navbar : true
    }
  }
}
