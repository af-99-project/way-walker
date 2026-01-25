import React, { useState, useEffect, useRef } from "react";
import { db, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "@/firbase";
import { query, where, orderBy } from "firebase/firestore";
import "@/components/admincss/AdAdmin.css"; //admincss/AdAdmin.css

const DongguriAdmin = () => {
  const [villageName, setVillageName] = useState("");
  const [chief, setChief] = useState("");
  const [members, setMembers] = useState("");
  const [loading, setLoading] = useState(false);
  const [villageList, setVillageList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const inputRef = useRef(null);

  // 🔹 Firestore에서 마을 데이터 가져오기 (id 기준 내림차순 정렬 후 순서 반전)
  const fetchData = async () => {
    try {
      const qSnapshot = await getDocs(query(collection(db, "team"), orderBy("id", "desc")));
      const dataList = qSnapshot.docs.map((docSnap) => ({
        docId: docSnap.id,
        id: docSnap.data().id,
        villageName: docSnap.data().villageName,
        chief: docSnap.data().chief,
        members: docSnap.data().members,
      }));
      setVillageList(dataList.reverse()); // 최신 마을이 아래에 표시되도록
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
    } finally {
      setDataLoading(false);
    }
  };

  // 🔹 마을 저장 및 수정
  const handleSave = async () => {
    if (!villageName.trim() || !chief.trim() || !members.trim()) {
      alert("마을 이름, 촌장, 마을원을 모두 입력하세요.");
      return;
    }
    setLoading(true);
    try {
      if (editId !== null) {
        // 수정하는 경우
        const q = query(collection(db, "team"), where("id", "==", Number(editId)));
        const qSnapshot = await getDocs(q);

        if (!qSnapshot.empty) {
          const docToUpdate = qSnapshot.docs[0];
          await updateDoc(doc(db, "team", docToUpdate.id), {
            villageName: villageName.trim(),
            chief: chief.trim(),
            members: members.trim(),
          });
          alert("수정되었습니다!");
        } else {
          alert("수정할 마을을 찾을 수 없습니다.");
        }
        setEditId(null);
      } else {
        // 새로운 마을 추가: 기존 데이터 중 가장 큰 id 값 찾기
        const qSnapshot = await getDocs(collection(db, "team"));
        const idList = qSnapshot.docs.map((docSnap) => docSnap.data().id);
        const maxId = idList.length > 0 ? Math.max(...idList) : 0;
        const newId = maxId + 1;
        await addDoc(collection(db, "team"), {
          villageName: villageName.trim(),
          chief: chief.trim(),
          members: members.trim(),
          id: newId, // 새로운 id 값 설정
        });
        alert(`${villageName.trim()} 마을이 생성되었습니다!`);
      }
      await fetchData();
      setVillageName("");
      setChief("");
      setMembers("");
    } catch (error) {
      console.error("마을 저장 오류:", error);
      alert(`저장 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 마을 삭제 (마을 이름도 함께 받아서 사용)
  const handleDelete = async (targetId, villageName) => {
    if (editId === targetId) {
      alert("수정 중인 마을은 삭제할 수 없습니다.");
      return;
    }
    if (!window.confirm(`${villageName}마을 삭제하시겠습니까?`)) return;
    try {
      const q = query(collection(db, "team"), where("id", "==", targetId));
      const qSnapshot = await getDocs(q);
      if (!qSnapshot.empty) {
        const docToDelete = qSnapshot.docs[0];
        await deleteDoc(doc(db, "team", docToDelete.id));
        alert(`${villageName}마을이 삭제되었습니다!`);
        fetchData();
      } else {
        alert("삭제할 마을를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("마을 삭제 오류:", error);
      alert(`삭제 중 오류 발생: ${error.message}`);
    }
  };

  // 🔹 수정 시작 (입력창으로 스크롤 이동)
  const handleEdit = (village) => {
    setVillageName(village.villageName);
    setChief(village.chief);
    setMembers(village.members);
    setEditId(village.id);

    // 입력창으로 스크롤 이동
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 🔹 수정 취소
  const handleCancelEdit = () => {
    setVillageName("");
    setChief("");
    setMembers("");
    setEditId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-container-wrap">
      <div className="admin-content">
        <h2 className="admin-title">동그리마을 관리 페이지</h2>

        {/* 입력 폼 섹션 */}
        <div className="form-section" ref={inputRef}>
          <h3 className="form-title">{editId ? "마을 수정" : "마을 추가"}</h3>
          <input
            type="text"
            value={villageName}
            onChange={(e) => setVillageName(e.target.value)}
            placeholder="마을 이름을 입력하세요"
            className="input-field"
          />
          <input
            type="text"
            value={chief}
            onChange={(e) => setChief(e.target.value)}
            placeholder="촌장을 입력하세요"
            className="input-field chief-glow"
          />
          <input
            type="text"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            placeholder="마을원을 입력하세요 (쉼표로 구분)"
            className="input-field"
          />

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

        {/* 마을 목록 섹션 */}
        <div className="list-section">
          <h3 className="list-title">등록된 마을 목록</h3>
          {villageList.length > 0 ? (
            <div className="village-list">
              {villageList.map((village, idx) => (
                <div key={village.docId} className="village-item">
                  <h4 className="village-title">
                    {idx + 1}. {village.villageName}
                  </h4>
                  <p className="chief-glow">촌장: {village.chief}</p>
                  <p>마을원: {village.members}</p>
                  <div className="button-group">
                    <button onClick={() => handleEdit(village)} className="secondary-button">
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(village.id, village.villageName)}
                      className="delete-button"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">등록된 마을이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DongguriAdmin;
