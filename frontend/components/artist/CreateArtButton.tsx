import Fab from "@mui/material/Fab";
import Link from "next/link";

const fabStyle = {
    margin: "1vw",
    top: 'auto',
    right: "2vw",
    bottom: "2vw",
    left: 'auto',
    position: 'fixed',
    width: "10vw",
    height: "10vw"
};

export function CreateArtButton(){

    return(
        <Link href="/artist/create">
        <Fab style={fabStyle}/>
        {/* ADD ICON */}
    </Link>
    );
}