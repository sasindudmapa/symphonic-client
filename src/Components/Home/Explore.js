/** @format */

import React, { useEffect, useState } from "react";
import baseUrl from "../../Utils/Axios";
import ThumbAlbum from "../Album/ThumbAlbum";
import Song from "../Song/Song";
import ThumbArtist from "../User/ThumbArtist";
import load from "../../Static/loading2.gif";

function Explore() {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    async function fetchArtists(token) {
      const res = await baseUrl.get(`/user/${token}/home/artists`);
      const data = res.data;
      if (res.status === 201) {
        setArtists(data);
      } else {
        setAccess(false);
      }
    }

    async function fetchAlbums(token) {
      const res = await baseUrl.get(`/user/${token}/home/latestAlbums`);
      const data = res.data;
      if (res.status === 201) {
        setAlbums(data);
        fetchArtists(token).then(() => setAccess(true));
      } else {
        setAccess(false);
      }
    }

    async function fetchSongs(token) {
      const res = await baseUrl.get(`/user/${token}/home/songs`);
      const data = res.data;
      if (res.status === 201) {
        setSongs(data);

        fetchAlbums(token);
      } else {
        setAccess(false);
      }
    }

    const token = localStorage.getItem("x-auth-token");

    fetchSongs(token).then(() => {
      console.log(artists);
    });
  }, []);

  return (
    <div className="">
      {access === false ? (
        <div>
          <img
            src={load}
            alt="loading animation"
            className="w-1/3 loading-anime"
          />
        </div>
      ) : (
        <div>
          <div className="albums">
            <h1 className="text-xl md:text-3xl font-bold p-4">Latest Albums</h1>
            <div className="flex flex-wrap mx-auto">
              {albums.map((album) => {
                return (
                  <ThumbAlbum
                    cover={album.coverPhoto}
                    albumName={album.albumName}
                    artistName={album.artistName}
                  />
                );
              })}
            </div>
          </div>
          <div className="artists mt-3">
            <h1 className="text-xl md:text-3xl font-bold p-4">Top Artists</h1>
            <div className="flex flex-wrap w-auto">
              {artists.map((artist) => {
                let numOfALs;
                if (artist.albums === undefined) {
                  numOfALs = 0;
                } else {
                  numOfALs = artist.albums.length;
                }

                return (
                  <ThumbArtist
                    proPic={artist.profilePhoto}
                    name={artist.userName}
                    numOfAlbums={numOfALs}
                  />
                );
              })}
            </div>
          </div>
          <div className="songs mt-3">
            <h1 className="text-xl md:text-3xl font-bold p-4">Top Songs</h1>
            <div className="p-8">
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
        </div>
      )}
    </div>
  );
}

export default Explore;
