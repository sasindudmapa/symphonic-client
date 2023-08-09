import React, { useState } from 'react'

function Account() {
    const [underline, setunderline] = useState(false);

    return (
        <div className="account w-full">
            <h1 className="title">Music Tape</h1>
            <div className="tabs flex justify-evenly">
                <div 
                    className={`cursor-pointer ${underline && "underline"}`} 
                    onClick={()=>{
                        setunderline(!underline)
                    }}>Artists</div>
                <div className="cursor-pointer">Albums</div>
                <div className="cursor-pointer">Songs</div>
            </div>
            <div className="content">
                
            </div>
        </div>
    )
}

export default Account
