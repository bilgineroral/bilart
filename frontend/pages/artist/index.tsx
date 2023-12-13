import * as React from "react";

export default function ArtistHomePage() {
  return (
    <h1>Artist Home</h1>
  )
}

export async function getStaticProps()  {
  return {
    props : {
      navbar : true
    }
  }
}