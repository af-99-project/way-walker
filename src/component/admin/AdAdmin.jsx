import React, { useState, useEffect, useRef } from "react";
import { db, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "../../firbase";
import { query, where } from "firebase/firestore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill Editor 스타일
import "../admincss/AdAdmin.css";

const AdAdmin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [adList, setAdList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const inputRef = useRef(null);
  const editorRef = useRef(null);

  // 추가 이모티콘 배열
  const extraEmojis = ["😂", "😍", "🤔", "👍", "🔥", "🥳", "🙌", "🎂", "💖", "🤩"];

  // Firestore에서 광고 데이터 가져오기 (컬렉션 이름: "ads")
  const fetchData = async () => {
    try {
      const qSnapshot = await getDocs(collection(db, "ads"));
      const dataList = qSnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          docId: docSnap.id,
          id: data.id,
          title: data.title,
          content: data.content,
        };
      });
      setAdList(dataList);
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
    } finally {
      setDataLoading(false);
    }
  };

  // 광고 저장 및 수정
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }
    setLoading(true);
    try {
      if (editId !== null) {
        // 수정하는 경우: 우리가 관리하는 id(editId)를 기준으로 문서를 찾음
        const q = query(collection(db, "ads"), where("id", "==", editId));
        const qSnapshot = await getDocs(q);
        if (!qSnapshot.empty) {
          const docToUpdate = qSnapshot.docs[0];
          await updateDoc(doc(db, "ads", docToUpdate.id), {
            title: title.trim(),
            content: content.trim(),
          });
          alert("수정되었습니다!");
        } else {
          alert("수정할 광고를 찾을 수 없습니다.");
        }
        setEditId(null);
      } else {
        // 새로운 광고 추가: 기존 데이터의 id 중 최대값을 구해서 +1
        const qSnapshot = await getDocs(collection(db, "ads"));
        const idList = qSnapshot.docs.map((docSnap) => docSnap.data().id);
        const validIds = idList.filter((id) => !isNaN(id));
        const maxId = validIds.length > 0 ? Math.max(...validIds) : 0;
        const newId = maxId + 1;
        await addDoc(collection(db, "ads"), {
          title: title.trim(),
          content: content.trim(),
          id: newId, // 광고의 고유 id
        });
        alert("광고가 저장되었습니다!");
      }
      fetchData();
      setTitle("");
      setContent("");
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    } catch (error) {
      console.error("광고 저장 오류:", error);
      alert(`저장 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 광고 삭제
  const handleDelete = async (targetId) => {
    if (editId === targetId) {
      alert("수정 중인 광고는 삭제할 수 없습니다.");
      return;
    }
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const q = query(collection(db, "ads"), where("id", "==", targetId));
      const qSnapshot = await getDocs(q);
      if (!qSnapshot.empty) {
        const docToDelete = qSnapshot.docs[0];
        await deleteDoc(doc(db, "ads", docToDelete.id));
        alert("광고가 삭제되었습니다!");
        fetchData();
      } else {
        alert("삭제할 광고를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("광고 삭제 오류:", error);
      alert(`삭제 중 오류 발생: ${error.message}`);
    }
  };

  // 수정 시작: 선택한 광고 데이터를 입력폼에 로드
  const handleEdit = (ad) => {
    setTitle(ad.title);
    setContent(ad.content);
    setEditId(ad.id);
    if (editorRef.current) {
      editorRef.current.innerHTML = ad.content;
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

  // 이모티콘 삽입 함수: 현재 커서 위치에 이모티콘 삽입 (document.execCommand 사용)
  const insertEmoji = (emoji) => {
    document.execCommand("insertText", false, emoji);
  };

  // 이모티콘 선택 토글
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-title">광고 관리 페이지</h2>

        {/* 입력 폼 섹션 */}
        <div className="form-section">
          <h3 className="form-title">{editId ? "광고 수정" : "광고 추가"}</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="input-field"
          />
          <div
            ref={editorRef}
            contentEditable
            className="editor-field"
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
          ></div>

          {/* 기본 이모티콘 버튼 그룹 */}
          <div className="button-group" style={{ marginBottom: "1rem" }}>
            <button onClick={() => insertEmoji("😊")} className="secondary-button">
              😊
            </button>
            <button onClick={() => insertEmoji("🙏")} className="secondary-button">
              🙏
            </button>
            <button onClick={() => insertEmoji("🎉")} className="secondary-button">
              🎉
            </button>
            <button onClick={toggleEmojiPicker} className="secondary-button">
              {showEmojiPicker ? "숨기기" : "더 보기"}
            </button>
          </div>

          {/* 추가 이모티콘 선택 영역 */}
          {showEmojiPicker && (
            <div
              className="emoji-picker"
              style={{ marginBottom: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
            >
              {[
                "😂",
                "😍",
                "🤔",
                "👍",
                "🔥",
                "🥳",
                "🙌",
                "🎂",
                "💖",
                "🤩",
                "😎",
                "😢",
                "🤯",
                "👏",
                "🎈",
              ].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => insertEmoji(emoji)}
                  className="emoji-button"
                  style={{
                    fontSize: "1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* 저장 및 취소 버튼 */}
          <div className="button-group">
            <button onClick={handleSave} disabled={loading} className="primary-button">
              {loading ? "저장 중..." : editId ? "수정하기" : "저장하기"}
            </button>
            {editId && (
              <button onClick={handleCancelEdit} className="secondary-button">
                취소
              </button>
            )}
          </div>
        </div>

        {/* 광고 목록 섹션 */}
        <div className="list-section">
          <h3 className="list-title">저장된 광고 목록</h3>
          {adList.length > 0 ? (
            <div className="ad-list">
              {adList.map((ad, idx) => (
                <div key={ad.docId} className="ad-item">
                  <h4 className="ad-title">
                    {idx + 1}. {ad.title}
                  </h4>
                  <div className="ad-content" dangerouslySetInnerHTML={{ __html: ad.content }} />
                  <div className="button-group">
                    <button onClick={() => handleEdit(ad)} className="secondary-button">
                      수정
                    </button>
                    <button onClick={() => handleDelete(ad.id)} className="delete-button">
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">저장된 광고가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdAdmin;
