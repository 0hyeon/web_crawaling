import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import Layout from "@components/layout";
import { Select, Textarea } from "@mantine/core";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import * as O from "../../../../../../utils/option";
import { SSG_PO_MediaWithChannel } from "pages/ssgpoSetting/[id]";
import { ChannelInfo, MutationResult } from "types/type";
import useMutation from "@libs/client/useMutation";
import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";

interface State {
  구분1: string | null;
  구분2: string | null;
  몰: string | null;
  소재명: string | null;
  매체: string | null;
  채널코드: string | null;
  트래킹링크명: string | null;
  트래킹링크: string | null;
}

const initialState: State = {
  구분1: null,
  구분2: null,
  몰: null,
  소재명: null,
  매체: null,
  채널코드: null,
  트래킹링크명: null,
  트래킹링크: null,
};
type Action = { type: "update"; name: keyof State; value: string | null };
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "update":
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
}
const MeterialCreate = () => {
  const path = usePathname();
  const [isData, setData] = useState<ChannelInfo[]>();
  const decodedPath = decodeURIComponent(path); // URL 디코딩
  const media = decodedPath.split("/")[2];
  const router = useRouter();

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state : ", state);

  const [createMeterial, { loading, data, error }] =
    useMutation<MutationResult>(
      `${FEcheckEnvironment().concat(
        "/api/ssgposetting/materialCreate/add-ssgmeterial"
      )}`,
      async () => {
        try {
          // await refetch();
          console.log("data :", data);
        } catch (error) {
          console.error("Error refetching data:", error);
        }
      }
    );
  const submitFn = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("submit :", data);
    if (confirm("추가하시겠습니까?")) {
      try {
        await createMeterial(state);
        alert("추가완료");
        router.push(
          `/ssgpoSetting/${media}/materialCreate/${router.query.chennelId}`
        );
      } catch (e) {
        console.error("Error deleting user:", e);
        alert("추가에 실패했습니다.");
      }
    }
  };
  const calcleFn = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // await filterMedia();
    alert("취소완료");
    router.push(
      `/ssgpoSetting/${media}/materialCreate/${router.query.chennelId}`
    );
  };
  const { data: mediaLists, refetch } = useQuery<
    { items: SSG_PO_MediaWithChannel[] },
    unknown,
    SSG_PO_MediaWithChannel[]
  >(
    [`/api/kobo/get-products`],
    () => fetch(`/api/ssgposetting/get-ssgpomedia`).then((res) => res.json()),
    {
      select: (data) => data.items,
    }
  );
  const filterMedia = useCallback(() => {
    const keyword = O.getOrElse(O.fromUndefined(media), "");
    const filteredMedia = mediaLists?.filter((el) => el.media === keyword);
    console.log("mediaLists : ", mediaLists);
    console.log("filteredMedia : ", filteredMedia);
    console.log(
      "flatMap == isData : ",
      filteredMedia?.flatMap((el) => el.SSG_PO_Channel).map((el) => el.channel)
    );
    console.log("media : ", media);
    setData(filteredMedia?.flatMap((el) => el.SSG_PO_Channel));
  }, [media, mediaLists]);
  useEffect(() => {
    filterMedia();
  }, [filterMedia]);
  console.log("isData : ", isData);
  console.log(isData?.filter((el) => el.id === Number(router.query.chennelId)));
  console.log(
    isData?.filter((el) => el.id === Number(router.query.chennelId))[0][
      "channel"
    ]
  );
  return (
    <Layout>
      <div className="mb-10 flex items-center justify-center text-2xl font-bold">
        SSG 소재추가
      </div>
      <div className="flex flex-col items-center justify-center gap-7">
        <Select
          label="매체"
          placeholder="선택하세요."
          data={[{ value: media, label: media }]}
          value={state.매체}
          onChange={(value: string | null) =>
            dispatch({ type: "update", name: "매체", value })
          }
          size="sm"
          withAsterisk
          w={400}
          sx={{
            ".mantine-Select-dropdown": {
              width: "400px !important",
            },
          }}
        />
        <Select
          label="채널코드"
          placeholder="선택하세요."
          data={[
            {
              value:
                isData?.filter(
                  (el) => el.id === Number(router.query.chennelId)
                )[0]?.channel || "",
              label:
                isData?.filter(
                  (el) => el.id === Number(router.query.chennelId)
                )[0]?.channel || "",
            },
          ]}
          value={state.채널코드}
          onChange={(value: string | null) =>
            dispatch({ type: "update", name: "채널코드", value })
          }
          size="sm"
          withAsterisk
          w={400}
          sx={{
            ".mantine-Select-dropdown": {
              width: "400px !important",
            },
          }}
        />
        <Select
          label="몰"
          placeholder="선택하세요."
          data={[
            { value: "SSG", label: "SSG" },
            { value: "EMART", label: "EMART" },
          ]}
          value={state.몰}
          onChange={(value: string | null) =>
            dispatch({ type: "update", name: "몰", value })
          }
          size="sm"
          withAsterisk
          w={400}
          sx={{
            ".mantine-Select-dropdown": {
              width: "400px !important",
            },
          }}
        />
        <Textarea
          placeholder="타이핑 하세요."
          label="소재명"
          value={state.소재명 || ""}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: "update",
              name: "소재명",
              value: event.currentTarget.value,
            })
          }
          withAsterisk
          sx={{
            ".mantine-Textarea-wrapper": {
              width: "400px !important",
            },
          }}
        />
        <Textarea
          placeholder="타이핑 하세요."
          label="트래킹링크명"
          value={state.트래킹링크명 || ""}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: "update",
              name: "트래킹링크명",
              value: event.currentTarget.value,
            })
          }
          withAsterisk
          sx={{
            ".mantine-Textarea-wrapper": {
              width: "400px !important",
            },
          }}
        />
        <Textarea
          placeholder="타이핑 하세요."
          label="트래킹링크"
          value={state.트래킹링크 || ""}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: "update",
              name: "트래킹링크",
              value: event.currentTarget.value,
            })
          }
          withAsterisk
          sx={{
            ".mantine-Textarea-wrapper": {
              width: "400px !important",
            },
          }}
        />
        <Select
          label="구분1"
          placeholder="선택하세요."
          data={[
            { value: "main", label: "main" },
            { value: "plan", label: "plan" },
            { value: "pro", label: "pro" },
          ]}
          value={state.구분1}
          onChange={(value: string | null) =>
            dispatch({ type: "update", name: "구분1", value })
          }
          size="sm"
          withAsterisk
          w={400}
          sx={{
            ".mantine-Select-dropdown": {
              width: "400px !important",
            },
          }}
        />
        <Select
          label="구분2"
          placeholder="선택하세요."
          data={[
            { value: "RT", label: "RT" },
            { value: "RE", label: "RE" },
            { value: "UA", label: "UA" },
          ]}
          value={state.구분2}
          onChange={(value: string | null) =>
            dispatch({ type: "update", name: "구분2", value })
          }
          size="sm"
          withAsterisk
          w={400}
          sx={{
            ".mantine-Select-dropdown": {
              width: "400px !important",
            },
          }}
        />

        <div className="flex items-center justify-center gap-5">
          <button
            onClick={(e) => submitFn(e)}
            className="w-24 rounded-md bg-blue-500 p-2 text-white"
          >
            저장
          </button>
          <button
            onClick={(e) => calcleFn(e)}
            className="w-24 rounded-md bg-red-400 p-2 text-white"
          >
            취소
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MeterialCreate;
