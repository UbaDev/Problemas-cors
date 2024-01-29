// src/App.js

import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [error, setError] = useState("");

const handleSearch = () => {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://es.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${searchTerm}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Problema CORS: No se pudo completar la solicitud.");
      }
      return response.json();
    })
    .then((data) => {
      const firstResult = data?.query?.search?.[0];
      setSearchResult(firstResult);
      setError("");
    })
    .catch((error) => {
      setSearchResult("");
      setError(error.message);
    });
};

  return (
    <div className="App">
      <header className="App-header">
        {/* Contenedor del buscador */}
        <div style={{ width: "50%", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Buscar en Wikipedia"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        {/* Pantalla de resultados y errores */}
        {searchResult && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <h3>Resultados de la búsqueda:</h3>
            <p>{JSON.stringify(searchResult, null, 2)}</p>
          </div>
        )}
        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ff0000",
              color: "#ff0000",
            }}
          >
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
