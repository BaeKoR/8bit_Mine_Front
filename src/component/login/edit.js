
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../mine/images/logo.png';
import Topbar from "../main/topbar";

import './edit.css';

function Edit() {
    const history = useNavigate();

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userDate, setUserDate] = useState("");
    const [userSocial, setUserSocial] = useState("");
    const [job, setJob] = useState('');
    const [profPic, setProfPic] = useState('');
    const [profMsg, setProfMsg] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const [noprof, setNoprof] = useState(false);


    function Check() {
        const jwt = localStorage.getItem("token");
        if (jwt === null) {
            history("/");
        }
        else {
            axios.get("http://localhost:3000/authcheck", { params: { "token": jwt } })
                .then(function (resp) {
                    if (resp.data === 0) {
                        history("/admin");
                    }
                    else if (resp.data === 2) {
                        history("/ban");
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })

            axios.get("http://localhost:3000/jwtcheck", { params: { "token": jwt } })
                .then(function (resp) {
                    if (resp.data === "fail") {
                        localStorage.removeItem("token");

                        history("/");
                    }
                })
                .catch(function (err) {
                    alert(err);
                })
        }
    }

    function getUser() {
        const jwt = localStorage.getItem("token");
        if (jwt === null) {
            history("/");
        }
        else {
            axios.get("http://localhost:3000/show", { params: { "token": jwt } })
                .then(function (resp) {
                    setUserEmail(resp.data.email);
                    setUserName(resp.data.name);
                    setUserDate(resp.data.regidate);
                    setUserSocial(resp.data.social);
                    setJob(resp.data.job);
                    setProfMsg(resp.data.profMsg);
                    setAddress(resp.data.address);
                    setBirthdate(resp.data.birthdate);
                    setProfPic(resp.data.profPic);
                })
                .catch(function (err) {
                    alert(err);
                })
        }
    }

    function editAf() {
        const jwt = localStorage.getItem("token");
        const img = process.env.PUBLIC_URL
        let formData = new FormData();
        formData.append("name", userName);
        formData.append("birthdate", birthdate);
        formData.append("job", job);
        formData.append("address", address);
        formData.append("profMsg", profMsg);
        formData.append("token", jwt);

        // 사진 변경 있을 때
        if (document.frm.uploadFile.files[0]) {
            formData.append("uploadFile", document.frm.uploadFile.files[0]);
            axios.post("http://localhost:3000/edit", formData)
                .then(function (resp) {
                    alert(resp.data);
                })
                .catch(function (err) {
                    alert(err);
                })

            // 사진 삭제했을 때
        } else if (noprof) {
            axios.get("http://localhost:3000/edit_n", {
                params: {
                    "name": userName, "birthdate": birthdate,
                    "job": job, "address": address, "profMsg": profMsg, "token": jwt
                }
            })
                .then(function (resp) {
                    alert(resp.data);
                })
                .catch(function (err) {
                    alert(err);
                })

            // 사진 변경 없을 때
        } else {
            axios.get("http://localhost:3000/edit_nc", {
                params: {
                    "name": userName, "birthdate": birthdate,
                    "job": job, "address": address, "profMsg": profMsg, "token": jwt
                }
            })
                .then(function (resp) {
                    alert(resp.data);
                })
                .catch(function (err) {
                    alert(err);
                })
        }


    }

    function delProf() {
        document.getElementById("prof").setAttribute('src', logo);
        setNoprof(true);
    }

    function goback() {
        history("/main");
    }

    useEffect(function () {
        Check();
        getUser();
    }, [])

    return (
        <div id="back">
            <Topbar />
            <div id="topbar">
                <div id="barbtns">
                    <div id="mainbtn" onClick={(e) => { window.location.href = "/main" }}>
                       <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>MAIN</p>
                    </div>
                </div>
            </div>
            <div>
                <span className="editArea">
                    <span className="editLeft">
                        <h1>내 정보</h1>
                        이메일: &nbsp;
                        <input type="text" value={userEmail} readOnly="readOnly" className="editInput" />
                        <br />
                        가입 날짜: &nbsp;
                        <input type="text" value={userDate} readOnly="readOnly" className="editInput" />
                        <br />
                        최초 가입: &nbsp;
                        <input type="text" value={userSocial} readOnly="readOnly" className="editInput" />
                    </span>
                    <span className="editCenter">
                        <h1>정보 수정</h1>
                        이름: &nbsp;
                        <input type="text" className="editInput" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        생년월일: &nbsp;
                        <input type="date" className="editInput" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                        학교/직장: &nbsp;
                        <input type="text" className="editInput" value={job} onChange={(e) => setJob(e.target.value)} />
                        주소: &nbsp;
                        <input type="text" className="editInput" value={address} onChange={(e) => setAddress(e.target.value)} />
                        상태메세지: &nbsp;
                        <input type="text" className="editInput" value={profMsg} onChange={(e) => setProfMsg(e.target.value)} />
                        <form name="frm" encType="multipart/form-data">
                            프로필사진: &nbsp;
                            <input type="file" onClick={() => { setNoprof(false) }} name="uploadFile" accept="*" />
                        </form>
                        <button type="button" className="editButton" onClick={delProf}>사진 삭제</button>
                        <img id="prof" src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} alt="X" width="200px" height="200px" className="editImg" />
                        <br /><br />
                        <button type="button" className="editButton" onClick={editAf}>수정</button>
                    </span>
                    <span className="editRight">
                        <h1>서비스 탈퇴</h1>
                        <h3>
                            탈퇴전 확인하세요!
                            <br /><br />
                            서비스 탈퇴 진행 시 모든 데이터가 삭제되며 다시 복구하실 수 없습니다.
                            <br />
                            탈퇴 버튼을 누르시면 해당 내용에 동의하신 것으로 간주됩니다.
                        </h3>
                        <button type="button" className="editButton2" onClick={(e) => {window.location.href = "/kakao/withdrawal"}}>탈퇴하기</button>
                    </span>
                </span>
            </div>
        </div>
    );
}

export default Edit;