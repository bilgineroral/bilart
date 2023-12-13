import Fab from "@mui/material/Fab";
import Link from "next/link";

const fabStyle = {
    fontFamily: "Roboto Slab",
    fontWeight: "Bold",
    color: "#263C34",
    background: "#D9CB53",
    margin: "1vw",
    top: 'auto',
    right: "2vw",
    bottom: "2vw",
    left: 'auto',
    position: 'fixed',
    width: "8vw",
    height: "8vw"
};

export function CollectionsButton(){

    return(
        <Link href="/collector/collections">
        <Fab variant="extended" style={fabStyle}>
            View Collections
        </Fab>
    </Link>
    );
}