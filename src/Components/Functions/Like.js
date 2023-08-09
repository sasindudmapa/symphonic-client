import React from 'react'
import likeButton from '../../Static/like.png'


function Like() {
    return (
        <div>
            <img src={`${likeButton}`} alt=""  className="h-3 md:h-6"/>
        </div>
    )
}

export default Like
