import React, { useCallback, useState } from "react";
import { Box } from "@mantine/core";
import { FileInput, FileInputProps, Group, Center, rem } from "@mantine/core";
import { IconPhoto, IconUpload } from "@tabler/icons-react";
import { BEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import * as XLSX from "xlsx";
import Papa from "papaparse";

import SelectBoxs from "./SelectBoxs";
import { styled } from "styled-components";

function UploadFile({
  cancelBtn,
  toDos,
  setLoading,
}: {
  cancelBtn: () => void;
  toDos: any;
  setLoading: (isLoading: boolean) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [isVariable, setVariable] = useState<any>([]);
  const [isLogicName, setLogicName] = useState<string>("");
  const [isKeyData, setKeyData] = useState<any>([]);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [isCsvOrXlsx, setCsvOrXlsx] = useState<string>("");

  function handleFileChange(value: File | File[] | null) {
    //formData에 담기
    const newFormData = new FormData();

    let newFiles: File[] = [];
    if (Array.isArray(value)) {
      newFiles = value;
      value.forEach((file, index) => {
        newFormData.append(`file${files.length + index + 1}`, file);
      });
    } else if (value === null) {
      // Remove all keys from formData
      for (let key of formData.keys()) {
        newFormData.delete(key);
      }
      newFiles = [];
    } else {
      newFiles = [value];
      newFormData.append(`file${files.length + 1}`, value);
    }
    // console.log("newFiles : ", newFiles);

    setFiles(newFiles); //파일 여러개 담아서 submit때활용
    setFormData(newFormData);

    setLogicName(toDos);
    //todos : Array(1) [0]:"하나로취합"
    console.log("value! : ", value!);
    if (value === null) return;
    if (Array.isArray(value)) {
      const isAllCSV = value.every((file) => {
        const lastDotIndex = file.name.lastIndexOf(".");
        const fileExtension = file.name.slice(lastDotIndex + 1).toLowerCase();
        return fileExtension === "csv";
      });
      const isAllExcel = value.every((file) => {
        const lastDotIndex = file.name.lastIndexOf(".");
        const fileExtension = file.name.slice(lastDotIndex + 1).toLowerCase();
        return fileExtension === "xlsx";
      });
      console.log("1 : ", value);
      console.log("2 : ", value[0]);
      if (isAllCSV) {
        toDos.includes("다중중복제거")
          ? readCSV(value instanceof Array ? value[0] : value)
          : null;
        setCsvOrXlsx("csv"); //csv형식으로 post
      }
      if (isAllExcel) {
        toDos.includes("다중중복제거")
          ? readExcel(value instanceof Array ? value[0] : value)
          : null;
        setCsvOrXlsx("xlsx"); //xlsx형식으로 post
      }
      if (!isAllCSV && !isAllExcel) {
        alert("모든파일이 csv & xlsx파일 형식이어야 합니다.");
        cancelBtn();
      }
    }
  }
  //엑셀읽기
  async function readExcel(fileList: any) {
    if (fileList === null || fileList.length === 0) {
      return;
    }
    try {
      const data = await readAsBinaryStringAsync(fileList);
      console.log("data", data);
      const workBook = XLSX.read(data, { type: "binary" }) as any;
      console.log("workBook", workBook);

      workBook.SheetNames.forEach(function (sheetName: any) {
        const rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
        const jsonData = JSON.stringify(rows[0]);
        const pareData = JSON.parse(jsonData);
        const keyData = Object.keys(pareData);

        setKeyData(keyData); // 첫 번째 파일의 키 값만 업데이트

        // 다른 파일에 대한 처리 코드는 이 위치에 추가 가능
      });
    } catch (error) {
      console.error("파일 처리 중 오류 발생:", error);
    }
  }
  async function readCSV(fileList: any) {
    if (fileList === null || fileList.length === 0) {
      return;
    }
    try {
      const data = (await readAsTextAsync(fileList)) as any;
      console.log("data!!", data);

      // CSV 파싱
      Papa.parse(data, {
        header: true,
        complete: function (result: any) {
          if (Array.isArray(data) && data.length > 0) {
            // 데이터가 배열이며 비어 있지 않은 경우 처리 로직 실행
            console.log(data);
          } else {
            // 데이터가 비어 있거나 잘못된 경우 처리
            console.error("데이터가 비어 있거나 구조가 잘못되었습니다.");
          }
          console.log("result", result);
          const rows = result.data;
          console.log("rows :", rows);

          // CSV 데이터를 처리할 코드 작성
          // rows 배열에는 각 행의 객체가 포함되어 있으며, 각 객체의 속성은 헤더로 지정된 열 이름과 일치합니다.

          // 예: 첫 번째 행의 이름 가져오기
          const firstName = rows[0];
          console.log("firstName : ", firstName);
          const keyData = Object.keys(firstName);
          console.log("keyData : ", keyData);
          setKeyData(keyData);
          // 첫 번째 파일의 데이터를 처리하고 싶은 작업을 수행합니다.
          // 다른 파일에 대한 처리 코드는 이 위치에 추가 가능
        },
        error: function (error: any) {
          console.error("CSV 파싱 중 오류 발생:", error);
        },
      });
    } catch (error) {
      console.error("파일 처리 중 오류 발생:", error);
    }
  }
  function readAsBinaryStringAsync(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
      reader.readAsBinaryString(file);
    });
  }
  function readAsTextAsync(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("File is undefined"));
        return;
      }

      const CHUNK_SIZE = 1024 * 1024; // 1MB 청크 크기로 설정
      const fileSize = file.size;
      let offset = 0;
      const reader = new FileReader();

      reader.onload = function (event) {
        if (event && event.target) {
          const chunk = event.target.result as string;
          // 읽은 데이터를 처리하거나 저장할 수 있습니다.
          // 이 예제에서는 전체 청크를 resolve 합니다.
          resolve(chunk);

          offset += chunk.length;
          if (offset < fileSize) {
            readNextChunk();
          }
        } else {
          reject(new Error("File reading error"));
        }
      };

      reader.onerror = function () {
        reject(reader.error);
      };

      function readNextChunk() {
        const nextChunk = file.slice(offset, offset + CHUNK_SIZE);
        reader.readAsText(nextChunk);
      }

      // 첫 번째 청크를 읽기 시작합니다.
      readNextChunk();
    });
  }
  //엑셀전송
  function handleSubmit() {
    // console.log(files);
    setLoading(true);
    const formDataToSend = new FormData();
    files.forEach((file, index) => {
      formDataToSend.append(`file${index + 1}`, file);
    });
    const fileVariables: any = {};
    for (let index = 1; index <= files.length; index++) {
      fileVariables[`file${index}`] = formDataToSend.get(`file${index}`);
    }
    formData.append("isVariable", JSON.stringify(isVariable));
    formData.append("isLogicName", JSON.stringify(isLogicName));
    formData.append("isCsvOrXlsx", JSON.stringify(isCsvOrXlsx));

    fetch(BEcheckEnvironment().concat("/api/customduplicate"), {
      method: "POST",
      body: formData, // formData와 isVariable을 함께 JSON으로 직렬화하여 body에 추가
    })
      .then((response) => response.blob())
      .then((blob) => {
        // 비동기 작업이 완료되면 setLoading(false)를 호출
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "combined";
        a.click();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  function Value({ file }: { file: File | null }) {
    return (
      <Center
        inline
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[1],
          fontSize: theme.fontSizes.xs,
          padding: `${rem(3)} ${rem(7)}`,
          borderRadius: theme.radius.sm,
        })}
      >
        <IconPhoto size={rem(14)} style={{ marginRight: rem(5) }} />
        <span
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: rem(200),
            display: "inline-block",
          }}
        >
          {file?.name}
        </span>
      </Center>
    );
  }
  const CancelEvent = useCallback(
    (textToRemove: string) => {
      const updatedVariable = isVariable.filter(
        (existingText: string) => existingText !== textToRemove
      );
      setVariable(updatedVariable);
    },
    [isVariable]
  );
  const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
    if (Array.isArray(value)) {
      return (
        <Group spacing="sm" py="xs">
          {value.map((file, index) => (
            <Value file={file} key={index} />
          ))}
        </Group>
      );
    }
    return <Value file={value} />;
  };
  const messagePreviewFunc = useCallback((text: string) => {
    console.log("messagePreviewFunc text : ", text);
    setVariable((prevVariable: string[]) => {
      // 이미 있는 text일 경우
      if (prevVariable.includes(text)) {
        return prevVariable; // 아무 작업도 하지 않고 이전 배열을 반환
      }
      // 이미 없는 text일 경우
      return [...prevVariable, text]; // 새로운 text를 추가한 배열을 반환
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-16 text-center">
      <Box key={0} maw={520} mx="auto">
        <FileInput
          mt="md"
          label={`파일업로드`}
          placeholder={`파일을 하세요.(1개 형식으로통일 xlsx,csv)`}
          valueComponent={ValueComponent}
          icon={<IconUpload size={rem(14)} />}
          onChange={(e) => {
            handleFileChange(e);
          }}
          multiple
          accept="text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </Box>
      {toDos.includes("다중중복제거") ? (
        <div>
          <Label>카테고리 선택(중복제거)</Label>
          <SelectBoxs
            placeholder={"--선택해주세요--"}
            className={["0", ...isKeyData.map((el: any) => el)]}
            propFunction={messagePreviewFunc}
            optionData={
              ["---선택해주세요---", ...isKeyData.map((x: any) => x)] ||
              "빈값입니다"
            }
          ></SelectBoxs>
        </div>
      ) : null}
      {toDos.includes("다중중복제거") ? (
        <>
          <div>
            {isVariable && isVariable.length > 0
              ? isVariable.map((el: string, idx: number) => (
                  <VarableArea key={idx}>
                    <span>{el}</span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => CancelEvent(el)}
                    >
                      X
                    </span>
                  </VarableArea>
                ))
              : null}
          </div>
        </>
      ) : null}

      <div className="flex gap-8">
        <button className="w-28 bg-black p-1 text-white" onClick={handleSubmit}>
          전송
        </button>
        <button className="w-28 bg-black p-1 text-white" onClick={cancelBtn}>
          취소
        </button>
      </div>
    </div>
  );
}

export default UploadFile;
const SelectNameBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Label = styled.div`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #212529;
  word-break: break-word;
  cursor: default;
`;
const VarableArea = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-left: 4px;
  text-align: left;
  font-size: 0.75rem;
  padding: 0.1875rem 0.4375rem;
  border-radius: 0.25rem;
  border: 1px solid rgb(221, 225, 230);
`;
