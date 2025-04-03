import React, { useState, useEffect, useRef } from "react";
import { db, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "../../firbase";
import { query, where, orderBy } from "firebase/firestore";
import EmojiPicker from "emoji-picker-react";

const AdAdmin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [adList, setAdList] = useState([]);
  const [editId, setEditId] = useState(null); // Firestore 문서 ID를 저장
  const [dataLoading, setDataLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const inputRef = useRef(null);

  // Firestore에서 광고 데이터 가져오기 (id 값이 높은 순서대로 정렬)
  const fetchData = async () => {
    try {
      const qSnapshot = await getDocs(query(collection(db, "ads"), orderBy("id" )));
      const dataList = qSnapshot.docs.map((docSnap) => ({
        docId: docSnap.id,
        id: docSnap.data().id,
        title: docSnap.data().title,
        content: docSnap.data().content,
      }));
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
        // 수정하는 경우: Firestore 문서 ID를 기반으로 수정
        await updateDoc(doc(db, "ads", editId), {
          title: title.trim(),
          content: content.trim(),
        });
        alert("수정되었습니다!");
        setEditId(null);
      } else {
        // 새로운 광고 추가: 기존 데이터 중 가장 큰 id 값 찾기
        const qSnapshot = await getDocs(collection(db, "ads"));
        const idList = qSnapshot.docs.map((docSnap) => docSnap.data().id);
        const maxId = idList.length > 0 ? Math.max(...idList) : 0;
        const newId = maxId + 1;

        await addDoc(collection(db, "ads"), {
          title: title.trim(),
          content: content.trim(),
          id: newId, // 새로운 id 값 설정
        });
        alert("광고가 저장되었습니다!");
      }
      fetchData();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("광고 저장 오류:", error);
      alert(`저장 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 광고 삭제
  const handleDelete = async (docId) => {
    if (editId === docId) {
      alert("수정 중인 광고는 삭제할 수 없습니다.");
      return;
    }
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, "ads", docId));
      alert("광고가 삭제되었습니다!");
      fetchData();
    } catch (error) {
      console.error("광고 삭제 오류:", error);
      alert(`삭제 중 오류 발생: ${error.message}`);
    }
  };

  // 수정 시작 (Firestore 문서 ID 기반)
  const handleEdit = (ad) => {
    setTitle(ad.title);
    setContent(ad.content);
    setEditId(ad.docId); // Firestore 문서 ID 저장
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setTitle("");
    setContent("");
    setEditId(null);
  };

  // 이모티콘 선택 핸들러
  const handleEmojiClick = (emojiObject) => {
    setContent((prev) => prev + emojiObject.emoji); // 선택한 이모티콘을 내용에 추가
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

        {/* 입력 폼 섹션 - ref 추가 */}
        <div className="form-section" ref={inputRef}>
          <h3 className="form-title">{editId ? "광고 수정" : "광고 추가"}</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="input-field"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            className="editor-field"
          ></textarea>

          {/* 이모티콘 선택기 버튼 */}
          <button
            type="button"
            className="emoji-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            {showEmojiPicker ? "❌ 이모티콘 닫기" : "😀 이모티콘 추가"}
          </button>
          {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}

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
                  <p className="ad-content" style={{ whiteSpace: "pre-wrap" }}>
                    {ad.content}
                  </p>

                  <div className="button-group">
                    <button onClick={() => handleEdit(ad)} className="secondary-button">
                      수정
                    </button>
                    <button onClick={() => handleDelete(ad.docId)} className="delete-button">
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
