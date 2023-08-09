/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import baseUrl, { mediaUrl } from "../../Utils/Axios";
import Song from "../Song/Song";
import "../../ess.css";
import load from "../../Static/loading2.gif";

function Album() {
  const { username, name, artistName } = useParams();
  const [songs, setsongs] = useState([]);
  const [bgColor, setBgColor] = useState("rgba(255,255,255,0.5)");
  const [hasLoaded, sethasLoaded] = useState(false);

  useEffect(() => {
    async function fetchingAlbumSongs(token, artist, album) {
      const res = await baseUrl.get(
        `user/account/${artist}/fetch/${token}/album/${album}`
      );
      if (res.status === 201) {
        // console.log(res.data[1]);
        let cPalette = res.data[1][0];
        let bColor = `rgba(${cPalette[0]}, ${cPalette[1]}, ${cPalette[2]}, 0.7)`;
        // let bColor = `rgba(255, 87, 51, 0.7)`
        setBgColor(bColor);
        setsongs(res.data[0]);
        sethasLoaded(true);
      }
    }

    const token = localStorage.getItem("x-auth-token");

    fetchingAlbumSongs(token, artistName, name);
  }, []);

  return (
    <div>
      {hasLoaded === false ? (
        <div>
          <img
            src={load}
            alt="loading animation"
            className="w-1/3 loading-anime"
          />
        </div>
      ) : (
        <div className="">
          <div
            className="details flex w-screen h-40 md:56 lg:h-96"
            id="dt"
            style={{
              backgroundImage: `linear-gradient(to top, transparent, ${bgColor}, ${bgColor})`,
            }}
          >
            <div className="album-dts flex mx-12 mt-24">
              <img
                src={`${mediaUrl}${songs[0].coverPhoto}`}
                alt=""
                className="sm:h-48 lg:h-60 h-24 album-bg-image"
                id="img"
              />
              <div className="text-dts-album font-bold mt-auto mb-auto pl-10">
                <h1 className="text-2xl lg:text-4xl  ">{name}</h1>
                <h3>
                  <a
                    href={`/user/account/${artistName}`}
                    className="text-sm md:text-lg lg:text-2xl"
                  >
                    {artistName}
                  </a>
                </h3>
              </div>
            </div>
          </div>

          <div className="p-8 album-page-songs">
            {songs.map((song) => {
              return (
                <Song
                  songName={song.songName}
                  artist={song.artistName}
                  track={song.audioTrack}
                  likes={song.likes}
                  albumName={song.albumName}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Album;
