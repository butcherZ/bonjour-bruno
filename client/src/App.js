import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const fetchData = useCallback(async () => {
    axios
      .get(`http://localhost:3001/`)
      .then((response) => setData(response.data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;
