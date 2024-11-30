import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;
  console.log("api url", API_URL);

  useEffect(() => {
    fetch(`${API_URL}/api/hello`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, [API_URL]);

  return <div>{message}</div>;
}

export default App;
