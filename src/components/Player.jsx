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

    // useEffect(() => {

        const autoNext = () => {
            // if (audioRef.current == null) return;    
    
            setCurrentSong(prevIndex => {
                const nextIndex = (prevIndex + 1) % playlist.length; // loop back to start
                return nextIndex;
            });
        }

    //     // autoNext()
    //     window.addEventListener('ended',autoNext);

    //     return() => window.removeEventListener('ended',autoNext)
    // },)
    


    return(
        <main className="player">
        <Nav  onPlaylistUpdate={handlePlaylistUpdate} />
        <Frame currentSong={currentSong} />
        <PlayState audioRef={audioRef} currentSong={currentSong} autoNext={autoNext}  />
        <Controls audioRef={audioRef} playlist={playlist} currentIndexRef={currentIndexRef} setCurrentSong={setCurrentSong} />
        <MusicList playlist={playlist} handlePlaylistUpdate={handlePlaylistUpdate}  handlePlaylistSelect={handlePlaylistSelect}  />
        </main>
    );
}

export default Player;