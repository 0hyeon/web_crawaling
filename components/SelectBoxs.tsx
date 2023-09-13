import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useDetectClose from "../libs/client/useDetectClose";
const SelectBoxs = ({
  width = "",
  height = "",
  placeholder = "",
  optionData = "",
  currentCategoryValue = "",
  propFunction = "",
  className = "",
}: any): React.ReactElement => {
  const [currentValue, setCurrentValue] = useState(null);
  const selectInputRef = useRef(null);
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false); //커스텀훅
  const handleOnChangeSelectValue = (e: any) => {
    setCurrentValue(e.target.innerText);
  };
  // onChange setState비동기
  const ResetHandler = useCallback(() => {
    setCurrentValue(null);
  }, []);
  useEffect(() => {
    if (currentValue !== null) {
      propFunction(currentValue);
    }
  }, [currentValue, propFunction]);
  useEffect(() => {
    ResetHandler();
  }, [currentCategoryValue, ResetHandler]);
  return (
    <SelectBox
      width={width}
      height={height}
      ref={dropDownRef}
      onClick={() => setIsOpen((prev: any) => !prev)}
    >
      <Label ref={selectInputRef}>
        {currentValue === null ? placeholder : currentValue}
      </Label>
      {isOpen && (
        <SelectOptions>
          {optionData.map((data: any, index: any) => (
            <Option
              key={index}
              value={`${className[index]}`}
              className={`${className[index]}`}
              onClick={handleOnChangeSelectValue}
            >
              {data}
            </Option>
          ))}
        </SelectOptions>
      )}
    </SelectBox>
  );
};
const SelectBox = styled.div<{ ref: any; width?: string; height?: string }>`
  position: relative;
  height: ${(props) => (props.height ? props.height : "36px")};
  min-width: ${(props) => (props.width ? props.width : "200px")};
  display: flex;
  align-items: center;
  color: #424242;
  padding-left: calc(2.25rem / 3);
  padding-right: calc(2.25rem / 3);
  border-radius: 5px;
  background-color: #ffffff;
  justify-content: space-between;
  align-self: center;
  box-shadow: 0px 4px 4px #f3f4f8;
  border: 1px solid rgb(221, 225, 230);

  cursor: pointer;
`;
const Label = styled.label`
  font-size: 12px;
  margin-left: 4px;
  text-align: left;
  background-color: #f1f3f5;
  font-size: 0.75rem;
  padding: 0.1875rem 0.4375rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;
const SelectOptions = styled.ul<{ ref?: any }>`
  z-index: 1;
  position: absolute;
  list-style: none;
  top: 50px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: auto;
  padding: 0;
  border-radius: 5px;
  background-color: #fff;
  border: 2px solid #bdbdbd;
  box-sizing: border-box;
  color: #000;
  max-height: none;
  box-shadow: 0px 4px 4px rgb(20, 183, 105, 0.25);
`;
const Option = styled.li`
  font-size: 12px;
  margin: 5px 10px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #f1f3f5;
    font-weight: bold;
  }
`;
export default React.memo(SelectBoxs);
