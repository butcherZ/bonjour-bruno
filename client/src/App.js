import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import manu from "./assets/manu.jpeg";
import "react-toastify/dist/ReactToastify.css";
import "./style/style.css";

function App() {
  const [data, setData] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/get`,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    setIsFetching(false);
    setData(responseData);
  }, []);

  const sendRequest = useCallback(async () => {
    if (isSending) return;
    // update state
    setIsSending(true);
    // send the actual request
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/post`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    response.ok
      ? toast("ok, SAD, this picture has been removed")
      : toast.error(response.error);

    // once the request is sent, update state again
    setIsSending(false);
  }, [isSending, data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <header className="header">
        <h1>
          <span>Bonjour </span>
          <span>{data && !isFetching ? "Bruno" : "Macron"}</span>
        </h1>
      </header>
      <main>
        <p>
          {data && !isFetching
            ? "Chaque jour, une nouvelle photo de notre petillant ministre de l'economie et des finances !"
            : "looks like there's no Bruno left, but we still have Macron"}
        </p>
      </main>
      <div className="gallery">
        {data && data.isValid && !isFetching ? (
          <img src={data.url} alt="Bruno Le Maire"></img>
        ) : (
          <>
            <img src={manu} alt="Manu"></img>
          </>
        )}
      </div>
      <button className="ghost" onClick={sendRequest}>
        This is not Bruno!
      </button>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <footer>
        <p>Made In Paris with ♥</p>
      </footer>
    </div>
  );
}

export default App;
