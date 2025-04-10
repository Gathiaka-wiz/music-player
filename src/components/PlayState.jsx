import { useEffect, useState, useMemo } from "react";
import { playBar, playState } from "../assets/icons/icons";

const PlayState = ({ audioRef, currentSong , autoNext }) => {
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioURL = useMemo(() => {
        if (!currentSong) return null;
        return URL.createObjectURL(currentSong);
    }, [currentSong]);

    useEffect(() => {
        return () => {
            if (audioURL) URL.revokeObjectURL(audioURL);
        };
    }, [audioURL]);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => console.log(error));
        }
    }, [audioURL,audioRef]);

    useEffect(() => {
        if (!audioRef.current) return;
        const audio = audioRef.current;

        const updateProgressBar = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('timeupdate', updateProgressBar);



        return () => {
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('timeupdate', updateProgressBar);
        };
    }, );
        useEffect(() => {
            const handleEnd = () => {
                autoNext();
            }
    
            window.addEventListener('ended',handleEnd);
    
            // return() => window.removeEventListener('ended',handleEnd)
        },[autoNext])

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleSeek = (event) => {
        const audio = audioRef.current;
        const bar = event.currentTarget;
        const clickX = event.nativeEvent.offsetX;
        const barWidth = bar.clientWidth;
        const seekTime = (clickX / barWidth) * duration;
        audio.currentTime = seekTime;
        setCurrentTime(seekTime);
    };
    
    const roundToDecimal = (num , decimalPlace) => {
        const places = Math.pow(10,decimalPlace);
        return Math.round(num * places) / places
    }
    

    if (currentSong) {
        return (
            <section className="play-state">
                <audio 
                    ref={audioRef} 
                    src={audioURL}  
                >
                </audio>
                <p>{currentSong.name}</p>
                <div className="timeline" onClick={handleSeek}>
                    <img 
                        src={playBar} 
                        alt="playBar" 
                        className="play-bar" 
                        />
                    <img 
                        className="ball" 
                        src={playState} 
                        alt="play-bar-ball" 
                        style={{ left: `${(roundToDecimal((currentTime / duration),5) * 100) == 100 ? 99 : (roundToDecimal((currentTime / duration),5) * 100)}%` }} 
                    />
                </div>
                
                <aside>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </aside>
            </section>
        );
    }else{
        return (
            <section className="play-state">
                {/* <p>Tom-Macdonald-man-in-the-sky-720p-official-video.mp3</p> */}
                <p>No song is selected (please select a  song)</p>
                <div className="timeline" onClick={handleSeek}>
                    <img 
                        src={playBar} 
                        alt="playBar" 
                        className="play-bar" 
                    />
                    <img 
                        className="ball" 
                        src={playState} 
                        alt="play-bar-ball" 
                    />
                </div>
                <aside>
                    <span>00:00</span> 
                    <span>00:00</span>
                </aside>
            </section>
        );

    }
};

export default PlayState;
