import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable
} from "@dnd-kit/core";
import preview_items from "./preview_items.jsx"
import PreviewTile from "./Cards/PreviewTile.jsx";


const GRID_SIZE = 25;
const GRID_WIDTH = 900;
const GRID_HEIGHT = 600;
const TILE_WIDTH = 200;
const TILE_HEIGHT = 200;


function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

function snapToGridAndClamp(x, y, grid = GRID_SIZE) {
  const snappedX = Math.round(x / grid) * grid;
  const snappedY = Math.round(y / grid) * grid;
  // Clamp so tile stays within grid
  return {
    x: clamp(snappedX, 0, GRID_WIDTH - TILE_WIDTH),
    y: clamp(snappedY, 0, GRID_HEIGHT - TILE_HEIGHT),
  };
}

export default function GridDragField() {
  // const initialItems = [
  //   { id: 'draggable-0', position: { x: 0, y: 0 } },
  //   { id: 'draggable-1', position: { x: 250, y: 0 } },
  //   { id: 'draggable-2', position: { x: 0, y: 250 } },
  // ];
  const initialItems = preview_items.options;
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === active.id) {
          const newX = item.position.x + delta.x;
          const newY = item.position.y + delta.y;
          return { ...item, position: snapToGridAndClamp(newX, newY) };
        }
        return item;
      })
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DroppableField>
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id} item={item} />
        ))}
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
        width: 900,
        height: 600,
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

function DraggableItem({ id, item }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const translate = transform
    ? {
        x: item.position.x + transform.x,
        y: item.position.y + transform.y,
      }
    : item.position;

  return (
    // <PreviewTile 
    //   option={{ id, label: item.label, image: item.image, alt: item.alt }} 
    //   ref={setNodeRef}
    //   {...listeners}
    //   {...attributes}
    //   style={{
    //     position: "absolute",
    //     cursor: "grab"
    //   }}
    // />
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        position: "absolute",
        left: translate.x,
        top: translate.y,
        cursor: "grab",
      }}
    >
      <img src={item.image} alt={item.alt} />
      <span>{item.label}</span>
    </div>
  );
}
