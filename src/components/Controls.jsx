import { useEffect,  useRef } from "react";
// import { playIcon,nextIcon,prevIcon } from "../assets/icons/icons";

const Controls = ({ audioRef, playlist, currentIndexRef, setCurrentSong }) => {

    const volumeRef =  useRef(audioRef.current == null ? 1 : 0 );
    audioRef.current !== null ? audioRef.current.volume = volumeRef.current.value : 0;
    // volumeRef.current !== null ? volumeRef.current.value = 1 : 0;


    const changePlayState = () => {
        if (audioRef.current == null) return ;
        if (audioRef.current.paused){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
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
    useEffect(() => {
        const keys = (event) => {
            switch (event.key) {
                case ' ':
                    changePlayState()
                    break;
                case 'ArrowRight':
                    changeCurrentSong('next');
                    break;
                case 'n':
                    changeCurrentSong('next');
                    break;
                case 'ArrowLeft':
                    changeCurrentSong('prev');
                    break;
                case 'p':
                    changeCurrentSong('prev');
                    break;
                case 'ArrowUp':
                    audioRef.current.volume = Math.min(audioRef.current.volume +0.01, 1);
                    volumeRef.current.value = Math.min(audioRef.current.volume +0.01, 1);
                    break;
                case 'ArrowDown':
                    audioRef.current.volume = Math.max(audioRef.current.volume - 0.01 ,0);
                    volumeRef.current.value = Math.max(audioRef.current.volume - 0.01 ,0);
                    break;
                case 'm':
                    audioRef.current.volume == 0 ? audioRef.current.volume = 0.05 : audioRef.current.volume = 0;
                    volumeRef.current.value == 0 ? volumeRef.current.value = 0.05 : volumeRef.current.value = 0;
                    break;
            }
        }
        window.addEventListener('keydown', keys);

        return() => window.removeEventListener('keydown', keys);
    },);

    const changeVolume = (event) => {
        let audio = audioRef.current;
        if (audioRef == null) return;

        let newVol = (event.target.value);
        audio.volume = newVol;
        console.log(newVol)
    }
    return(
        <section className="controls">
            <button onClick={() => changeCurrentSong('prev')} > Prev</button>
            <button onClick={changePlayState} > Pause </button>
            <button onClick={() => changeCurrentSong('next')} > Next </button>
            <input 
                type="range"    
                name="volume"  
                min="0"
                max="1"
                step="0.01"
                ref={volumeRef}
                value="1"
                onChange={changeVolume}
            />
        </section>
    );
}

export default Controls;