import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../main_back.css"

function I_add() {

  const movePage = useNavigate();
  const jwt = localStorage.getItem("token");
  const [email, setEmail] = useState('');

  function getUser() {
    if (jwt === null) {
      movePage("/");
    }
    else {
      const token = jwt.split('"')[3];

      axios.get("http://localhost:3000/show", { params: { "token": token } })
        .then(function (resp) {
          setEmail(resp.data.email);
        })
        .catch(function (err) {
          alert(err);
        })
    }
  }

  useEffect(() => {
    getUser();
  }, []);


  const [classi, setClassi] = useState('');

  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');
  const [ans5, setAns5] = useState('');
  const ans = [ans1, ans2, ans3, ans4, ans5];

  const [det1, setDet1] = useState('');
  const [det2, setDet2] = useState('');
  const [det3, setDet3] = useState('');
  const [det4, setDet4] = useState('');
  const [det5, setDet5] = useState('');
  const det = [det1, det2, det3, det4, det5];

  function i_add() {

    // 참고 : 특수문자는 추가가 안됨.
    for (let i = 0; i < ans.length; i++) {
      axios.get('http://localhost:3000/i_add', { params: { "id": "snaro0123@gmail.com", "classify": classi, "item": ans[i], "detail": det[i], "ref": i } })
        .then(function () {
        })
        .catch(function (err) {
          alert(err);
        })
    }

    axios.get('http://localhost:3000/i_add_classi', { params: { "id": "snaro0123@gmail.com", "classify": classi } })
      .then(function () {
      })
      .catch(function (err) {
        alert(err);
      });

    alert(classi + " 항목이 추가되었습니다.")
    movePage('/i');
  }

  return (
    <div id="backwhite">
      <table border="1">
        <colgroup>
          <col width="200px" /><col width="200px" />
        </colgroup>
        <thead>
          <tr>
            <td colSpan="2"><input placeholder="분류 내용 입력" style={{ width: "400px" }} onChange={(e) => { setClassi(e.target.value) }} /></td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><input placeholder="항목1" onChange={(e) => { setAns1(e.target.value) }} /></td>
            <td><input placeholder="상세내용" onChange={(e) => { setDet1(e.target.value) }} /></td>
          </tr>
          <tr>
            <td><input placeholder="항목2" onChange={(e) => { setAns2(e.target.value) }} /></td>
            <td><input placeholder="상세내용" onChange={(e) => { setDet2(e.target.value) }} /></td>
          </tr>
          <tr>
            <td><input placeholder="항목3" onChange={(e) => { setAns3(e.target.value) }} /></td>
            <td><input placeholder="상세내용" onChange={(e) => { setDet3(e.target.value) }} /></td>
          </tr>
          <tr>
            <td><input placeholder="항목4" onChange={(e) => { setAns4(e.target.value) }} /></td>
            <td><input placeholder="상세내용" onChange={(e) => { setDet4(e.target.value) }} /></td>
          </tr>
          <tr>
            <td><input placeholder="항목5" onChange={(e) => { setAns5(e.target.value) }} /></td>
            <td><input placeholder="상세내용" onChange={(e) => { setDet5(e.target.value) }} /></td>
          </tr>
        </tbody>
      </table>

      <button onClick={i_add}>추가</button>

      <div>
        <br />
        [참고] 혹시 정확한 정보가 기억이 나지 않는다면? 아래 검색도우미를 활용해보세요!
        <br />
        <button onClick={() => window.open('http://localhost:9001/place', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>위치 정보 검색</button>
        <button onClick={() => window.open('http://localhost:9001/book', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>책 정보 검색</button>
        <button onClick={() => window.open('http://localhost:9001/movie', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>영화 정보 검색</button>
        <button onClick={() => window.open('http://localhost:9001/drama', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>TV/드라마/OTT 정보 검색</button>
      </div>
    </div>
  );
}

export default I_add;