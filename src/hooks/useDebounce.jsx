import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(time);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
