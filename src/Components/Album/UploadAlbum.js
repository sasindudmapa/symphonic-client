/** @format */

import React, { useState } from "react";
import baseUrl from "../../Utils/Axios";
import { useNavigate, useParams } from "react-router";
import load from "../../Static/loading2.gif";

function UploadAlbum() {
  const { username } = useParams();
  const [albumName, setAlbumName] = useState("");
  const [songs, setsongs] = useState([]);
  const [coverPhoto, setcoverPhoto] = useState("");
  const [resMsg, setResMsg] = useState();
  const [pageload, setPageLoad] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setPageLoad(true);

    async function saveAlbum(token, data) {
      const res = await baseUrl.post(
        `user/${token}/account/upload/album`,
        data
      );
      if (res.status === 201) {
        navigate(`/user/account/${username}`);
      }
      setResMsg(res.data);
    }

    const newForm = new FormData();
    let lowerAlbum = albumName.toLowerCase();
    let day = new Date();
    const token = localStorage.getItem("x-auth-token");

    newForm.append("albumName", albumName);
    newForm.append("nameInLower", lowerAlbum);
    newForm.append("media", coverPhoto);
    newForm.append(
      "year",
      `${day.getFullYear()}/${day.getMonth()}/${day.getDay()}`
    );

    songs.map((song) => {
      return newForm.append("media", song);
    });

    saveAlbum(token, newForm);
  }

  return (
    <div className="relo-form" onSubmit={(e) => handleSubmit(e)}>
      {pageload ? (
        <div>
          <img src={load} alt="" className="w-1/3 loading-anime" />
        </div>
      ) : (
        <form
          action=""
          encType="multipart/form-data"
          className="relo-form-form bg-black bg-opacity-60 rounded-sm md:p-5"
        >
          <div className="intext">
            <span>Album Name</span>
            <input
              type="text"
              id="albumName"
              className="input-upload"
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </div>
          <div className="intext">
            <span>Cover Photo</span>
            <input
              type="file"
              name=""
              id="coverPhoto"
              onChange={(e) => setcoverPhoto(e.target.files[0])}
            />
          </div>
          <div className="intext">
            <span>Songs</span>
            <input
              type="file"
              name="media"
              id=""
              multiple
              onChange={(e) => {
                let files = e.target.files;
                const songsTofront = [];
                for (let i = 0; i < files.length; i++) {
                  songsTofront.push(files[i]);
                }
                setsongs(songsTofront);
              }}
            />
          </div>
          <button
            type="submit"
            className="text-center font-bold border mt-8 p-2 lg:w-72 mr-auto ml-auto"
          >
            upload
          </button>
        </form>
      )}
    </div>
  );
}

export default UploadAlbum;
