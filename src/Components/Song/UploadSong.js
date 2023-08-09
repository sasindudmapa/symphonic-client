/** @format */

import React, { useState } from "react";
import { useParams } from "react-router";
import baseUrl from "../../Utils/Axios";
import { useNavigate } from "react-router";
import load from "../../Static/loading2.gif";

function UploadSong() {
  const { username } = useParams();
  const [albumName, setAlbumName] = useState("");
  const [songCover, setCover] = useState("");
  const [audioTrack, setAudioTrack] = useState("");
  const [resMsg, setResMsg] = useState("");
  const [pageLoad, setPageLoad] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setPageLoad(true);
    async function sendingSongData(token, data) {
      const res = await baseUrl.post(`user/${token}/account/upload/song`, data);
      console.log(res.data);
      if (res.status === 201) {
        navigate(`/user/account/${username}`);
      }
      setResMsg(res.data);
    }

    const token = localStorage.getItem("x-auth-token");
    const fdata = new FormData();

    let songName = audioTrack.name;
    let lowerName = audioTrack.name.toLowerCase();
    let albumLower = albumName.toLowerCase();
    let day = new Date();

    fdata.append("songName", songName);
    fdata.append("albumName", albumName);
    fdata.append("albumLower", albumLower);
    fdata.append(
      "year",
      `${day.getFullYear()}/${day.getMonth()}/${day.getDay()}`
    );
    fdata.append("nameInLower", lowerName);
    fdata.append("media", audioTrack);
    fdata.append("media", songCover);
    sendingSongData(token, fdata);
  }

  return (
    <div className="relo-form">
      {pageLoad ? (
        <div>
          <img src={load} alt="" className="w-1/3 loading-anime" />
        </div>
      ) : (
        <form
          action=""
          encType="multipart/form-data"
          className="relo-form-form bg-black bg-opacity-60 rounded-sm md:p-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="intext">
            <span>Album name: </span>
            <input
              type="text"
              placeholder="album name"
              id="album"
              className=""
              onChange={(e) => {
                setAlbumName(e.target.value);
              }}
            />
          </div>
          <div className="intext">
            <span>Audio Track: </span>
            <input
              type="file"
              name="audio"
              id="audio"
              onChange={(e) => {
                setAudioTrack(e.target.files[0]);
              }}
            />
          </div>
          <div className="intext">
            <span>Cover photo: </span>
            <input
              type="file"
              name="cover"
              id="cover"
              onChange={(e) => {
                setCover(e.target.files[0]);
              }}
            />
          </div>
          <button
            type="submit"
            className="text-center font-bold border mt-8 p-2 lg:w-72 mr-auto ml-auto"
          >
            Upload
          </button>
        </form>
      )}
      <p className="res-me">{resMsg}</p>
    </div>
  );
}

export default UploadSong;
