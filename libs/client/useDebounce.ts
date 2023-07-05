import { useEffect, useState } from "react";

const useDebounce = <T = any>(value: T, delay = 500) => {
  const [debouncedValue, setdebouncedValue] = useState<T>(() => value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setdebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};
export default useDebounce;
