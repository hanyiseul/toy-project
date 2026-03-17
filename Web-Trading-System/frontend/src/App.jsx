import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";

const App = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then(res => res.text())
      .then(data => setMsg(data));
  }, []);

  return (
    <>
      <Header/>
      {msg}
    </>
  );
};

export default App;