import { useState } from "react";
import { UseMutationState } from "types/type";

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string,
  onSuccessCallback?: () => void
): UseMutationResult<T> {
  const [state, setSate] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setSate((prev) => ({ ...prev, data, loading: false })))
      .then(()=>{
        if(onSuccessCallback){
          onSuccessCallback();
        }
      })
      .catch((error) =>
        setSate((prev) => ({ ...prev, error, loading: false }))
      );
  }
  return [mutation, { ...state }];
}
