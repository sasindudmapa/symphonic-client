/** @format */

import React, { useEffect, useState } from "react";
import baseUrl, { mediaUrl } from "../../Utils/Axios";
// import { useParams } from "react-router";
import Song from "../Song/Song";
import load from "../../Static/loading2.gif";

function Mains({ username }) {
  const [songs, setsongs] = useState([]);
  const [albums, setalbums] = useState([]);
  const [hasLoaded, sethasLoaded] = useState(false);

  useEffect(() => {
    async function fetchRandomSongs(token, username) {
      console.log("here berforsdsd");

      const res = await baseUrl.get(`user/${token}/random/album/${username}`);

      if (res.status === 201) {
        console.log("came herr");
        setalbums(res.data);
        if (res.data.songs !== undefined) {
          setsongs(res.data.songs);
        }
        sethasLoaded(true);
        console.log(songs);
      }
    }

    const token = localStorage.getItem("x-auth-token");
    fetchRandomSongs(token, username);
  }, [username]);

  return (
    <div className="mains">
      {hasLoaded === false ? (
        <img
          src={load}
          alt="loading animation"
          className="w-1/3 loading-anime"
        />
      ) : (
        <div>
          <div className="main-songs p-8">
            {songs.length === 0 ? (
              <h1>No Songs Yet</h1>
            ) : (
              songs.map((song) => {
                console.log(songs);
                return (
                  <div className="main-song">
                    <Song
                      artist={song.artistName}
                      track={song.audioTrack}
                      songName={song.songName}
                      cover={song.coverPhoto}
                      albumName={song.albumName}
                      likes={song.likes}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Mains;
