import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable
} from "@dnd-kit/core";

const GRID_SIZE = 50;

function snapToGrid(x, y, grid = GRID_SIZE) {
  return {
    x: Math.round(x / grid) * grid,
    y: Math.round(y / grid) * grid,
  };
}

export default function GridDragField() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragEnd = (event) => {
    const { delta } = event;
    const newX = position.x + delta.x;
    const newY = position.y + delta.y;
    setPosition(snapToGrid(newX, newY));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DroppableField>
        <DraggableItem position={position} />
      </DroppableField>
    </DndContext>
  );
}

function DroppableField({ children }) {
  useDroppable({ id: "field" });

  const gridBackground = `
    linear-gradient(to right, #ccc 1px, transparent 1px),
    linear-gradient(to bottom, #ccc 1px, transparent 1px)
  `;

  return (
    <div
      style={{
        position: "relative",
        width: 500,
        height: 500,
        backgroundImage: gridBackground,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        border: "1px solid #aaa",
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
}

function DraggableItem({ position }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const translate = transform
    ? {
        x: position.x + transform.x,
        y: position.y + transform.y,
      }
    : position;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        width: 50,
        height: 50,
        background: "dodgerblue",
        borderRadius: 8,
        position: "absolute",
        left: translate.x,
        top: translate.y,
        cursor: "grab",
      }}
    />
  );
}
