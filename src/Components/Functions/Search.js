/** @format */

import React, { useEffect, useState } from "react";
import baseUrl from "../../Utils/Axios";
import ThumbAlbum from "../Album/ThumbAlbum";
import Song from "../Song/Song";
import ThumbArtist from "../User/ThumbArtist";
import load from "../../Static/loading2.gif";

function Search() {
  const [hasAccess, setAccess] = useState(false);
  const [searchItem, setsearchItem] = useState("");
  const [hasItems, setHasItems] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [searchedDb, setSearchedDb] = useState("");
  const [db, setDb] = useState("Artist");

  const token = localStorage.getItem("x-auth-token");

  useEffect(() => {
    if (token !== null || token !== undefined) {
      setAccess(true);
    } else {
      setAccess(false);
    }
  }, []);

  useEffect(() => {
    async function fetchSearch(token, q, item) {
      const res = await baseUrl.get(`user/search/${token}/${q}/${item}`);
      console.log(res.data[0]);
      if (typeof res.data === "string") {
        setHasItems(false);
        setLoaded(true);
      } else {
        setData(res.data[1]);
        setSearchedDb(res.data[0]);
        setHasItems(true);
        setLoaded(true);
      }
    }

    if (searchItem !== "") {
      fetchSearch(token, db, searchItem);
    }
  }, [searchItem]);

  //   function handleFilter(e) {
  //     setDb(e.target.value);
  //     console.log(e.target.value);
  //   }

  return (
    <div>
      {hasAccess === false ? (
        <div>You have no Access</div>
      ) : (
        <div className="search">
          <div className="search-box text-black m-10 text-center">
            <select
              name=""
              id=""
              className="p-2 outline-none font-bold opacity-95"
              onChange={(e) => {
                setDb(e.target.value);
              }}
            >
              <option value="Artist" className="text-black">
                Artists
              </option>
              <option value="Album" className="text-black">
                Albums
              </option>
              {/* <option value="Song">Songs</option> */}
            </select>
            <input
              type="text"
              placeholder="search a song or an artist"
              className="outline-none m-2 p-2 w-2/3 bg-gray-100 border rounded-sm opacity-95"
              onChange={(e) => {
                let word = e.target.value.toLowerCase();
                setsearchItem(word);
              }}
            />
          </div>

          <div className="results">
            {loaded === false ? (
              <img
                src={load}
                alt="loading animation"
                className="w-1/3 loading-anime"
              />
            ) : (
              <div className="loaded">
                {hasItems === false ? (
                  <h1 className="font-bold p-4">No</h1>
                ) : (
                  <div>
                    {searchedDb === "Artist" ? (
                      <div className="search-artists flex flex-wrap w-auto p-4 justify-evenly ">
                        {data.map((artist) => {
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
                    ) : (
                      <div className="notartsits">
                        {searchedDb === "Song" ? (
                          <div className="search-songs">
                            {data.map((song) => {
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
                        ) : (
                          <div className="search-albums flex flex-wrap w-auto p-4 justify-evenly ">
                            {data.map((album) => {
                              return (
                                <ThumbAlbum
                                  cover={album.coverPhoto}
                                  albumName={album.albumName}
                                  artistName={album.artistName}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
