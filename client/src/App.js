import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./style/style.css";
function App() {
  const [data, setData] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const fetchData = useCallback(async () => {
    const response = await axios.get(`http://localhost:3001/get`);
    setData(response.data);
  }, []);

  const sendRequest = useCallback(async () => {
    if (isSending) return;
    // update state
    setIsSending(true);
    // send the actual request
    await fetch("http://localhost:3001/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // once the request is sent, update state again
    setIsSending(false);
  }, [isSending, data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log("data is", data);
  return (
    <div className="App">
      <header className="header">
        <h1>
          <span>Bonjour </span>
          <span>Bruno</span>
        </h1>
      </header>
      <body>
        <main>
          <p>
            Chaque jour, une nouvelle photo de notre petillant ministre de
            l'economie et des finances !
          </p>
        </main>
        {data && data.isValid && (
          <div className="gallery">
            <img src={data.url} alt="Bruno Le Maire"></img>
          </div>
        )}
        <button className="ghost" disabled={isSending} onClick={sendRequest}>
          This is not Bruno!
        </button>
      </body>
      <footer>
        <p>Made From Paris with ♥</p>
      </footer>
    </div>
  );
}

export default App;
