import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    zIndex: isDragging ? 1000 : "auto", // Higher z-index when dragging
    position: isDragging ? "fixed" : "relative", // Ensures it is outside overflow container
    pointerEvents: isDragging ? "none" : "auto",
  };

  const DraggableElement = (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg bg-gray-200 cursor-grab"
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );

  // Move the dragging element to a portal if it's being dragged
  return isDragging
    ? createPortal(DraggableElement, document.body)
    : DraggableElement;
}
