import { useEffect, useState } from "react";

const PlayState = ({ audioRef, currentSong}) => {
    const [duration,setDuration] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);

    useEffect(() => {
        if(!audioRef.current) return;
        const audio = audioRef.current;
        audio.addEventListener('loadedmetadata', () => setDuration(audio.duration) );
        
    });
    useEffect(() => {
        if(!audioRef.current) return;
        const updateProgressBar = () => setCurrentTime(audioRef.current.currentTime);
        audioRef.current.addEventListener('timeUpdate', updateProgressBar);
        
        // return() => {
        //     audioRef.current.removeEventListener("timeupdate",updateProgressBar);
        // }
    })

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60 );

        return `${minutes} : ${seconds < 10 ? "0" : "" }${seconds}`
    }

    const handleSeek = (event) => {
        const bar = event.target;
        const clickX = event.nativeEvent.offsetX;
        const barWidth = bar.clientWidth;
        const seekTime = ((clickX / barWidth) * duration);
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    }


        if(currentSong === undefined) return;
        return(
            <section className="play-state" >
                <audio ref={audioRef} src={URL.createObjectURL(currentSong)} controls ></audio>
                <div className="play-bar" onClick={handleSeek} >
                    <span className="ball"  
                        style={{left:`${((currentTime / duration) * 100)}%`}} 
                    ></span>
                    </div>
                <aside>
                    <span>{formatTime(currentTime)}</span>  ___________<wbr/>
                    <span>{formatTime(duration)}</span>
                </aside>
                <p>{currentSong.name}</p>
            </section>
        )
}

export default PlayState;