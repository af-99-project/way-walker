import React, { useState, useEffect, useRef } from "react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  writeBatch,
} from "../../firbase";
import { query, orderBy } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MemberList = ({ members, setMembers }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(members);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMembers(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="members">
        {(provided) => (
          <div className="report-list" {...provided.droppableProps} ref={provided.innerRef}>
            {members.map((member, index) => (
              <Draggable key={member.id} draggableId={member.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`report-item ${snapshot.isDragging ? "dragging" : ""}`}
                  >
                    <span>{member.name}</span>
                    <span>☰</span> {/* 드래그 손잡이 아이콘 */}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const MemberAdmin = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const inputRef = useRef(null);

  // Firestore에서 임원 데이터 가져오기 (id 내림차순)
  const fetchData = async () => {
    try {
      const qSnapshot = await getDocs(query(collection(db, "member"), orderBy("id")));
      const dataList = qSnapshot.docs.map((docSnap) => ({
        docId: docSnap.id,
        id: docSnap.data().id,
        name: docSnap.data().name,
      }));
      setReportList(dataList);
    } catch (error) {
      console.error("데이터 불러오기 오류:", error);
    } finally {
      setDataLoading(false);
    }
  };

  // 임원 추가/수정 (중복 체크 포함)
  const handleSave = async () => {
    if (!name.trim()) {
      alert("이름을 입력하세요.");
      return;
    }
    // 신규 등록인 경우 중복 체크
    if (editId === null && reportList.some((member) => member.name === name.trim())) {
      alert(`${name.trim()}님은 이미 등록 돼 있습니다`);
      return;
    }
    setLoading(true);
    try {
      if (editId !== null) {
        await updateDoc(doc(db, "member", editId), { name: name.trim() });
        alert(`${name.trim()}님이 수정되었습니다!`);
        setEditId(null);
      } else {
        // 신규 등록 시 기존 데이터에서 가장 큰 id값을 찾아 +1
        const qSnapshot = await getDocs(collection(db, "member"));
        const idList = qSnapshot.docs.map((docSnap) => docSnap.data().id);
        const maxId = idList.length > 0 ? Math.max(...idList) : 0;
        const newId = maxId + 1;
        await addDoc(collection(db, "member"), { name: name.trim(), id: newId });
        alert(`${name.trim()}님이 추가되었습니다!`);
      }
      fetchData();
      setName("");
    } catch (error) {
      console.error("저장 오류:", error);
      alert(`저장 중 오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 임원 삭제
  const handleDelete = async (docId, memberName) => {
    if (editId === docId) {
      alert("수정 중인 임원은 삭제할 수 없습니다.");
      return;
    }
    if (!window.confirm(`${memberName}님을 삭제하겠습니까?`)) return;
    try {
      await deleteDoc(doc(db, "member", docId));
      alert(`${memberName}님이 삭제되었습니다!`);
      fetchData();
    } catch (error) {
      console.error("삭제 오류:", error);
      alert(`삭제 중 오류 발생: ${error.message}`);
    }
  };

  // 수정 시작: 선택한 임원 정보를 입력폼에 채워 넣음
  const handleEdit = (report) => {
    setName(report.name);
    setEditId(report.docId);
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setName("");
    setEditId(null);
  };

  // 엔터키로 저장 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  // 드래그앤드롭 완료 후 순서(id) 업데이트 (batch 사용)
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(reportList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setReportList(items); // UI 업데이트

    try {
      const batch = writeBatch(db);
      items.forEach((item, index) => {
        const memberRef = doc(db, "member", item.docId);
        batch.update(memberRef, { id: index + 1 }); // Firestore 순서 업데이트
      });
      await batch.commit();
      fetchData(); // Firestore에서 다시 불러오기
    } catch (error) {
      console.error("순서 업데이트 오류:", error);
      alert(`순서 업데이트 중 오류 발생: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataLoading) return <p>Loading...</p>;

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-title">임원 관리 페이지</h2>
        <div className="form-section" ref={inputRef}>
          <h3 className="form-title">{editId ? "임원 수정" : "임원 추가"}</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="이름을 입력하세요"
            className="input-field"
          />
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
        <div className="list-section">
          <h3 className="list-title">임원 목록</h3>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="reportList">
              {(provided) => (
                <div className="report-list" {...provided.droppableProps} ref={provided.innerRef}>
                  {reportList.map((report, index) => (
                    <Draggable key={report.docId} draggableId={report.docId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="report-item"
                        >
                          <h4 className="report-title">
                            {index + 1}. {report.name}
                          </h4>
                          <div className="button-group">
                            <button onClick={() => handleEdit(report)} className="secondary-button">
                              수정
                            </button>
                            <button
                              onClick={() => handleDelete(report.docId, report.name)}
                              className="delete-button"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {reportList.length === 0 && (
            <p className="text-center text-gray-500 py-8">저장된 임원이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberAdmin;
