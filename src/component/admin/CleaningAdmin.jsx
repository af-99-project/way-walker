import React, { useState, useEffect } from "react";
import { db, collection, getDocs, doc, updateDoc } from "../../firbase";
import "../admincss/AdAdmin.css";

const CleaningAdmin = () => {
  const [cleaningData, setCleaningData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

  const fetchCleaningData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cleaning"));
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        const data = { id: docData.id, ...docData.data() };
        console.log("불러온 데이터:", data);
        setCleaningData(data);
        setFormData(data);
      }
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchCleaningData();
  }, []);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData?.id) return;
    try {
      await updateDoc(doc(db, "cleaning", formData.id), {
        thisMonth: formData.thisMonth,
        nextMonth: formData.nextMonth,
      });
      alert("수정이 완료되었습니다!");
      setEditMode(false);
      fetchCleaningData();
    } catch (error) {
      console.error("저장 오류:", error);
    }
  };

  if (!cleaningData || !formData) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  const FormField = ({ label, name, defaultValue, type = "input" }) => (
    <div className="form-section">
      <label htmlFor={name} className="form-title">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          onBlur={handleBlur}
          placeholder={`${label}을 입력하세요`}
          className="editor-field"
        />
      ) : (
        <input
          id={name}
          type="text"
          name={name}
          defaultValue={defaultValue}
          onBlur={handleBlur}
          placeholder={`${label}을 입력하세요`}
          className="input-field"
        />
      )}
    </div>
  );

  return (
    <div className="admin-container">
      <div className="admin-content">
        {!editMode ? (
          <div className="list-section">
            <div className="ad-item">
              <h3 className="ad-title">이번달 정리섬김마을</h3>
              <p className="ad-content">{cleaningData.thisMonth}</p>
            </div>

            <div className="ad-item">
              <h3 className="ad-title">다음달 정리섬김마을</h3>
              <p className="ad-content">{cleaningData.nextMonth}</p>
            </div>

            <div className="button-group">
              <button className="primary-button" onClick={() => setEditMode(true)}>
                수정하기
              </button>
            </div>
          </div>
        ) : (
          <div className="list-section">
            <FormField label="이번달청소" name="thisMonth" defaultValue={formData.thisMonth} />
            <FormField
              label="다음달청소"
              name="nextMonth"
              defaultValue={formData.nextMonth}
              type="textarea"
            />

            <div className="button-group">
              <button className="primary-button" onClick={handleSave}>
                저장하기
              </button>
              <button className="secondary-button" onClick={() => setEditMode(false)}>
                취소하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CleaningAdmin;
