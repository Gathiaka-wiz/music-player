import { useState,useRef } from "react";
import Nav from "./Nav"
import Frame from "./Frame";
import PlayState from "./PlayState";
import Controls from "./Controls";
import MusicList from "./MusicList";
import '../css/Player.css'
// import { logo,returnIcon,moreIcon } from "../assets/icons/icons";

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
        <Nav  onPlaylistUpdate={handlePlaylistUpdate} />
        <Frame />
        <PlayState audioRef={audioRef} currentSong={currentSong}  />
        <Controls audioRef={audioRef} playlist={playlist} currentIndexRef={currentIndexRef} setCurrentSong={setCurrentSong} />
        <MusicList playlist={playlist} handlePlaylistUpdate={handlePlaylistUpdate}  handlePlaylistSelect={handlePlaylistSelect}  />
        </main>
    );
}

export default Player;