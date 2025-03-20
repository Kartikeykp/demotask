import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokeName, setPokeName] = useState("");
  const [pokeData, setPokeData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!pokeName.trim()) return;

    setError(null);
    setPokeData(null);

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`
      );
      setPokeData(response.data);
    } catch (error) {
      setError("Pokemon not found!");
    }
  };

  return (
    <div className="App">
      <div className="content-container">
        <h1>Pokemon Info App</h1>
        <input
          type="text"
          placeholder="Enter Pokemon name"
          value={pokeName}
          onChange={(e) => setPokeName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {error && <p className="error">{error}</p>}

        {pokeData && (
          <div className="pokemon-info">
            <h2 className="capitalize">{pokeData.name}</h2>
            <img
              src={pokeData.sprites.front_default}
              alt={pokeData.name}
              className="pokemon-image"
            />
            <p className="types">
              <strong>Type:</strong> {pokeData.types.map((type) => type.type.name).join(", ")}
            </p>

            <h3>Stats:</h3>
            <ul className="stats-list">
              {pokeData.stats.map((stat, index) => (
                <li key={index}>
                  <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
