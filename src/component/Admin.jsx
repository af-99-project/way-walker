import React, { useState } from "react";
import { db, collection, addDoc, getDocs } from "../firbase";
import Header from "../component/Header";
import BottomNav from "../component/BottomNav";
import FixBtn from "../component/FixBtn";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Firestore에서 현재 문서 개수를 가져와 ID 설정
  const getNextId = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "worship_info"));
      return querySnapshot.size + 1; // 현재 개수 + 1 = 다음 ID
    } catch (error) {
      console.error("Firestore 문서 개수 조회 오류:", error);
      return 1; // 기본값 1 반환
    }
  };

  // Firestore에 데이터 저장
  const handleSave = async () => {
    if (!title || !content) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    setLoading(true);

    try {
      const nextId = await getNextId(); // 자동 ID 가져오기
      console.log("생성된 ID:", nextId); // 디버깅용 콘솔 출력

      await addDoc(collection(db, "worship_info"), {
        id: nextId,
        title,
        content,
        createdAt: new Date(),
      });

      alert("저장되었습니다!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Firestore 저장 오류:", error);
      alert(`저장 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="content p-6">
        <h1 className="text-2xl font-bold mb-4">예배 정보 입력</h1>

        <div className="mb-4">
          <label className="block text-gray-700">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="제목 입력"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="내용 입력"
          />
        </div>

        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "저장 중..." : "저장"}
        </button>
      </div>

      <FixBtn />
      <BottomNav />
    </>
  );
};

export default Admin;
