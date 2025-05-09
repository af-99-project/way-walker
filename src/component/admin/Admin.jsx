import React, { useState, useEffect, useRef } from "react";
import { db, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, writeBatch } from "@/firbase";
import { orderBy, query, where } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import Header from "../component/Header";
// import BottomNav from "../component/BottomNav";
import FixBtn from "@/component/common/FixBtn";
import "@/admin.css";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [worshipList, setWorshipList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const inputRef = useRef(null);
  const editorRef = useRef(null);

  // Firestore에서 데이터 가져오기
  const fetchData = async () => {
    try {
      const qSnapshot = await getDocs(collection(db, "worship_info"));
      const dataList = qSnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          docId: docSnap.id,
          id: data.id,
          title: data.title,
          content: data.content,
          createdAt: data.createdAt?.toDate().toLocaleString() || "날짜 없음",
          updatedAt: data.updatedAt?.toDate().toLocaleString() || "수정 없음",
        };
      });
      dataList.sort((a, b) => a.id - b.id);
      setWorshipList(dataList);
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
    } finally {
      setDataLoading(false);
    }
  };

  // 데이터 저장 및 수정
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("모든 필드를 입력하세요.");
      return;
    }
    setLoading(true);
    const now = new Date();

    try {
      if (editId !== null) {
        const q = query(collection(db, "worship_info"), where("id", "==", editId));
        const qSnapshot = await getDocs(q);
        if (!qSnapshot.empty) {
          const docToUpdate = qSnapshot.docs[0];
          await updateDoc(doc(db, "worship_info", docToUpdate.id), {
            title: title.trim(),
            content: content.trim(),
            updatedAt: now,
          });
          alert("수정되었습니다!");
        } else {
          alert("수정할 문서를 찾을 수 없습니다.");
        }
        setEditId(null);
      } else {
        const qSnapshot = await getDocs(collection(db, "worship_info"));
        const idList = qSnapshot.docs.map((docSnap) => docSnap.data().id);
        const validIds = idList.filter((id) => !isNaN(id));
        const maxId = validIds.length > 0 ? Math.max(...validIds) : 0;
        const newId = maxId + 1;
        await addDoc(collection(db, "worship_info"), {
          title: title.trim(),
          content: content.trim(),
          createdAt: now,
          updatedAt: now,
          id: newId,
        });
        alert("저장되었습니다!");
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 1000);
      setTitle("");
      setContent("");
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
      fetchData();
    } catch (error) {
      console.error("Firestore 저장 오류:", error);
      alert(`저장 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 데이터 삭제
  const handleDelete = async (targetId) => {
    if (editId === targetId) {
      alert("수정중인 글은 삭제할 수 없습니다");
      return;
    }
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const q = query(collection(db, "worship_info"), where("id", "==", targetId));
      const qSnapshot = await getDocs(q);
      if (!qSnapshot.empty) {
        const docToDelete = qSnapshot.docs[0];
        await deleteDoc(doc(db, "worship_info", docToDelete.id));
        alert("삭제되었습니다!");
        fetchData();
      } else {
        alert("삭제할 문서를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Firestore 삭제 오류:", error);
      alert(`삭제 중 오류 발생: ${error.message}`);
    }
  };

  // 수정 시작: 선택한 항목의 데이터를 입력폼에 로드
  const handleEdit = (item) => {
    setTitle(item.title);
    setContent(item.content);
    setEditId(item.id);
    if (editorRef.current) {
      editorRef.current.innerHTML = item.content;
    }
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setTitle("");
    setContent("");
    setEditId(null);
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  // 색상 적용: 선택한 색상 적용
  const applyTextColor = () => {
    document.execCommand("foreColor", false, selectedColor);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  // 주보강조색상 버튼 ( "#9d9a94" 색상 적용 )
  const applyCustomColor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    // CSS 스타일 적용 모드를 활성화
    document.execCommand("styleWithCSS", false, true);
    const selection = window.getSelection();
    if (selection && selection.toString() !== "") {
      document.execCommand("foreColor", false, "#9d9a94");
    } else {
      alert("적용할 텍스트를 선택하세요.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataLoading) {
    return (
      <>
        <div className="content" style={{ paddingBottom: "120px" }}>
          <p>Loading...</p>
        </div>
        <FixBtn />
      </>
    );
  }

  return (
    <>
      <div className="content" style={{ paddingBottom: "120px" }} ref={inputRef}>
        <h1 className="title">{editId !== null ? "예배 정보 수정" : "예배 정보 입력"}</h1>
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
          <div
            ref={editorRef}
            contentEditable
            className="input-field textarea-field"
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              minHeight: "150px",
              outline: "none",
            }}
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
          ></div>
        </div>
        <div className="input-group">
          <label className="input-label">텍스트 색상</label>
          <input type="color" value={selectedColor} onChange={handleColorChange} />
          <button onClick={applyTextColor} className="carrot-button">
            적용
          </button>
          <button onClick={applyCustomColor} className="toss-button">
            주보강조색상
          </button>
        </div>
        <div className="button-group">
          <button
            onClick={handleSave}
            className={`save-button ${saveSuccess ? "save-success" : ""}`}
            disabled={loading}
          >
            {loading ? "저장 중..." : editId !== null ? "수정하기" : "저장하기"}
          </button>
          {editId !== null && (
            <button className="cancel-button" onClick={handleCancelEdit}>
              취소
            </button>
          )}
        </div>
        <div className="worship-list">
          <h2>저장된 예배 순서</h2>
          {worshipList.length > 0 ? (
            <ul>
              {worshipList.map((item, idx) => (
                <li key={item.docId} className="worship-item">
                  <strong>
                    {idx + 1}. {item.title}
                  </strong>
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
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
    </>
  );
};

export default Admin;
