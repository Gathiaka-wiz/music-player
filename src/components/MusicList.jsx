import { useEffect } from "react";

import Nav from "./Nav";
const MusicList = ( { playlist, handlePlaylistUpdate , handlePlaylistSelect } ) => {
    
    useEffect(() => {
        let ol = document.getElementById('list');
        playlist.map((list,index) => {
            
            let li = document.createElement('li');
    
            li.id = index;
            li.innerHTML = `${list.name}`;
            ol.appendChild(li);
        });
        
    },[playlist])
    const hand = (event) => {
        let index = (event.target.id)
        handlePlaylistSelect(index);
    }

    return(
        <section className="Playlist">
            <ol id="list" onClick={hand} >
            </ol>
            <Nav onPlaylistUpdate={handlePlaylistUpdate} />
        </section>
    );
}

export default MusicList;