import MenubarLeft from "@components/MenubarLeft";
import { BEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import {
  Box,
  Button,
  Center,
  FileInput,
  FileInputProps,
  Group,
  rem,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { LoadingText, Svg } from "pages/exceltrans";
import Loading from "public/asset/svg/Logo";
import React, { useState } from "react";

const SSGAdmUpload = () => {
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
  function handleSubmit() {
    const formDataToSend = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file); // "files" 필드에 파일 추가
    });

    setSate(() => ({ loading: true }));
    fetch(BEcheckEnvironment().concat("/ssg/ssgadmUpload"), {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log(res))
      // .then((blob) => {
      //   const url = URL.createObjectURL(blob);
      //   const a = document.createElement("a");
      //   a.href = url;
      //   a.download = "명선_개인폼★MS2_(GB)SSG_InAPP_Report.xlsx";
      //   a.click();
      //   setSate({ loading: false });
      // })
      .then(() => {
        setSate({ loading: false });
        alert("업로드완료");
      })
      .catch((error) => {
        console.error(error);
        setSate({ loading: false });
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

  const labels = [""];
  const FileInputs = labels.map((el, index) => (
    <Box key={index} maw={520} mx="auto">
      <FileInput
        mt="md"
        label={`${el}`}
        placeholder={`${el} 업로드하세요.`}
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
        <div className="min-h-[100vh] w-full bg-white px-4 py-16">
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
                <div className="mb-14 text-center font-sans text-xl font-extrabold">
                  SSG광고주 데이터 업로드 [...ing]
                </div>
                <div className="mb-14 flex flex-col gap-1 text-center">
                  <div className="mb-2 flex items-center justify-center gap-1">
                    <span className="text-red-500">*</span>
                    <b className="text-base">규칙:</b>
                  </div>
                  <div className="text-sm">
                    <b>1.</b>그린브릭스_UV_*월.xlsb
                  </div>
                  <div className="text-sm">
                    <b>2.</b>그린브릭스_첫구매_*월.xlsx
                  </div>
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
};

export default SSGAdmUpload;
