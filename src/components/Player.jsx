import { useState,useRef } from "react";
import Nav from "./Nav"
import Frame from "./Frame";
import PlayState from "./PlayState";
import Controls from "./Controls";
import MusicList from "./MusicList";
import '../css/Player.css'

const Player = () => {
    const [playlist,setPlaylist] = useState([]);
    const currentIndexRef = useRef(0);

    
    const handlePlaylistUpdate = (newPlaylist) => {
        setPlaylist(newPlaylist);
    }



    return(
        <>
        <Nav onPlaylistUpdate={handlePlaylistUpdate} />
        <Frame />
        <PlayState />
        <Controls />
        <MusicList playlist={playlist} handlePlaylistUpdate={handlePlaylistUpdate} currentIndexRef={currentIndexRef}  />
        </>
    );
}

export default Player;