import { FEcheckEnvironment } from "@libs/server/useCheckEnvironment";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const router = useRouter();

  const { data, isError, isLoading } = useQuery<ProfileResponse>(
    ["/api/users/me"],
    async () => {
      const response = await fetch(
        FEcheckEnvironment().concat("/api/users/me")
      );

      if (!response.ok) {
        // 에러 처리 또는 데이터 오류 시 수행할 작업
        throw new Error(response.statusText);
      }

      const responseData = await response.json();

      // 데이터를 가져와서 처리한 후에 오류가 발생한 경우에만 replace 호출
      if (!responseData.ok) {
        router.replace("/login");
        throw new Error("Unauthorized access");
      }

      return responseData;
    },
    {
      onError: (error) => {
        // useQuery에서 발생하는 에러 처리
        console.error(error);
        // 예: router.replace("/enter");
        router.replace("/login");
      },
    }
  );

  if (isLoading) {
    // 데이터 로딩 중에 수행할 작업
    // 예: 로딩 스피너 표시
  }

  return { data, isLoading, isError };
}
