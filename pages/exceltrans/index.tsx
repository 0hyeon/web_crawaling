import MenubarLeft from "@components/MenubarLeft";
import React, { useState, useEffect } from "react";
import { FileInput, FileInputProps, Group, Center, rem } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { Box, Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Loading from "public/asset/svg/Logo";
import { BEcheckEnvironment } from "@libs/server/useCheckEnvironment";
function Exceltrans() {
  const [files, setFiles] = useState<File[]>([]);
  const [state, setSate] = useState({
    loading: false,
  });
  const [formData, setFormData] = useState<FormData>(new FormData());

  function handleFileChange(value: File | File[] | null) {
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

    setFiles(newFiles);
    setFormData(newFormData);
  }
  /*비우기*/
  //   const handleRemove = () => {
  //     setFiles([]);
  //   };
  /*보내기*/
  function handleSubmit() {
    const formDataToSend = new FormData();
    files.forEach((file, index) => {
      formDataToSend.append(`file${index + 1}`, file);
    });
    const file1 = formDataToSend.get("file1");
    const file2 = formDataToSend.get("file2");
    const file3 = formDataToSend.get("file3");
    const file4 = formDataToSend.get("file4");
    const file5 = formDataToSend.get("file5");
    const file6 = formDataToSend.get("file6");
    const file7 = formDataToSend.get("file7");
    const file8 = formDataToSend.get("file8");
    console.log(file1, file2, file3, file4, file5, file6, file7, file8);

    // let url;
    // if (process.env.NODE_ENV !== "development") {
    //   url = "https://sparta-yh.store/exceltrans";
    //   // url = "https://127.0.0.1/exceltrans";
    // } else {
    //   url = "https://sparta-yh.store/exceltrans";
    // }

    setSate(() => ({ loading: true }));
    fetch(BEcheckEnvironment().concat("/api/exceltrans"), {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "combined.xlsx";
        a.click();
        setSate({ loading: false });
      })
      .catch((error) => {
        console.error(error);
        setSate({ loading: false });
      });
    // const CRAWALING_QUERY_KEY = "/api/add-moWebcrawaling";
    // const { data: fetchData } = useQuery<{ items: any[] }, unknown, any[]>(
    //   [CRAWALING_QUERY_KEY],
    //   () => fetch(CRAWALING_QUERY_KEY)
    //   .then((res) => res.json())
    //   // .then((res) => res.json())
    //   // .then((data) => data)
    // );
    // console.log("fetchData : ", fetchData);
  }
  //   useEffect(() => {
  //     console.log("fetchData");
  //   }, [fetchData]);

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

  const labels = ["[잡코리아] AOS,IOS"];
  const FileInputs = labels.map((el, index) => (
    <Box key={index} maw={520} mx="auto">
      <FileInput
        mt="md"
        label={`${el}`}
        placeholder={`${el} 멀티 업로드하세요.`}
        valueComponent={ValueComponent}
        onChange={handleFileChange}
        multiple
      />
    </Box>
  ));
  return (
    <>
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="mx-4 min-h-[100vh] bg-white px-4 pt-16">
          <div className="mx-auto w-[90%]">
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
              <div className="p-16">
                <div className="mb-14 text-center text-2xl font-extrabold">
                  AutoReportTool 앱스플라이어 & 잡코리아
                </div>
                {FileInputs}
                <Box
                  maw={520}
                  mx="auto"
                  mt="md"
                  className="mt-8 flex items-center justify-center"
                >
                  <Button className="bg-black" onClick={handleSubmit}>
                    전송
                  </Button>
                  {/* <Button
                className="bg-whie border-[2px] border-black text-black"
                onClick={handleRemove}
              >
                비우기
              </Button> */}
                </Box>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
const LoadingText = styled.div`
  font-size: 30px;
  z-index: 100;
  overflow: visible;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(80%, -50%);
  font-weight: bold;
`;
const Svg = styled.svg`
  z-index: 100;
  overflow: visible;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-150%, -50%);
  g path {
    stroke: black;
    stroke-width: 20;
  }
`;
export default Exceltrans;
