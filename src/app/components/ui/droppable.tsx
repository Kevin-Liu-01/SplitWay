import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver ? "border-blue-400 bg-blue-200" : "border-gray-400 bg-gray-200"
      }
       border z-20 transition-all rounded-lg relative border-dashed w-full h-full`}
    >
      <div
        className="absolute inset-0 bg-[url('/images/graybg.jpg')] opacity-10 bg-repeat bg-[auto_150px]
 rounded-lg z-10"
      ></div>
      <div className="grid p-3 grid-cols-3 h-screen sm:h-min max-h-full overflow-x-scroll gap-4 ">
        {children}
      </div>
    </div>
  );
}
