import Board from "@components/Board";
import MenubarLeft from "@components/MenubarLeft";
import UploadFile from "@components/UploadFile";
import { toDoState } from "atoms";
import { LoadingText, Svg } from "pages/exceltrans";
import Loading from "public/asset/svg/Logo";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
function ExcelLogic() {
  const [winReady, setwinReady] = useState(false);
  const [toDos, setTodos] = useRecoilState<any>(toDoState("todos"));
  const [state, setSate] = useState({
    loading: false,
  });
  const [isInput, setInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDuplicate, setDuplicate] = useState();
  const onDragEnd = (Info: DropResult) => {
    // console.log(Info);
    const { destination, draggableId, source } = Info;
    // draggableId === "다중중복제거" ? setInput(true) : setInput(false);
    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      setTodos((allboards: any) => {
        const boardCopy = [...allboards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allboards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setTodos((allboards: any) => {
        const sourceBoard = [...allboards[source.droppableId]];
        const destinationBoard = [...allboards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, draggableId);
        return {
          ...allboards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  const propFunction = (a: any) => {};
  const cancelBtn = useCallback(() => {
    setTodos({
      "가능 로직": ["다중중복제거", "PROD(adid3회이상제거)", "하나로취합"],
      선택: [],
    });
    setInput(false);
  }, [setTodos]);
  useEffect(() => {
    console.log("2");
    setwinReady(true);

    if (toDos["선택"].length > 0) {
      if (
        toDos["선택"].some((el: any) => ["PROD(adid3회이상제거)"].includes(el))
      ) {
        alert("개발준비중입니다.");
        cancelBtn();
        setInput(false);
        return;
      }
    }
    toDos["선택"].some((el: any) =>
      ["다중중복제거", "하나로취합"].includes(el)
        ? setInput(true)
        : setInput(false)
    );
    // setInput(true);
  }, [toDos, cancelBtn]);
  // const { data: datas, refetch } = useQuery<
  //   { items: Tracking[] },
  //   unknown,
  //   Tracking[]
  // >(
  //   [`/api/get-tracking`],
  //   () => fetch(`/api/get-tracking`).then((res) => res.json()),
  //   {
  //     select: (data) => data.items,
  //   }
  // );
  return (
    <>
      <MenubarLeft />
      {winReady ? (
        <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
          <div className="mx-4 min-h-[100vh] bg-white px-4 pt-16">
            <div className="mx-auto w-[70%]">
              {state?.loading === true ? (
                <>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={100}
                    height={100}
                  >
                    <Loading />
                  </Svg>
                  <LoadingText>Loading...</LoadingText>
                </>
              ) : (
                <>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Wrapper>
                      <Boards>
                        {Object.keys(toDos).map((boardId) => (
                          <Board
                            key={boardId}
                            toDos={toDos[boardId]}
                            boardId={boardId}
                          />
                        ))}
                      </Boards>
                    </Wrapper>
                  </DragDropContext>
                  {isInput && isInput ? (
                    // <Input ref={inputRef} placeholder="변수를 입력하세요." />
                    <>
                      <UploadFile
                        cancelBtn={cancelBtn}
                        toDos={toDos["선택"]}
                        propFunction={propFunction}
                      />
                    </>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
const Input = styled.input`
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  padding-left: 1.25rem;
  font-size: 0.8rem;
`;
const Boards = styled.div`
  display: grid;
  gap: 100px;
  grid-template-columns: repeat(2, 1fr);
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
`;
export default ExcelLogic;