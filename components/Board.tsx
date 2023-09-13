import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
interface boardId {
  toDos: string[];
  boardId: string;
}
function Board({ toDos, boardId }: boardId) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isdraggingover={snapshot.isDraggingOver}
            isdraggingfromthis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IAreaProps {
  isdraggingover: boolean;
  isdraggingfromthis: boolean;
}
const Area = styled.div<IAreaProps>`
  background: ${(props) =>
    props.isdraggingover
      ? "#84fab0"
      : props.isdraggingfromthis
      ? "#fff"
      : "linear-gradient(45deg, #84fab0, #8fd3f4)"};
  flex-grow: 1;
  padding: 30px 10px 10px 10px;
  border-radius: 5px;
`;
export default Board;
