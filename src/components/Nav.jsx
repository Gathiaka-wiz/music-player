// import { addIcon } from "../assets/icons/icons";
const Nav = ({ onPlaylistUpdate  }) => {
    const collectSongs = (event) => {
        const selectedSongs = Array.from(event.target.files);
        onPlaylistUpdate(selectedSongs);
    }


    return(
        <nav className="nav-elements" >
            <input 
                type="file"
                webkitdirectory="true"
                onChange={collectSongs}
                multiple
                autoFocus
            />
        </nav>
    )
}
export default Nav;