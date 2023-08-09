import React, { useState } from "react";
import { mediaUrl } from "../../Utils/Axios";
import playingload from '../../Static/now play.png'
import playButton from '../../Static/play-button.png' 
import Like from "../Functions/Like";


function Song({ songName, artist, track, cover, likes, albumName }) {
  const [play, setPlay] = useState(false);

  async function handlePlay(e) {
    await setPlay(!play);
    const trackName = e.target.id;
    const trackTag = document.getElementById(`${trackName}/audio`);
    if (play) {
      trackTag.pause();
    } else {
      trackTag.play();
    }
  }


  return (
    <div className="song w-100 flex justify-between mt-1 pr-2 pl-2 md:pr-10 md:pl-10 border border-opacity-80 transition duration-200  hover:bg-gray-50 hover:bg-opacity-5 text-xs md:text-sm opacity-95">
      <div className="le flex">
        <img src={`${play? playingload : playButton}`} alt="" id={`${artist}/${songName}`} className="h-3 md:h-5 mt-auto mb-auto" onClick={(e)=>{handlePlay(e)}}/>
        <h1 className="p-1 md:p-4">{songName}</h1>
        <audio
          src={`${mediaUrl}${track}`}
          controls
          className="hidden"
          id={`${artist}/${songName}/audio`}
        ></audio>
      </div>
      {/* <h2 className="p-4">{artist}</h2> */}
      <div className="ri flex">
        <h3 className="p-1 md:p-4 opacity-80">{albumName}</h3>
        <h4 className="p-1 md:p-4 opacity-80">{likes}</h4>
        <div className="like p-1 md:p-4"><Like/></div>
      </div>
    </div>
    
  );
}

export default Song;
/* <img
        src={`${mediaUrl}${cover}`}
        alt={`${songName}`}
        name={`${artist}/${songName}`}
        onClick={(e) => handlePlay(e)}
      /> */