import React, { useState, useEffect, useRef } from "react";
import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, writeBatch } from "@/firbase";
import { query, orderBy } from "firebase/firestore";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "@/components/admincss/AdAdmin.css";

/** =========================
 *  Date Utils (Sunday-based)
 *  ========================= */

// YYYY-MM-DD → local Date (UTC 파싱 이슈 방지)
const toLocalDate = (yyyyMMdd) => {
  const [y, m, d] = yyyyMMdd.split("-").map(Number);
  return new Date(y, m - 1, d);
};

// Date → YYYY-MM-DD
const toYMD = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// 입력 날짜를 그 주 "일요일"로 보정
const normalizeToSunday = (yyyyMMdd) => {
  const date = toLocalDate(yyyyMMdd);
  const day = date.getDay(); // 0=일요일
  date.setDate(date.getDate() - day);
  return toYMD(date);
};

// 이번 주 일요일 YYYY-MM-DD
const getThisWeekSundayYMD = () => {
  const now = new Date();
  const day = now.getDay();
  const sunday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  sunday.setDate(sunday.getDate() - day);
  return toYMD(sunday);
};

// MovableItem 컴포넌트: 드래그 가능한 항목 (일정 또는 예비 담당자)
const MovableItem = ({
  item,
  index,
  type,
  moveItemHandler,
  deleteItemHandler,
  onStandbyReplace,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: [type, "STANDBY_ITEM"],
    drop: (droppedItem) => {
      if (droppedItem.type === "STANDBY_ITEM" && type === "SCHEDULE_ITEM" && onStandbyReplace) {
        console.log(`Replacing schedule item ${item.docId} with standby ${droppedItem.docId}`);
        onStandbyReplace(droppedItem.docId, item.docId); // 예비 담당자로 일정 교체
      }
    },
    hover(draggedItem, monitor) {
      if (draggedItem.type !== type) return; // 동일 타입만 순서 변경
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveItemHandler(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type,
    item: { index, docId: item.docId, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`ad-item ${isDragging ? "dragging" : ""}`}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      {type === "SCHEDULE_ITEM" ? (
        <>
          <strong>{item.prayerDate}</strong> - {item.representative}
        </>
      ) : (
        <>
          {item.name}
          <div className="button-group" style={{ marginTop: "0.5rem" }}>
            <button
              onClick={() => deleteItemHandler(item.docId, "edit")}
              className="secondary-button"
              style={{ fontSize: "0.8rem", padding: "0.2rem 0.5rem" }}
            >
              수정
            </button>
            <button
              onClick={() => deleteItemHandler(item.docId, "delete")}
              className="delete-button"
              style={{ fontSize: "0.8rem", padding: "0.2rem 0.5rem" }}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
};

// DroppableList 컴포넌트: 드롭 가능한 목록 (일정 또는 예비 담당자)
const DroppableList = ({ list, type, moveItemHandler, deleteItemHandler, onStandbyReplace }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ["SCHEDULE_ITEM", "STANDBY_ITEM"],
    drop: () => {
      // 드롭 이벤트는 MovableItem에서 처리하므로 여기서는 아무 동작도 하지 않음
      console.log(`Dropped on ${type} list, handled by MovableItem`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <ul
      ref={drop}
      className="ad-list"
      style={{ backgroundColor: isOver ? "rgb(188,251,255)" : "", minHeight: "100px" }}
    >
      {list.length === 0 ? (
        <li className="ad-item">목록이 비어 있습니다.</li>
      ) : (
        list.map((item, index) => (
          <MovableItem
            key={item.docId}
            item={item}
            index={index}
            type={type}
            moveItemHandler={moveItemHandler}
            deleteItemHandler={deleteItemHandler}
            onStandbyReplace={type === "SCHEDULE_ITEM" ? onStandbyReplace : undefined}
          />
        ))
      )}
    </ul>
  );
};

// Trash 컴포넌트: 삭제를 위한 드롭 영역
const Trash = ({ onScheduleDrop, onStandbyDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ["SCHEDULE_ITEM", "STANDBY_ITEM"],
    drop: (item) => {
      if (item.type === "SCHEDULE_ITEM") {
        onScheduleDrop(item.docId);
      } else if (item.type === "STANDBY_ITEM") {
        onStandbyDrop(item.docId);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`ad-trash ${isOver ? "drag-over" : ""}`}
      style={{
        backgroundColor: isOver ? "rgb(255,188,188)" : "",
      }}
    >
      🗑️ 휴지통
    </div>
  );
};

// 메인 컴포넌트
const RepresentativeAdminPanel = () => {
  // ✅ 자동 세팅: 이번 주 일요일
  const [startDate, setStartDate] = useState(getThisWeekSundayYMD());

  const [selectedRepresentative, setSelectedRepresentative] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [standbyName, setStandbyName] = useState("");
  const [standbyList, setStandbyList] = useState([]);
  const [standbyEditId, setStandbyEditId] = useState(null);
  const [standbyLoading, setStandbyLoading] = useState(true);
  const [error, setError] = useState(null);
  const standbyInputRef = useRef(null);

  const fetchStandby = async () => {
    try {
      setStandbyLoading(true);
      const qSnapshot = await getDocs(query(collection(db, "standby"), orderBy("id")));
      const list = qSnapshot.docs.map((docSnap) => ({
        docId: docSnap.id,
        id: docSnap.data().id,
        name: docSnap.data().name,
      }));
      console.log("Fetched standby list:", list);
      setStandbyList(list);
    } catch (error) {
      console.error("예비 담당자 목록 불러오기 오류:", error);
      setError("예비 담당자 목록을 불러오는 데 실패했습니다.");
    } finally {
      setStandbyLoading(false);
    }
  };

  const fetchSchedule = async () => {
    try {
      setScheduleLoading(true);
      const qSnapshot = await getDocs(query(collection(db, "prayerSchedule"), orderBy("id")));
      const list = qSnapshot.docs.map((docSnap) => ({
        docId: docSnap.id,
        id: docSnap.data().id,
        prayerDate: docSnap.data().prayerDate,
        representative: docSnap.data().representative,
      }));
      console.log("Fetched schedule list:", list);
      setScheduleList(list);
    } catch (error) {
      console.error("대표기도 일정 불러오기 오류:", error);
      setError("대표기도 일정 목록을 불러오는 데 실패했습니다.");
    } finally {
      setScheduleLoading(false);
    }
  };

  useEffect(() => {
    fetchStandby();
    fetchSchedule();
  }, []);

  // ✅ 일요일 기준 + 7일 간격 + UTC 밀림 방지
  const getDateForIndex = (baseDate, index) => {
    const base = baseDate ? normalizeToSunday(baseDate) : getThisWeekSundayYMD();
    const date = toLocalDate(base);
    date.setDate(date.getDate() + index * 7);
    return toYMD(date);
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
      console.log(`Added schedule: ${newDate} - ${selectedRepresentative}`);
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

  const moveScheduleHandler = async (dragIndex, hoverIndex) => {
    const newList = Array.from(scheduleList);
    const [movedItem] = newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, movedItem);

    setScheduleList(newList);

    // ✅ 기준 날짜 확정 (startDate가 없으면 첫 항목의 prayerDate)
    const baseDate = startDate || newList[0]?.prayerDate || getThisWeekSundayYMD();

    const batch = writeBatch(db);
    newList.forEach((item, index) => {
      const newDate = getDateForIndex(baseDate, index);
      const scheduleRef = doc(db, "prayerSchedule", item.docId);
      batch.update(scheduleRef, { prayerDate: newDate, id: index + 1 });
    });

    try {
      await batch.commit();
      console.log("Schedule order updated");
      fetchSchedule();
    } catch (error) {
      console.error("드래그 앤 드롭 오류:", error);
      alert(`업데이트 오류: ${error.message}`);
    }
  };

  const moveStandbyHandler = async (dragIndex, hoverIndex) => {
    const newList = Array.from(standbyList);
    const [movedItem] = newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, movedItem);

    setStandbyList(newList);

    const batch = writeBatch(db);
    newList.forEach((item, index) => {
      const standbyRef = doc(db, "standby", item.docId);
      batch.update(standbyRef, { id: index + 1 });
    });

    try {
      await batch.commit();
      console.log("Standby order updated");
      fetchStandby();
    } catch (error) {
      console.error("예비 담당자 드래그 앤 드롭 오류:", error);
      alert(`업데이트 오류: ${error.message}`);
    }
  };

  const handleScheduleDelete = async (docId) => {
    const deletedItem = scheduleList.find((item) => item.docId === docId);
    if (!deletedItem) return;
    const confirmed = window.confirm(
      `${deletedItem.prayerDate} - ${deletedItem.representative} 일정을 삭제하시겠습니까?`,
    );
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "prayerSchedule", docId));
        console.log(`Deleted schedule ${docId}`);
        alert("삭제되었습니다!");
        fetchSchedule();
      } catch (error) {
        console.error("삭제 오류:", error);
        alert(`삭제 중 오류 발생: ${error.message}`);
      }
    }
  };

  const handleStandbyAction = async (docId, action) => {
    if (action === "edit") {
      const item = standbyList.find((item) => item.docId === docId);
      setStandbyName(item.name);
      setStandbyEditId(item.docId);
      if (standbyInputRef.current) {
        standbyInputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (action === "delete") {
      if (standbyEditId === docId) {
        alert("수정 중인 항목은 삭제할 수 없습니다.");
        return;
      }
      const item = standbyList.find((item) => item.docId === docId);
      if (!window.confirm(`${item.name}님을 삭제하시겠습니까?`)) return;
      try {
        await deleteDoc(doc(db, "standby", docId));
        console.log(`Deleted standby ${docId}`);
        alert("삭제되었습니다!");
        fetchStandby();
      } catch (error) {
        console.error("삭제 오류:", error);
        alert(`삭제 중 오류 발생: ${error.message}`);
      }
    }
  };

  const handleStandbyReplace = async (standbyDocId, scheduleDocId) => {
    const standbyItem = standbyList.find((item) => item.docId === standbyDocId);
    const scheduleItem = scheduleList.find((item) => item.docId === scheduleDocId);
    if (!standbyItem || !scheduleItem) return;

    const confirmed = window.confirm(
      `${scheduleItem.prayerDate} 예배를 ${scheduleItem.representative} -> ${standbyItem.name}로 수정하겠습니까?`,
    );
    if (!confirmed) {
      console.log("Replacement cancelled by user");
      return; // 취소 시 즉시 종료
    }

    try {
      const scheduleRef = doc(db, "prayerSchedule", scheduleDocId);
      await updateDoc(scheduleRef, { representative: standbyItem.name });
      console.log(`Replaced schedule ${scheduleDocId} with ${standbyItem.name}`);
      alert("일정이 수정되었습니다!");
      fetchSchedule();
    } catch (error) {
      console.error("일정 수정 오류:", error);
      alert(`일정 수정 중 오류 발생: ${error.message}`);
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
        console.log(`Updated standby ${standbyEditId}`);
        alert("수정되었습니다!");
        setStandbyEditId(null);
      } else {
        const qSnapshot = await getDocs(collection(db, "standby"));
        const idList = qSnapshot.docs.map((docSnap) => docSnap.data().id);
        const maxId = idList.length > 0 ? Math.max(...idList) : 0;
        await addDoc(collection(db, "standby"), { name: standbyName.trim(), id: maxId + 1 });
        console.log(`Added standby ${standbyName}`);
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

  const handleStandbyCancel = () => {
    setStandbyName("");
    setStandbyEditId(null);
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      handleStandbySave();
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-title">대표기도 및 담당자 관리</h2>
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
        {(scheduleLoading || standbyLoading) && <div>로딩 중...</div>}
        <div className="dual-section">
          <div className="left-section">
            <div className="form-section">
              <h3 className="form-title">대표기도 일정 관리</h3>
              <div>
                <label>시작 날짜(일요일): </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(normalizeToSunday(e.target.value))}
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

            <div className="right-section" style={{ flex: 1 }}>
              <div className="form-section" ref={standbyInputRef}>
                <h3 className="form-title">예비 담당자 관리</h3>
                <input
                  type="text"
                  value={standbyName}
                  onChange={(e) => setStandbyName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  onKeyDown={(e) => activeEnter(e)}
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
            </div>

            <div className="list-section dropList" style={{ display: "flex", gap: "2rem" }}>
              <div style={{ flex: 1 }}>
                <h3 className="list-title">대표기도 일정 목록</h3>

                <DndProvider backend={HTML5Backend}>
                  <div className="listWrap">
                    <DroppableList
                      list={scheduleList}
                      type="SCHEDULE_ITEM"
                      moveItemHandler={moveScheduleHandler}
                      deleteItemHandler={handleScheduleDelete}
                      onStandbyReplace={handleStandbyReplace}
                    />
                    <DroppableList
                      list={standbyList}
                      type="STANDBY_ITEM"
                      moveItemHandler={moveStandbyHandler}
                      deleteItemHandler={handleStandbyAction}
                    />
                    <Trash
                      onScheduleDrop={handleScheduleDelete}
                      onStandbyDrop={(docId) => handleStandbyAction(docId, "delete")}
                    />
                  </div>
                </DndProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepresentativeAdminPanel;
