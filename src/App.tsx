import { useState, useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";
import Menu from "./components/Menu/Menu";

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
      <Menu />
    </div>
  );
}

export default App;
