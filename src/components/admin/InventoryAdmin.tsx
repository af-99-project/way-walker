import React, { useState, useEffect } from "react";
import { db, collection, getDocs, doc, updateDoc } from "@/firbase";
import "@/styles/Admin.css";

const InventoryAdmin = () => {
  const [prayerData, setPrayerData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

  const fetchPrayerData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "prayerTopics"));
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        const data = { id: docData.id, ...docData.data() };
        setPrayerData(data);
        setFormData(data);
      }
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchPrayerData();
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
      await updateDoc(doc(db, "prayerTopics", formData.id), {
        title: formData.title,
        description: formData.description,
        personalTitle: formData.personalTitle,
        blessingTitle: formData.blessingTitle,
        blessingContent: formData.blessingContent,
        account: formData.account,
        account2: formData.account2,
      });
      alert("수정이 완료되었습니다!");
      setEditMode(false);
      fetchPrayerData();
    } catch (error) {
      console.error("저장 오류:", error);
    }
  };

  if (!prayerData || !formData) {
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
              <h3 className="ad-title">{prayerData.title}</h3>
              <p className="ad-content">{prayerData.description}</p>
            </div>

            <div className="ad-item">
              <h4 className="ad-title">{prayerData.blessingTitle}</h4>
              <p className="ad-content">{prayerData.blessingContent}</p>
            </div>

            <div className="ad-item">
              <p className="ad-content">{prayerData.account}</p>
            </div>
            <div className="ad-item">
              <p className="ad-content">{prayerData.account2}</p>
            </div>

            <div className="button-group">
              <button className="primary-button" onClick={() => setEditMode(true)}>
                수정하기
              </button>
            </div>
          </div>
        ) : (
          <div className="list-section">
            <FormField label="제목" name="title" defaultValue={formData.title} />
            <FormField
              label="소제목"
              name="description"
              defaultValue={formData.description}
              type="textarea"
            />
            <FormField
              label="축복내용 담당자"
              name="blessingTitle"
              defaultValue={formData.blessingTitle}
            />
            <FormField
              label="축복 제목"
              name="blessingContent"
              defaultValue={formData.blessingContent}
              type="textarea"
            />
            <FormField label="온라인 계좌 정보" name="account" defaultValue={formData.account} />
            <FormField
              label="청년 교육후원 계좌 정보"
              name="account2"
              defaultValue={formData.account2}
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

export default InventoryAdmin;
