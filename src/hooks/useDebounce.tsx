import debounce from "lodash/fp/debounce";
import { useLayoutEffect, useMemo, useRef } from "react";
type AnyFunction = (...args: any[]) => any;

export function useDebounce<TFunc extends AnyFunction>(
  callback: TFunc,
  timeout = 500,
) {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useMemo(
    () =>
      debounce(timeout, (...args: Parameters<TFunc>): ReturnType<TFunc> => {
        return callbackRef.current(...args);
      }),
    [timeout],
  );
}
