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
    const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState(playlist[currentIndexRef]);
    
    
    const handlePlaylistUpdate = (newPlaylist) => {
        setPlaylist(newPlaylist);
    }
    
    const handlePlaylistSelect = (newIndex) => {
        currentIndexRef.current = newIndex;
        setCurrentSong(playlist[newIndex])
    }


    return(
        <main className="player">
        <Nav onPlaylistUpdate={handlePlaylistUpdate} />
        <Frame />
        <PlayState audioRef={audioRef} currentSong={currentSong}  />
        <Controls />
        <MusicList playlist={playlist} handlePlaylistUpdate={handlePlaylistUpdate}  handlePlaylistSelect={handlePlaylistSelect} />
        </main>
    );
}

export default Player;