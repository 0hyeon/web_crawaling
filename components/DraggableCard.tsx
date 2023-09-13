import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function DraggableCard({ toDo, index }: { toDo: string; index: number }) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: white;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.9)" : "none"};
  margin-bottom: 5px;
`;
export default React.memo(DraggableCard);
