import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import Main from "./component/main/main";
import Mine from "./component/mine/mine_main";
import Fullmine from "./component/mine/mine_full";
import MineEdi from "./component/mine/mine_edi";
import Chatbot from "./component/chatbot/chatbot";

import Me from "./component/Me/Me";
import DiaryWrite from "./component/Me/DiaryWrite";
import TodoWrite from './component/Me/TodoWrite';
import DiaryUpdate from './component/Me/DiaryUpdate';
import TodoUpdate from './component/Me/TodoUpdate';

import Card from "./component/BusinessCard/Card";
import InformUpdate from './component/BusinessCard/InformUpdate';
import Back from './component/BusinessCard/Back';
import BackUpdate from './component/BusinessCard/BackUpdate';
import InformDetail from './component/BusinessCard/InformDetail';
import BackWrite from './component/BusinessCard/BackWrite';

import Imain from "./component/I/Imain";
import Iadd from "./component/I/Iadd";
import Idetail from "./component/I/Idetail";
import Iupdate from "./component/I/Iupdate";
import Qna10 from "./component/I/Qna10";
import Place from "./component/I/search/place";
import Book from "./component/I/search/book";
import Movie from "./component/I/search/movie";
import Drama from "./component/I/search/drama";
import Gbmain from "./component/Guestbook/Gbmain";
import Gbadd from "./component/Guestbook/Gbadd";
import Gbupdate from "./component/Guestbook/Gbupdate";
import Gbvoice from "./component/Guestbook/Gbvoice";

import ReactPlayer from "react-player/youtube";
import Bgm from "./component/Bgm/bgm";
import Bgmadd from "./component/Bgm/bgmadd";
import axios from "axios";

function App() {

  const [state, setState] = useState(false);
  const [bgmlist, setBgmlist] = useState([]);
  const [seq, setSeq] = useState(0);
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const fetchData = async () => {
    const resp = await axios.get('http://localhost:3000/bgm_list', { params: { "id": "test" } });
    setBgmlist(resp.data);
    console.log(resp);
  }

  function Option(props) {
    return (
      <option value={`${props.obj.seq}`}>🎶 {props.obj.artist} - {props.obj.title}</option>
    );
  }

  function music_change(seq) {
    setSeq(seq);

    axios.get('http://localhost:3000/bgm_detail', {params : {"seq" : seq}})
    .then(function(resp){
      setArtist(resp.data.artist);
      setTitle(resp.data.title);
      setUrl(resp.data.url);
    })
    .catch(function(err){
      alert(err);
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  function go() {
    setState(true);
  }

  function stop() {
    setState(false);
  }

  return (
    <div>      
     
      <button onClick={go}>재생</button>
      <button onClick={stop}>정지</button>
      <select onChange={(e)=>{music_change(e.target.value)}}>
        <option value="">bgm을 선택하세요.</option>
        {
          bgmlist.map(function (object, i) {
            return (
              <Option obj={object} key={i} cnt={i + 1} />
            )
          })
        }
      </select>
      <button onClick={() => window.open('http://localhost:9001/bgm', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>bgm 관리</button>
        <p>현재 플레이중인 음악 : 🎶 {artist} - {title}</p>

      <BrowserRouter>
        <Link to="/me">me</Link>
        <Link to="/card">온라인 명함</Link>
        
        <Link to='/i'>I 페이지</Link>&nbsp;
        <Link to='/gbmain'>방명록</Link>&nbsp;
        
        <Routes>
          <Route path="/i" element={<Imain />} />
          <Route path="/i_add" element={<Iadd />} />
          <Route path="/i_detail/:id/:classify" exact element={<Idetail />} />
          <Route path="/i_update/:id/:classify" exact element={<Iupdate />} />
          <Route path="/place" element={<Place />} />
          <Route path="/book" element={<Book />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/drama" element={<Drama />} />

          <Route path="/qna10/:id" exact element={<Qna10 />} />

          <Route path="/bgm" element={<Bgm />} />
          <Route path="/bgmadd" element={<Bgmadd />} />

          <Route path="/gbmain" element={<Gbmain />} />
          <Route path="/gbadd" element={<Gbadd />} />
          <Route path="/gbvoice" element={<Gbvoice />} />
          <Route path="/gbupdate/:seq" element={<Gbupdate />} />


          {/* me ,명함 */}
          <Route path="/me" element={<Me></Me>}/>
          
          <Route path="/diaryWrite/:rdate" element={<DiaryWrite/>}/>
          <Route path="/todoWrite/:rdate" element={<TodoWrite/>}/>
          
          <Route path="/me/:rdate" element={<Me/>}/> 
          <Route path="/me/:year/:month" element={<Me/>}/> 

          <Route path="/diaryUpdate/:seq/:title/:content/:rdate" element={<DiaryUpdate/>}/>
          <Route path="/todoUpdate/:seq/:title/:content/:rdate" element={<TodoUpdate/>}/>

          <Route path="/card" element={<Card></Card>}/>

          <Route path="/informDetail/:id" element={<InformDetail/>}/>
          <Route path="/informDetail/:id/:imgFile" element={<InformDetail/>}/>
          <Route path="/informUpdate/:id" element={<InformUpdate/>}/>
          
          <Route path="/back/:id" element={<Back/>}/>
          <Route path="/backUpdate/:seq" element={<BackUpdate/>}/>
          <Route path="/backWrite/:id" element={<BackWrite/>}/>

          <Route path="/main" element={ <Main /> } />
          <Route path="/mine" element={ <Mine /> } />
          <Route path="/mine_full" element={ <Fullmine /> } />
          <Route path="/mine_edi/:pos" element={ <MineEdi /> } />
          <Route path="/chatbot" element={ <Chatbot /> } />
          
        </Routes>

      </BrowserRouter>


      <ReactPlayer
        className="react-player"
        url={url}
        width="0%"
        height="0%"
        muted={false} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
        playing={state}
        loop={true} />
    </div>
  );
}

export default App;
