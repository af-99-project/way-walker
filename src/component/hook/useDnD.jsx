"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export const useDnD = ({ itemIndex, onMove, dragSectionName }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: dragSectionName,
    item: {
      type: dragSectionName,
      draggingItemCurrentIndex: itemIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop && ref.current) {
        onMove(draggedItem.draggingItemCurrentIndex, itemIndex, true);
      }
    },
  });

  const [, drop] = useDrop({
    accept: dragSectionName,
    hover: (draggingItem, monitor) => {
      if (!ref.current || draggingItem.draggingItemCurrentIndex === itemIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const draggedItemRect = {
        left: clientOffset.x,
        right: clientOffset.x + hoverBoundingRect.width,
        top: clientOffset.y,
        bottom: clientOffset.y + hoverBoundingRect.height,
      };

      const overlapX = Math.max(
        0,
        Math.min(hoverBoundingRect.right, draggedItemRect.right) -
          Math.max(hoverBoundingRect.left, draggedItemRect.left),
      );
      const overlapY = Math.max(
        0,
        Math.min(hoverBoundingRect.bottom, draggedItemRect.bottom) -
          Math.max(hoverBoundingRect.top, draggedItemRect.top),
      );

      const overlapArea = overlapX * overlapY;
      const hoverArea = hoverBoundingRect.width * hoverBoundingRect.height;
      const thresholdArea = hoverArea * 0.1;

      if (overlapArea > thresholdArea) {
        onMove(draggingItem.draggingItemCurrentIndex, itemIndex, false);
        draggingItem.draggingItemCurrentIndex = itemIndex;
      }
    },
    drop: (draggedItem) => {
      return onMove(draggedItem.draggingItemCurrentIndex, itemIndex, true);
    },
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
};
