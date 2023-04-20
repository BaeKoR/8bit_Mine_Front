import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Pagination from "react-js-pagination";
import { Link, useNavigate, useParams } from 'react-router-dom';

import "./page.css";

//calendar DB사용
function Diary() {
  let history = useNavigate();

  const[diarylist, setDiarylist] = useState([]);
  
//  const[today, setToday] = useState(format(new Date(),'yyyy-MM-dd'));
//  let todayStr = today.toString(); // 문자열로 변환

  // paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  function getDiarylist(page) {
    axios.get("http://localhost:3000/diaryList", {params:{"pageNumber":page}})
         .then(function(resp){
          //  console.log(resp.data.list[0].rdate);
          // console.log(today);
        //  console.log(resp.data.cnt);
       // console.log(resp.data.list);
          setDiarylist(resp.data.list);
          setTotalCnt(resp.data.cnt);
          
        //  console.log(totalCnt);
         })
         .catch(function(err){
            alert(err);
         })
  }


  function pageChange(page){ 
    setPage(page);
    getDiarylist(page-1);
  }


  //클릭하면 글쓰기 함수 나오게
  const DiaryWrite = async(e) => {
    return(
     <div>

     </div>
    );
  }


  //삭제
  //같이 보낸 파라미터값 매개변수 하나 더 추가해서 받아주기
  const diaryDelete = async(seq, e) => {
    await axios.get("http://localhost:3000/deleteDiary", {params:{"seq":seq}})
          .then(function(resp){
            alert("게시물이 삭제되었습니다.");
            window.location.reload(); //삭제하고 리로딩
            history('/me');
          })
          .catch(function(err){
            console.log(seq);
            alert("삭제에 실패했습니다");
          })
  }


  useEffect(function(){
    getDiarylist();
  }, []);


  return(
    <div>
      <div style={{border:"1px solid black", textAlign:"center"}}>
      <table border="1">
        <colgroup>
          <col width='70'/><col width='150'/><col width='450'/><col width='50'/><col width='50'/>
          </colgroup>
          <thead>
            <tr>
              <th colSpan="5">오늘의 일지</th>
            </tr>
            <tr>
              <th colSpan="5">{format(new Date(),'yyyy-MM-dd')}</th>
            </tr>
            <tr>
              <th>번호</th><th>제목</th><th colSpan="3">내용</th>
            </tr>
          </thead>
          <tbody>
             {
                diarylist.map(function(diary, idx){
                   var rdateStr = diary.rdate;  //-> 약속날짜

                      return (
                          <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{diary.title}</td>
                            <td>{diary.content}</td>
                            <td>
                            <Link to={`/diaryUpdate/${diary.seq}/${diary.title}/${diary.content}/${diary.rdate}`}>
                              <button type='submit'>수정</button>
                            </Link>
                            </td>
                            <td>
                              <button type="submit" value={diary.seq} 
                                onClick={(e)=>{diaryDelete(diary.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/>
                                  삭제
                              </button>
                            </td>
                          </tr>
                      );
                    }
                  )
              }
             
              <tr>
                <td colSpan="5">
                  <Pagination
                    activePage={page} //현재 페이지
                    itemsCountPerPage={10} //한 페이지당 보여줄 리스트 개수
                    totalItemsCount={totalCnt} //총 아이템 수
                    pageRangeDisplayed={10}   //paginator에서 보여줄 페이지 범위
                    prevPageText={"이전"}
                    nextPageText={"다음"}
                    onChange={pageChange} //페이지 핸들링
                     />

                    <Link to='/diaryWrite'>
                      <button type='submit' onClick={DiaryWrite}>+일지추가</button>
                    </Link>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
export default Diary;
