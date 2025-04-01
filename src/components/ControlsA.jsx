import { useRef,useState, useEffect } from "react";

const Controls = () => {
    let music = [
        "/public/music/Nick_Cave___The_Bad_Seeds_-_Red_Right_Hand__Official_Video_(720p)_24022025.mp3",
        "/public/music/Nirvana_-_Something_In_The_Way__Audio_(720p)_16022025.mp3",
        "/public/music/Shaboozey_-_Good_News(720p).mp3",
        "/public/music/Shaboozey_-_Highway__Official_Video_(720p).mp3",
        "/public/music/Shaboozey_-_Last_Of_My_Kind__prod._double5dacy_(720p)_08122024.mp3"
    ]

    const  currentRef = useRef(3);
    const audioRef = useRef(null);
    const [trackName , setTrackName] = useState(music[currentRef.current]);
    useState(music[currentRef.current]);
    // const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime , setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const handleTrackChange = (state) => {
        if(state === 'prev'){
            currentRef.current === 0 ? currentRef.current = music.length - 1 : currentRef.current --;
        }else{
            currentRef.current === music.length -1 ? currentRef.current = 0  : currentRef.current  ++ ;
        }

        setTrackName(music[currentRef.current]);

        if(audioRef.current) {
            audioRef.current.src = music[currentRef.current];
            audioRef.current.load();
        }

    };
    const handleNewPLay = () => {
        if(audioRef.current){
            audioRef.current.play();
        }
    };
    const handlePlayState = () => {
        audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
    };
    // convert seconds to mm:ss format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    // Seek to a specific point in the track
    const handleSeek = (event) => {
        const bar = event.target;
        const clickX = event.nativeEvent.offsetX;
        const barWidth = bar.clientWidth;
        const seekTime = (clickX / barWidth) * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    }   
    const roundToDecimal = (num, decimalPlaces) => {
        let factor = Math.pow(10,decimalPlaces);
        return Math.round(num * factor) / factor;
    }

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target .value);
        setVolume(newVolume);    
        if(audioRef.current){
            audioRef.current.volume = newVolume;
        }
    }
    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => setCurrentTime(audio.currentTime);
        audio.addEventListener("timeupdate",updateProgress);
        audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

        const handleKeyDown = (event) => {
            if (!audioRef.current) return;
            switch (event.key) {
                case ' ':
                    handlePlayState();
                    break;
                case 'ArrowDown':
                    setVolume((prevVol) =>  Math.max(prevVol - 0.1 , 0));
                        break;
                case 'ArrowUp':
                    setVolume((prevVol) =>  Math.min(prevVol + 0.1 , 1));
                    break;
                case 'm':
                    audioRef.current.volume == 0 ? setVolume(0.5) : setVolume(0);
                    break;
                case 'ArrowLeft':
                    handleTrackChange('Prev');
                    break;
                case 'p':
                    handleTrackChange('Prev');
                    break;
                case 'ArrowRight' :
                        handleTrackChange('Next');
                    break;
                case 'n' :
                        handleTrackChange('Next');
                    break;
            }
        }

        if(audioRef.current) {
            audioRef.current.volume = volume;
        }
        window.addEventListener("keydown", handleKeyDown);
    

        return() => {
            window.removeEventListener("keydown", handleKeyDown);
            audio.addEventListener("timeupdate",updateProgress);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ volume]);
        
    return(
        <>
                <div>
                    <p>{trackName}</p>
                    <audio ref={audioRef} src={trackName} onLoadedData={handleNewPLay} ></audio>
                    {/* custom player Bar */}
                    <div  >
                        <div className="progress-bar"  value={(currentTime / duration) * 100} onClick={handleSeek} >
                            <div style={{left:`${roundToDecimal(((currentTime / duration) * 100),2)}%`}}></div>
                        </div>
                        <div className="time-display" >
                            <span>{formatTime(currentTime)} :::::</span>
                            <span>{formatTime(duration)}</span>
                        </div>

                    </div>
                    <div className="" ></div>
                </div>
            <div className="controls">
                <button type="button" id="prev" onClick={() => handleTrackChange('prev')} >Prev </button>
                <button type="button" id="pause" onClick={handlePlayState} >Pause</button>
                <button type="button" id="next" onClick={() => handleTrackChange('next')}>Next</button>
            </div>

            <div>
                <input 
                    type="range" 
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </>
    );
}

export default Controls;