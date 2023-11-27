import { useState } from "react";

type UseMutationState<T> = {
  loading: boolean;
  data?: T;
  error?: string;
};

type UseMutationResult<T> = [
  (data: any) => void,
  UseMutationState<T>
];

export default function useMutation<T = any>(
  url: string,
  onSuccessCallback?: () => void,
  onMutate?: () => void,
  onError?: (error: string) => void
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    if (onMutate) {
      onMutate();
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json().catch(() => ({}));
      })
      .then((responseData) => {
        setState((prev) => ({ ...prev, data: responseData, loading: false }));
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      })
      .catch((error) => {
        const errorMessage = error.message || 'An error occurred';
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
        if (onError) {
          onError(errorMessage);
        }
      });
  }

  return [mutation, { ...state }];
}
