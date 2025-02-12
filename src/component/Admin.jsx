import React, { useState, useEffect, useRef } from "react";
import { db, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "../firbase"; // Firebase 설정 파일 (firbase.js)
import { writeBatch } from "firebase/firestore"; // writeBatch 별도 import
import ReactQuill from "react-quill"; // react-quill import
import "react-quill/dist/quill.snow.css"; // react-quill 스타일

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
  const [dataLoading, setDataLoading] = useState(true);

  const inputRef = useRef(null);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "worship_info"));
      const dataList = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        seq: docSnap.data().seq || 0,
        title: docSnap.data().title,
        content: docSnap.data().content,
        createdAt: docSnap.data().createdAt?.toDate().toLocaleString() || "날짜 없음",
        updatedAt: docSnap.data().updatedAt?.toDate().toLocaleString() || "수정 없음",
      }));
      dataList.sort((a, b) => a.seq - b.seq);
      setWorshipList(dataList);
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const reassignSeq = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "worship_info"));
      const docs = querySnapshot.docs.sort((a, b) => {
        const seqA = a.data().seq || 0;
        const seqB = b.data().seq || 0;
        return seqA - seqB;
      });
      const batch = writeBatch(db);
      let newSeq = 1;
      docs.forEach((docSnap) => {
        const docRef = doc(db, "worship_info", docSnap.id);
        batch.update(docRef, { seq: newSeq });
        newSeq++;
      });
      await batch.commit();
      fetchData();
    } catch (error) {
      console.error("순번 재할당 오류:", error);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("모든 필드를 입력하세요.");
      return;
    }
    setLoading(true);
    const now = new Date();

    try {
      if (editId) {
        const docRef = doc(db, "worship_info", editId);
        await updateDoc(docRef, {
          title,
          content,
          updatedAt: now,
        });
        alert("수정되었습니다!");
        setEditId(null);
      } else {
        const newSeq = worshipList.length + 1;
        await addDoc(collection(db, "worship_info"), {
          seq: newSeq,
          title,
          content,
          createdAt: now,
          updatedAt: now,
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

  const handleDelete = async (id) => {
    if (editId === id) {
      alert("수정중인 글은 삭제할 수 없습니다");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, "worship_info", id));
      alert("삭제되었습니다!");
      await reassignSeq();
    } catch (error) {
      console.error("Firestore 삭제 오류:", error);
      alert(`삭제 중 오류 발생: ${error.message}`);
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setContent(item.content);
    setEditId(item.id);
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCancelEdit = () => {
    setTitle("");
    setContent("");
    setEditId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataLoading) {
    return (
      <>
        <Header />
        <div className="content" style={{ paddingBottom: "120px" }}>
          <p>Loading...</p>
        </div>
        <FixBtn />
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="content" style={{ paddingBottom: "120px" }} ref={inputRef}>
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
          <ReactQuill
            value={content}
            onChange={setContent}
            className="input-field textarea-field"
            placeholder="내용을 입력해주세요"
          />
        </div>

        <div className="button-group">
          <button
            onClick={handleSave}
            className={`save-button ${saveSuccess ? "save-success" : ""}`}
            disabled={loading}
          >
            {loading ? "저장 중..." : editId ? "수정하기" : "저장하기"}
          </button>
          {editId && (
            <button className="cancel-button" onClick={handleCancelEdit}>
              취소
            </button>
          )}
        </div>

        <div className="worship-list">
          <h2>저장된 예배 정보</h2>
          {worshipList.length > 0 ? (
            <ul>
              {worshipList.map((item) => (
                <li key={item.id} className="worship-item">
                  <strong>
                    {item.seq}. {item.title}
                  </strong>
                  <p dangerouslySetInnerHTML={{ __html: item.content }} />
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
