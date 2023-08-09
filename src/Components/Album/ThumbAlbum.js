import React from 'react'
import { useParams } from "react-router";
import { mediaUrl } from '../../Utils/Axios'

function ThumbAlbum({cover, albumName, artistName, year}) {
  const { username } = useParams();

    return (
        <div className='album-thumb mb-5 p-1 xl:mx-5 xl:p-2 lg:mx-4 mx-auto border border-gray-700 shadow-md cursor-pointer transition duration-200  hover:bg-gray-500 hover:bg-opacity-25 rounded-sm '>
            <a href={`/user/${username}/account/show/album/${albumName}/${artistName}`}>
                <img src={`${mediaUrl}${cover}`} alt={albumName} className="xl:w-56 lg:w-48 md:w-40 w-36"/>
            </a>
            <a href={`/user/${username}/account/show/album/${albumName}/${artistName}`}>
                <h2 className="text-center lg:p-2 font-bold lg:text-xl md:p-1">{albumName}</h2>
            </a>
            <a href={`/user/account/${artistName}`}>
                <h3 className="text-center font-bold">{artistName}</h3>
            </a>
        </div>
    )
}

export default ThumbAlbum
