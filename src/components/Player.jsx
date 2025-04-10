import { useState,useRef } from "react";
import Nav from "./Nav"
import Frame from "./Frame";
import PlayState from "./PlayState";
import Controls from "./Controls";
import MusicList from "./MusicList";
import '../css/Player.css';

const Player = () => {
    const [playlist,setPlaylist] = useState([]);
    const currentIndexRef = useRef(0);
    const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState(playlist[currentIndexRef]);
    const [showPlaylist, setShowPlaylist] = useState(false);


    const displayPlaylist = ()  => {
        setShowPlaylist((prev) => !prev);
    }
    
    
    const handlePlaylistUpdate = (newPlaylist) => {
        setPlaylist(newPlaylist);
        displayPlaylist();
    }
    
    const handlePlaylistSelect = (newIndex) => {
        currentIndexRef.current = newIndex;
        setCurrentSong(playlist[newIndex]);
    }


        const autoNext = () => {
            let length = playlist.length
            currentIndexRef.current == length ? setCurrentSong(playlist[currentIndexRef.current = 0]) : setCurrentSong(playlist[currentIndexRef.current ++ ]);
            // alert("done");
        }




    return(
        <main className="player">
            <Nav  onPlaylistUpdate={handlePlaylistUpdate} displayPlaylist={displayPlaylist}  />
            
            <Frame currentSong={currentSong} />
            
            <div className="all-controls" >
                <PlayState audioRef={audioRef} currentSong={currentSong} autoNext={autoNext}  />
            
                <Controls audioRef={audioRef} playlist={playlist} currentIndexRef={currentIndexRef} setCurrentSong={setCurrentSong} />
            </div>
            
            <MusicList playlist={playlist} handlePlaylistUpdate={handlePlaylistUpdate} showPlaylist={showPlaylist}  handlePlaylistSelect={handlePlaylistSelect} displayPlaylist={displayPlaylist} setShowPlaylist={setShowPlaylist} />
        </main>
    );
}

export default Player;