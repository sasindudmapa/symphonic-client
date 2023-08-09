import React, { useState, useEffect } from 'react'
import ThumbAlbum from './ThumbAlbum'
import baseUrl from '../../Utils/Axios'

function Albums({username}) {
    const [albums, setalbums] = useState([])
    const [hasSongs, sethasSongs] = useState(false)


    useEffect(()=>{
        async function fetchUserAlbums(token, username){
            const res = await baseUrl.get(`user/account/${username}/fetch/${token}/album`)
            if(res.status === 201){
                console.log(res.data)
                setalbums(res.data)
                sethasSongs(true)
            }

        }

        const token = localStorage.getItem("x-auth-token")

        fetchUserAlbums(token, username)
    },[username])

    return (
        <div className="albums mx-10 mt-10">
            {
                hasSongs===false?
                <h1 className="text-lg font-medium">No albums yet</h1>
                :
                <div className="hasAlbums flex flex-wrap">
                    {albums.map((album)=>{
                        return <ThumbAlbum albumName={album.albumName} cover={album.coverPhoto} artistName={album.artistName}/>
                    })}
                </div>
            }
        </div>
    )
}

export default Albums
