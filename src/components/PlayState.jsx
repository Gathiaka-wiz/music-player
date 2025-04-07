import { useEffect, useState, useMemo } from "react";

const PlayState = ({ audioRef, currentSong }) => {
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
    const skipSteps = (move) => {
        if (audioRef.current === null) return ;
        let current = currentTime
        let audio = audioRef.current

        if(move === 'backward' ){
            let seekTime = current  - 10.0;
            audio.currentTime = seekTime;
        }else if (move === 'forward') {
            let seekTime = current  + 10.0;
            audio.currentTime = seekTime;
        }

    }

    if (!currentSong) return null;

    

    return (
        <section className="play-state">
            <audio ref={audioRef} src={audioURL}  ></audio>
            <div className="play-bar" onClick={handleSeek}>
                <span className="ball"
                    style={{ left: `${roundToDecimal((currentTime / duration),5) * 100}%` }}
                ></span>
            </div>
            <div className="skips" >
                <button onClick={() => skipSteps('backward')} >backward</button>
                <button onClick={() => skipSteps('forward')} >forward</button>
            </div>
            <aside>
                <span>{formatTime(currentTime)}</span> <wbr />
                <span>{formatTime(duration)}</span>
            </aside>
            <p>{currentSong.name}</p>
        </section>
    );
};

export default PlayState;
