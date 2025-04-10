import { useEffect } from "react";
import { returnIcon  } from "../assets/icons/icons";

import Nav from "./Nav";
const MusicList = ( { playlist, handlePlaylistUpdate , handlePlaylistSelect,showPlaylist ,displayPlaylist,setShowPlaylist} ) => {
    
    useEffect(() => {
        let ol = document.getElementById('list');
        playlist.map((list,index) => {
            
            let li = document.createElement('li');
    
            li.id = index;
            li.innerHTML = `${list.name}`;
            ol.appendChild(li);
        });
        handlePlaylistSelect(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[playlist])
    const hand = (event) => {
        let index = (event.target.id)
        handlePlaylistSelect(index);
        setShowPlaylist(false)
    }

    return(
        <section className={`playlist ${showPlaylist ? "slide-in" : "slide-out"}`}>
            <Nav onPlaylistUpdate={handlePlaylistUpdate}  returnIcon={returnIcon} displayPlaylist={displayPlaylist}/>
            <ol id="list" onClick={hand} >
            </ol>
        </section>
    );
}

export default MusicList;