import React from 'react'
import { mediaUrl } from '../../Utils/Axios'

function ThumbArtist({proPic, name, numOfAlbums}) {
    

    return (
        <div className="xl:m-8 lg:m-6 md:m-4 m-2 text-center">
            <a href={`/user/account/${name}`}>
                <img src={`${mediaUrl}${proPic}`} alt="" className="rounded-full xl:w-56 lg:w-48 md:w-40 w-36"/>
                <h1 className="text-center lg:p-2 font-bold lg:text-xl md:p-1">{name}</h1>
                <h3 className="text-center font-bold opacity-75 sm:text-sm">{numOfAlbums} ALbums</h3>
            </a>
        </div>
    )
}

export default ThumbArtist
