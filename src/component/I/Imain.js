import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Topbar from "../main/topbar";
import Barbtns from "../main/barbtns";

import { Button } from 'semantic-ui-react'
import "../main_back.css"
import "./icss.css";

function I_main() {

  // 변수 선언
  const history = useNavigate();

  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [profPic, setProfPic] = useState('');
  const [profMsg, setProfMsg] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [dcount, setDcount] = useState(0);

  const [classiList, setClassiList] = useState([]);

  // 접속 권한 체크
  const getUser = async () => {
    const jwt = localStorage.getItem("token");

    if (jwt === null) {
      history("/");
    }
    else {

      // 프로필 조회 
      axios.get("http://localhost:3000/show", { params: { "token": jwt } })
        .then(function (resp) {
          setName(resp.data.name);
          setBirthdate(resp.data.birthdate);
          setJob(resp.data.job);
          setAddress(resp.data.address);
          setProfMsg(resp.data.profMsg);
          setProfPic(resp.data.profPic);
        })

        .catch(function (err) {
          alert(err);
        })
    }
  }

  // 분류 List 조회
  const fetchData = async () => {
    const id = localStorage.getItem("id");
    const resp = await axios.get('http://localhost:3000/i_classi_list', { params: { "id": id } });
    setClassiList(resp.data);
    setDcount(resp.data.length);
  }

  useEffect(() => {
    getUser();
    fetchData();
  }, []);

  // 분류 List with Diamonds - 1번 line
  function Ilist1(props) {
    if (props.cnt > 5) return;

    return (
      <>
        <td style={{ textAlign: "center" }}>
          <div className="items">
            <Link to={`/i_detail/${props.obj.classify}`}>{props.obj.classify}</Link>
          </div>
        </td>
      </>
    );
  }

  // 분류 List with Diamonds - 2번 line
  function Ilist2(props) {
    if (props.cnt < 6 || props.cnt > 10) return;

    return (
      <>
        <td style={{ textAlign: "center" }}>
          <div className="items">
            <Link to={`/i_detail/${props.obj.classify}`}>{props.obj.classify}</Link>
          </div>
        </td>
      </>
    );
  }

  // 분류 List with Diamonds - 3번 line
  function Ilist3(props) {
    if (props.cnt < 11) return;

    if (props.cnt > 15) {
      alert('최대 15개 항목까지 표시됩니다.');
      return;
    }

    return (
      <>
        <td style={{ textAlign: "center" }}><div className="items">
          <Link to={`/i_detail/${props.obj.classify}`}>{props.obj.classify}</Link>
        </div></td>
      </>
    );
  }

  // 분류 추가
  function go_add() {
    if (dcount >= 15) {
      alert('항목은 최대 15개까지 추가할 수 있습니다.');
      return;
    }

    history("/i_add")
  }

  return (
    <div id="back">

      <Topbar />
      <Barbtns />

      <div className="card">
        <h1 style={{ marginTop: "20px", fontSize: "40px" }}>{name}</h1>
        <div className="img-wrap" >
          <img className="imgI" src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} />
        </div>
        <label className="labelI">
          생년월일<br />
          <input className="inputI" readOnly="readOnly" value={birthdate} />
        </label><br />
        <label className="labelI">
          학교/직장<br />
          <input className="inputI" readOnly="readOnly" value={job} />
        </label><br />
        <label className="labelI">
          주소<br />
          <input className="inputI" readOnly="readOnly" value={address} />
        </label><br />
        <label className="labelI">
          상태메세지<br />
          <input className="inputI" readOnly="readOnly" value={profMsg} />
        </label>
      </div>

      <table className="tableItem">
        <thead />
        <colgroup>
          <col width="200px" /><col width="200px" /><col width="200px" /><col width="200px" /><col width="200px" />
        </colgroup>

        <tbody id="tBody">
          <tr>
            {
              classiList.map(function (object, i) {
                return (
                  <Ilist1 obj={object} key={i} cnt={i + 1} />
                )
              })
            }
          </tr>
          <tr>
            {
              classiList.map(function (object, i) {
                return (
                  <Ilist2 obj={object} key={i} cnt={i + 1} />
                )
              })
            }
          </tr>
          <tr>
            {
              classiList.map(function (object, i) {
                return (
                  <Ilist3 obj={object} key={i} cnt={i + 1} />
                )
              })
            }
          </tr>
        </tbody>
      </table>

      <div className="buttons">
        <Button size="big" color="purple" onClick={go_add}>분류 추가</Button>
        <Button size="big" color="purple" onClick={() => history("/qna7")}>7문 7답</Button>
      </div>

    </div>
  );
}

export default I_main;