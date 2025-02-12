import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "../firbase"; // Firebase 수정
import Header from "../component/Header";
import BottomNav from "../component/BottomNav";
import FixBtn from "../component/FixBtn";
import "../Admin.css";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [worshipList, setWorshipList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Firestore에서 데이터 불러오기
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "worship_info"));
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        createdAt: doc.data().createdAt?.toDate().toLocaleString() || "날짜 없음",
        updatedAt: doc.data().updatedAt?.toDate().toLocaleString() || "수정 없음", // 마지막 수정 시간 추가
      }));
      setWorshipList(dataList);
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
    }
  };

  // Firestore에 데이터 저장
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    setLoading(true);
    const now = new Date();

    try {
      if (editId) {
        // 수정 모드
        const docRef = doc(db, "worship_info", editId);
        await updateDoc(docRef, {
          title,
          content,
          updatedAt: now, // 마지막 수정 시간 업데이트
        });

        alert("수정되었습니다!");
        setEditId(null);
      } else {
        // 새 데이터 추가
        await addDoc(collection(db, "worship_info"), {
          title,
          content,
          createdAt: now, // 최초 등록 시간
          updatedAt: now, // 마지막 수정 시간
        });

        alert("저장되었습니다!");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 1000);
      setTitle("");
      setContent("");
      fetchData();
    } catch (error) {
      console.error("Firestore 저장 오류:", error);
      alert(`저장 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Firestore에서 데이터 삭제
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteDoc(doc(db, "worship_info", id));
      alert("삭제되었습니다!");
      fetchData();
    } catch (error) {
      console.error("Firestore 삭제 오류:", error);
      alert(`삭제 중 오류 발생: ${error.message}`);
    }
  };

  // 수정 모드 활성화
  const handleEdit = (item) => {
    setTitle(item.title);
    setContent(item.content);
    setEditId(item.id);
  };

  // 페이지 로드 시 Firestore 데이터 불러오기
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="content">
        <h1 className="title">{editId ? "예배 정보 수정" : "예배 정보 입력"}</h1>

        <div className="input-group">
          <label className="input-label">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="제목을 입력해주세요"
          />
        </div>

        <div className="input-group">
          <label className="input-label">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field textarea-field"
            placeholder="내용을 입력해주세요"
          />
        </div>

        <button
          onClick={handleSave}
          className={`save-button ${saveSuccess ? "save-success" : ""}`}
          disabled={loading}
        >
          {loading ? "저장 중..." : editId ? "수정하기" : "저장하기"}
        </button>

        {/* 🔽 저장된 예배 정보 리스트 */}
        <div className="worship-list">
          <h2>저장된 예배 정보</h2>
          {worshipList.length > 0 ? (
            <ul>
              {worshipList.map((item) => (
                <li key={item.id} className="worship-item">
                  <strong>{item.title}</strong>
                  <p>{item.content}</p>
                  <span className="date">최초 등록: {item.createdAt}</span>
                  <span className="date">마지막 수정: {item.updatedAt}</span>
                  <div className="button-group">
                    <button className="edit-button" onClick={() => handleEdit(item)}>
                      수정
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(item.id)}>
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>저장된 예배 정보가 없습니다.</p>
          )}
        </div>
      </div>

      <FixBtn />
      <BottomNav />
    </>
  );
};

export default Admin;
