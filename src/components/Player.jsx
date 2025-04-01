import Nav from "./Nav"
import Frame from "./Frame";
import PlayState from "./PlayState";
import Controls from "./Controls";
import MusicList from "./MusicList";
import '../css/Player.css'

const Player = () => {
    return(
        <>
        <Nav />
        <Frame />
        <PlayState />
        <Controls />
        <MusicList />
        </>
    );
}

export default Player;