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
  MultiSelect,
} from "@mantine/core";
import { KoboGamesPdList } from "@prisma/client";
import { IconPhoto } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoadingText, Svg } from "pages/exceltrans";
import Loading from "public/asset/svg/Logo";
import React, { useState } from "react";
import * as O from "../../utils/option";
import { useRouter } from "next/router";

const KoboGames = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [SelectText, setSelectText] = useState<string[]>([]);
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
      SelectText.forEach((text, index) => {
        newFormData.append(`SelectText${index + 1}`, text);
      });
    } else if (value === null) {
      // Remove all keys from formData
      // for (let key of formData.keys()) {
      //   newFormData.delete(key);
      // }
      newFiles = [];
    } else {
      newFiles = [value];
      newFormData.append(`file${files.length + 1}`, value);
    }

    setFiles(newFiles);
    setFormData(newFormData);
  }
  const fetchData = async () => {
    setSate({ loading: true });

    try {
      const response = await axios.get(
        BEcheckEnvironment().concat("/api/kobogames/kobo_store/"),
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      // 응답 데이터를 상태로 설정
      // setFetchData(data.data);
      setSate({ loading: false });
    } catch (error) {
      console.error(error);
      setSate({ loading: false });
    }
  };

  function handleSubmit() {
    const formDataToSend = new FormData();
    files.forEach((file, index) => {
      formDataToSend.append(`file${index + 1}`, file);
    });

    // formDataToSend.append(`SelectText`, SelectText);
    const file1 = formDataToSend.get("file1");
    const file2 = formDataToSend.get("file2");
    const file3 = formDataToSend.get("file3");
    const file4 = formDataToSend.get("file4");
    const file5 = formDataToSend.get("file5");
    const file6 = formDataToSend.get("file6");
    const file7 = formDataToSend.get("file7");
    const file8 = formDataToSend.get("file8");
    console.log(file1, file2, file3, file4, file5, file6, file7, file8);

    setSate(() => ({ loading: true }));
    fetch(BEcheckEnvironment().concat("/api/kobogames/kobo_ecommerce_dau/"), {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "(GB)KBG_이커머스_Daily_Report.xlsx";
        a.click();
        setSate({ loading: false });
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
    <Box key={index} maw={1000} mx="auto">
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
  const EditPage = () => {
    router.push("/kobogames/edit");
  };
  //코보게임즈 상품리스트
  const { data: KoboLists, refetch } = useQuery<
    { items: KoboGamesPdList[] },
    unknown,
    KoboGamesPdList[]
  >(
    [`/api/kobo/get-products`],
    () => fetch(`/api/kobo/get-products`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
  const KoboList = O.fromUndefined(KoboLists);
  const KoboData = O.mapOrElse(
    KoboList,
    (kobo) => kobo.map((p) => p.productname),
    []
  );

  const filteredKoboData = KoboData.filter((item) => item !== null) as string[];
  console.log("KoboData : ", KoboData);
  console.log("SelectText : ", SelectText);

  const onChangeInput = (text: string[]) => {
    setSelectText(text);
  };
  return (
    <>
      <MenubarLeft />
      <div className="h-[100%] min-h-[100vh] w-full bg-[#dee2e6] pl-64">
        <div className="min-h-[100vh] w-full bg-white px-4 py-16">
          <div className="mx-auto w-[90%]">
            <div className="mx-auto w-[40%]">
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
                <div className="">
                  <div className="mb-14 text-center font-sans text-2xl font-extrabold">
                    [코보게임즈] 이커머스 Process [...ing]
                  </div>

                  {/* 상품설정 */}
                  <div className="mx-auto mb-2 mt-20 w-[100%]">
                    <MultiSelect
                      label="상품명선택"
                      placeholder="Pick value"
                      data={filteredKoboData}
                      onChange={(selectedValues) =>
                        onChangeInput(selectedValues)
                      }
                      searchable
                    />
                  </div>
                  <Button className="bg-gray-400" onClick={EditPage}>
                    추가/삭제 이동
                  </Button>

                  {/*  */}
                  {/* <div>
                    {isFetchData &&
                      Object.entries(isFetchData).map(
                        ([name, quantity]: [string, any]) => (
                          <div key={name}>
                            <p>{name}</p>
                            <p>Quantity: {quantity}</p>
                          </div>
                        )
                      )}
                  </div> */}
                  {/*  */}
                  <div className="mb-14 flex flex-col gap-1 text-center">
                    <div className="mb-2 mt-20">
                      <b className="text-xl">재료:</b>
                    </div>
                    <div>
                      <b>1.</b>(GB)KBG_이커머스_Daily_Report.xlsx
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
      </div>
    </>
  );
};

export default KoboGames;
