import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Flex } from "@radix-ui/themes";

export function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver ? "border-blue-400 bg-blue-200" : "border-gray-400 bg-gray-100"
      }
       border z-20 transition-all rounded-lg relative border-dashed w-full h-full`}
    >
      <div
        className="absolute inset-0 bg-[url('/images/graybg.jpg')] opacity-10 bg-repeat bg-[auto_150px]
 rounded-lg z-10"
      ></div>
      <div
        className={`${
          !children
            ? "flex relative justify-center align-center h-full w-full"
            : "grid grid-cols-1 h-min lg:grid-cols-2 3xl:grid-cols-3"
        } p-3 sm:h-screen max-h-full overflow-x-scroll gap-4 `}
      >
        {!children ? (
          <Flex
            justify="center"
            align="center"
            className="text-center my-auto h-full font-semibold col-span-3 text-gray-500 text-lg "
          >
            <span className="mt-[-2rem]">Drop Expenses Here</span>
          </Flex>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
