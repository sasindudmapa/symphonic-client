import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//COMPONENTS
import HomePage from './Home/HomePage';
import Register from './User/Register';
import Login from './User/Login';
import Account from './User/Account';
import UploadSong from './Song/UploadSong';
import UploadAlbum from './Album/UploadAlbum';
import EditProfile from './User/EditProfile';
import Album from './Album/Album';
import Explore from './Home/Explore';
import Search from './Functions/Search';
import SideBar from './SideBar/SideBar';
import MobileSideBar from './SideBar/MobileSideBar';



function App() {
  const [mobile, setMobile] = useState(false)

  useEffect(()=>{
    if(window.innerWidth <= 768){
      setMobile(true)
    }else{
      setMobile(false)
    }
  },[])

  return (
    <div className={`App ${!mobile && "flex"}`}>
      {mobile ? <MobileSideBar /> : <SideBar />}
      <div className='con w-screen'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path='/user/register' element={<Register/>}/>
          <Route path='/user/login' element={<Login/>}/>
          <Route path='/user/account/:username' element={<Account/>}/>
          <Route path='/user/:username/account/upload/song' element={<UploadSong/>}/>
          <Route path='/user/:username/account/upload/album' element={<UploadAlbum/>}/>
          <Route path='/user/:username/account/edit' element={<EditProfile/>}/>
          <Route path='/user/:username/account/show/album/:name/:artistName' element={<Album/>}/>
          <Route path='/user/:username/explore' element={<Explore/>}/>
          <Route path='/search' element={<Search/>}/>

        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;



