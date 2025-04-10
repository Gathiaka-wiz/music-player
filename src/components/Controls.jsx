import { useEffect,  useRef, useState } from "react";
import { playIcon,pauseIcon,nextIcon,prevIcon } from "../assets/icons/icons";

const Controls = ({ audioRef, playlist, currentIndexRef, setCurrentSong,displayPlaylist }) => {

    const volumeRef =  useRef( null );
    // audioRef.current !== null ? audioRef.current.volume = volumeRef.current.value : 0;
    volumeRef.current !== null ? volumeRef.current.value = 1 : 0;
    const [isPlaying , setIsPlaying] = useState(false)


    const changePlayState = () => {
        if (audioRef.current == null) return ;
        if (audioRef.current.paused){
            audioRef.current.play();
            setIsPlaying(true)
        }else{
            audioRef.current.pause();
            setIsPlaying(false)
        }
    }
    const changeCurrentSong = (state) => {
        if (audioRef.current == null) return;
        let length = playlist.length
        if (state === 'next') {
            if(currentIndexRef.current == length) {
                setCurrentSong(playlist[currentIndexRef.current = 0 ]);
            }else {
                setCurrentSong(playlist[currentIndexRef.current ++ ]);
            }
        }else if (state === 'prev') {
            if(currentIndexRef.current == 0) {
                setCurrentSong(playlist[currentIndexRef.current = length-1 ]);
            }else {
                setCurrentSong(playlist[currentIndexRef.current -- ]);
            }
        }
    }
    
    // const changeVolume = (event) => {
    //     let audio = audioRef.current;
    //     if (audioRef == null) return;

    //     let newVol = (event.target.value);
    //     audio.volume = newVol;
    //     console.log(newVol)
    // }
    const skipSteps = (move) => {
        if (audioRef.current === null) return ;
        let current = audioRef.current.currentTime;
        let audio = audioRef.current

        if(move === 'backward' ) {
            let seekTime = current  - 10.0;
            audio.currentTime = seekTime;
        }else if (move === 'forward') {
            let seekTime = current  + 10.0;
            audio.currentTime = seekTime;
        }
    }
    useEffect(() => {
        const keys = (event) => {
            switch (event.key) {
                case ' ':
                    changePlayState()
                    break;
                case 'ArrowRight':
                    // audioRef.current.currentTime = (audioRef.current.currentTime + 10.0);
                    skipSteps('forward')
                    break;
                case 'n':
                    changeCurrentSong('next');
                    break;
                case 'ArrowLeft':
                    // audioRef.current.currentTime = (audioRef.current.currentTime - 10.0);
                    skipSteps('backward')
                    break;
                case 'p':
                    changeCurrentSong('prev');
                    break;
                case 'ArrowUp':
                    audioRef.current.volume = Math.min(audioRef.current.volume +0.1, 1);
                    // volumeRef.current.value = Math.min(audioRef.current.volume +0.01, 1);
                    break;
                case 'ArrowDown':
                    audioRef.current.volume = Math.max(audioRef.current.volume - 0.1 ,0);
                    // volumeRef.current.value = Math.max(audioRef.current.volume - 0.01 ,0);
                    break;
                case 'm':
                    audioRef.current.volume == 0 ? audioRef.current.volume = 0.5 : audioRef.current.volume = 0;
                    // volumeRef.current.value == 0 ? volumeRef.current.value = 0.05 : volumeRef.current.value = 0;
                    break;
                case 'l':
                    displayPlaylist()
                    break;
            }
        }
        window.addEventListener('keydown', keys);

        return() => window.removeEventListener('keydown', keys);
    },);



    return(
        <section className="controls">
            <aside className="left-controls">
                {/* <button onClick={() => skipSteps('backward')} >backward</button> */}
                    <img 
                        src={prevIcon} 
                        alt="Pervious" 
                        onClick={() => changeCurrentSong('prev')}  
                    />
            </aside>
                <img 
                    src={isPlaying  ? pauseIcon :playIcon } 
                    alt="Play/Pause" 
                    onClick={changePlayState} 
                    className="play-pause play-pause-btn"        
                />
            <aside className="right-controls">
                {/* <button onClick={() => skipSteps('forward')} >forward</button> */}
                    <img 
                        src={nextIcon} 
                        alt="Next" 
                        onClick={() => changeCurrentSong('next')} 
                    />
            </aside>
            {/* <input 
                type="range"    
                name="volume"  
                min="0"
                max="1"
                step="0.01"
                ref={volumeRef}
                onChange={changeVolume}
            /> */}
        </section>
    );
}

export default Controls;