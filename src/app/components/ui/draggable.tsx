import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Tooltip } from "@radix-ui/themes";

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
    <Tooltip content="Drag me into the section at the right!">
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-lg shadow-sm bg-gray-200 cursor-grab"
        {...listeners}
        {...attributes}
      >
        {children}
      </div>
    </Tooltip>
  );

  // Move the dragging element to a portal if it's being dragged
  return isDragging
    ? createPortal(DraggableElement, document.body)
    : DraggableElement;
}
