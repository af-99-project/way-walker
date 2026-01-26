"use client";

/*
  ** 드래그앤드랍 예제파일 **

  * react-dnd-html5-backend 관련 에러뜰경우
  패키지 인스톨필요 "yarn add react-dnd-html5-backend"

  * 만약 DnDWrapper안에 컴포넌트를 칠드런으로 넘길경우 forwardRef사용 필수
*/

import React, { useState } from "react";
import { DnDWrapper } from "@/components/admin/DnDWrapper";

const DnDExamplePage = () => {
  const [initialItems, _] = useState([
    { id: "1~", text: "DnD 예시아이템1" },
    { id: "2~", text: "DnD 예시아이템2" },
    { id: "3~", text: "DnD 예시아이템3" },
    { id: "4~", text: "DnD 예시아이템4" },
    { id: "5~", text: "DnD 예시아이템5" },
    { id: "6~", text: "???" },
    { id: "7~", text: "@@@" },
  ]);

  const whenDragging = (newList) => {
    // console.log("!드래그중일떄", newList);
  };

  const whenDragEnd = (newList) => {
    console.log("@드래그끝났을떄", newList);
  };

  return (
    <>
      <div>DnD 예제코드.</div>
      <div className="flex justify-around">
        <div className="border border-gray-950 mb-10">
          {/* 1. 바로 드래깅할 아이템 태그를 직접 넣을때 */}
          <DnDWrapper
            dragList={initialItems}
            onDragging={whenDragging}
            onDragEnd={whenDragEnd}
            dragSectionName={"abc"}
          >
            {(dragItem, ref, isDragging) => (
              <li
                ref={ref}
                className={`p-2 border border-blue-700 m-2 ${isDragging ? "opacity-20" : ""}`}
              >
                <p>{dragItem.id}</p>
                <p>{dragItem.text}</p>
              </li>
            )}
          </DnDWrapper>
        </div>

        <div className="border border-gray-950">
          {/* 2. 컴포넌트를 칠드런으로 넣을때 (ref 전달 위해 forwardRef 필수) */}
          <DnDWrapper
            dragList={initialItems}
            onDragging={whenDragging}
            onDragEnd={whenDragEnd}
            dragSectionName={"def"}
          >
            {(dragItem, ref, isDragging) => (
              <DnDTestComponent
                dragData={dragItem}
                ref={ref}
                isDragging={isDragging}
                zxzx="다른프롭스내려봄"
                yzyz="또다른프롭스내려봄"
              />
            )}
          </DnDWrapper>
        </div>
      </div>
    </>
  );
};

export default DnDExamplePage;

// 드래그 가능 아이템용 자식 컴포넌트
const DnDTestComponent = React.forwardRef((props, ref) => {
  const { dragData, isDragging, zxzx, yzyz } = props;

  return (
    <li ref={ref} className={`p-2 border border-red m-2 ${isDragging ? "opacity-20" : ""}`}>
      <p>{dragData.id}</p>
      <div>{yzyz}</div>
      {/* <div>{zxzx}</div> */}
    </li>
  );
});
