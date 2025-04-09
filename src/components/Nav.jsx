import { addIconBg,moreIcon } from "../assets/icons/icons";
const Nav = ({ onPlaylistUpdate  }) => {
    const collectSongs = (event) => {
        const selectedSongs = Array.from(event.target.files);
        onPlaylistUpdate(selectedSongs);
    }

    const simulateAdd = () => {
        const input = document.querySelector('input[type="file"]');

        input.click();
    }



    return(
        <nav className="nav-elements" >
            <img src={moreIcon} alt="" />
            <div className="input" >
            <input 
                type="file"
                webkitdirectory="true"
                onChange={collectSongs}
                multiple
                autoFocus
            />
            <img src={addIconBg} alt="add-icon" onClick={simulateAdd} />
            </div>
        </nav>
    )
}
export default Nav;