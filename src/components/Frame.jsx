import { useEffect, useRef } from "react";

const Frame = ( { currentSong } ) => {

    const frames = [
        '/frames/1.webp',
        '/frames/3.webp',
        '/frames/4.webp',
        '/frames/5.jpeg',
        '/frames/6.jpeg',
        '/frames/7.jpeg',
        '/frames/8.jpeg',
    ];
    const length = frames.length;
    const currentFrameIndexRef = useRef(0);


    return(
        <section className="frame" >
            {
                useEffect(() => {
                    currentFrameIndexRef.current === length-1 ? currentFrameIndexRef.current = 0 : currentFrameIndexRef.current ++ ;
                },[currentSong])
            }
            <img src={frames[currentFrameIndexRef.current]} alt="frame" style={{width:'450px', height:'400px'}} />
        </section>
    )
}

export default Frame;