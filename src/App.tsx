import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import debounce from "lodash/fp/debounce";
import "./App.css";

type AnyFunction = (...args: any[]) => any;

function useDebounce<TFunc extends AnyFunction>(
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

function App() {
  const [state, setState] = useState(0);

  const onChange = () => {
    setState((prev) => prev + 1);
  };

  const sendData = useDebounce((data) => {
    console.log(data);
  }, 3000);

  useEffect(() => {
    sendData(state);
  }, [state, sendData]);

  return (
    <div>
      <button onClick={onChange}>Click me</button>
    </div>
  );
}

export default App;
