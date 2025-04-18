import React, { useState, useEffect, useRef } from "react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
} from "../../firbase";
import { query, orderBy } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../component/admincss/AdAdmin.css";
import DnDExamplePage from "./DnDExamplePage";

const RepresentativeAdminPanel = () => {
  const [startDate, setStartDate] = useState("");
  const [selectedRepresentative, setSelectedRepresentative] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  const [standbyName, setStandbyName] = useState("");
  const [standbyList, setStandbyList] = useState([]);
  const [standbyEditId, setStandbyEditId] = useState(null);
  const [standbyLoading, setStandbyLoading] = useState(false);
  const standbyInputRef = useRef(null);

  const fetchStandby = async () => {
    try {
      const qSnapshot = await getDocs(query(collection(db, "standby"), orderBy("id")));
      const list = qSnapshot.docs.map((docSnap) => ({
        docId: docSnap.id,
        id: docSnap.data().id,
        name: docSnap.data().name,
      }));
      setStandbyList(list);
    } catch (error) {
      console.error("예비 담당자 목록 불러오기 오류:", error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const qSnapshot = await getDocs(query(collection(db, "prayerSchedule"), orderBy("id")));
      const list = qSnapshot.docs.map((docSnap) => ({
        docId: docSnap.id,
        id: docSnap.data().id,
        prayerDate: docSnap.data().prayerDate,
        representative: docSnap.data().representative,
      }));
      setScheduleList(list);
    } catch (error) {
      console.error("대표기도 일정 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchStandby();
    fetchSchedule();
  }, []);

  const getDateForIndex = (baseDate, index) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + index * 7);
    return date.toISOString().split("T")[0];
  };

  const handleAddScheduleItem = async () => {
    if (!startDate || !selectedRepresentative) {
      alert("시작 날짜와 대표기도자를 모두 선택하세요.");
      return;
    }
    setScheduleLoading(true);
    try {
      const idList = scheduleList.map((item) => item.id);
      const maxId = idList.length > 0 ? Math.max(...idList) : 0;
      const newId = maxId + 1;
      const newDate = getDateForIndex(startDate, scheduleList.length);
      await addDoc(collection(db, "prayerSchedule"), {
        id: newId,
        prayerDate: newDate,
        representative: selectedRepresentative,
      });
      alert("일정이 추가되었습니다!");
      fetchSchedule();
      setSelectedRepresentative("");
    } catch (error) {
      console.error("일정 추가 오류:", error);
      alert(`일정 추가 중 오류 발생: ${error.message}`);
    } finally {
      setScheduleLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === "trash") {
      const deletedItem = scheduleList.find((item) => item.docId === draggableId);
      if (!deletedItem) return;
      const confirmed = window.confirm(
        `${deletedItem.prayerDate} - ${deletedItem.representative} 일정을 삭제하시겠습니까?`,
      );
      if (confirmed) {
        try {
          await deleteDoc(doc(db, "prayerSchedule", deletedItem.docId));
          alert("삭제되었습니다!");
          fetchSchedule();
        } catch (error) {
          console.error("삭제 오류:", error);
          alert(`삭제 중 오류 발생: ${error.message}`);
        }
      }
      return;
    }

    const newList = Array.from(scheduleList);
    const [movedItem] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, movedItem);

    const batch = writeBatch(db);
    newList.forEach((item, index) => {
      const newDate = getDateForIndex(startDate, index);
      const scheduleRef = doc(db, "prayerSchedule", item.docId);
      batch.update(scheduleRef, { prayerDate: newDate, id: index + 1 });
    });

    try {
      await batch.commit();
      fetchSchedule();
    } catch (error) {
      console.error("드래그 앤 드롭 오류:", error);
      alert(`업데이트 오류: ${error.message}`);
    }
  };

  const handleStandbySave = async () => {
    if (!standbyName.trim()) {
      alert("이름을 입력하세요.");
      return;
    }
    setStandbyLoading(true);
    try {
      if (standbyEditId) {
        await updateDoc(doc(db, "standby", standbyEditId), { name: standbyName.trim() });
        alert("수정되었습니다!");
        setStandbyEditId(null);
      } else {
        const qSnapshot = await getDocs(collection(db, "standby"));
        const idList = qSnapshot.docs.map((docSnap) => docSnap.data().id);
        const maxId = idList.length > 0 ? Math.max(...idList) : 0;
        await addDoc(collection(db, "standby"), { name: standbyName.trim(), id: maxId + 1 });
        alert("등록되었습니다!");
      }
      fetchStandby();
      setStandbyName("");
    } catch (error) {
      console.error("저장 오류:", error);
      alert(`저장 중 오류 발생: ${error.message}`);
    } finally {
      setStandbyLoading(false);
    }
  };

  const handleStandbyEdit = (item) => {
    setStandbyName(item.name);
    setStandbyEditId(item.docId);
    if (standbyInputRef.current) {
      standbyInputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleStandbyDelete = async (docId, personName) => {
    if (standbyEditId === docId) {
      alert("수정 중인 항목은 삭제할 수 없습니다.");
      return;
    }
    if (!window.confirm(`${personName}님을 삭제하시겠습니까?`)) return;
    try {
      await deleteDoc(doc(db, "standby", docId));
      alert("삭제되었습니다!");
      fetchStandby();
    } catch (error) {
      console.error("삭제 오류:", error);
      alert(`삭제 중 오류 발생: ${error.message}`);
    }
  };

  const handleStandbyCancel = () => {
    setStandbyName("");
    setStandbyEditId(null);
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-title">대표기도 및 담당자 관리</h2>
        <div className="dual-section">
          <DnDExamplePage></DnDExamplePage>
          <div className="left-section">
            <h3 className="form-title">대표기도 일정 관리</h3>
            <div className="form-section">
              <div>
                <label>시작 날짜(일요일): </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label>대표기도자 선택: </label>
                <select
                  value={selectedRepresentative}
                  onChange={(e) => setSelectedRepresentative(e.target.value)}
                  className="input-field"
                >
                  <option value="">-- 선택 --</option>
                  {standbyList.map((person) => (
                    <option key={person.docId} value={person.name}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddScheduleItem}
                disabled={scheduleLoading}
                className="primary-button"
              >
                {scheduleLoading ? "저장 중..." : "일정 추가"}
              </button>
            </div>

            <div className="list-section">
              <h3 className="list-title">대표기도 일정 목록</h3>
              <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Droppable droppableId="scheduleList">
                    {(provided) => (
                      <ul className="ad-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {scheduleList.map((item, index) => (
                          <Draggable key={item.docId} draggableId={item.docId} index={index}>
                            {(provided, snapshot) => (
                              <li
                                className={`ad-item ${snapshot.isDragging ? "dragging" : ""}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <strong>{item.prayerDate}</strong> - {item.representative}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>

                  <Droppable droppableId="trash">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`ad-trash ${snapshot.isDraggingOver ? "drag-over" : ""}`}
                      >
                        🗑️ 휴지통
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
            </div>
          </div>

          <div className="right-section" style={{ flex: 1 }}>
            <h3 className="form-title">예비 담당자 관리</h3>
            <div className="form-section" ref={standbyInputRef}>
              <input
                type="text"
                value={standbyName}
                onChange={(e) => setStandbyName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="input-field"
              />
              <div className="button-group">
                <button
                  onClick={handleStandbySave}
                  disabled={standbyLoading}
                  className="primary-button"
                >
                  {standbyLoading ? "저장 중..." : standbyEditId ? "수정하기" : "등록하기"}
                </button>
                {standbyEditId && (
                  <button onClick={handleStandbyCancel} className="secondary-button">
                    취소
                  </button>
                )}
              </div>
            </div>

            <div className="list-section">
              <h3 className="list-title">예비 담당자 목록</h3>
              <ul className="ad-list">
                {standbyList.map((item) => (
                  <li key={item.docId} className="ad-item">
                    {item.name}
                    <div className="button-group" style={{ marginTop: "1rem" }}>
                      <button onClick={() => handleStandbyEdit(item)} className="secondary-button">
                        수정
                      </button>
                      <button
                        onClick={() => handleStandbyDelete(item.docId, item.name)}
                        className="delete-button"
                      >
                        삭제
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepresentativeAdminPanel;
