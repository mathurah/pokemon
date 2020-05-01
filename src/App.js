import React, { useState, useEffect } from "react";
import Card from "./components/Cards";
import "./App.css";

function App() {
  //Setting constant variables + states
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=151";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(apiURL);
      loadingPokemon(response.results);
    }
    fetchData();
  });

  //Purpose: This function makes calls to the pokemon API with the url passed in as a parameter
  function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          setError(true);
          console.error("Error occured", error);
        });
    });
  }

  //Purpose: Loading pokemon takes in the array of all pokemon and maps it to the name and image for each pokemon
  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        pokemon = await getAllPokemon(pokemon.url);
        return pokemon;
      })
    );

    setPokemon(_pokemonData);
  };

  //Displaying the pokemon on the page
  return error ? (
    <div>Error occured</div>) : 
    (<div className="App">
      <header>
        <h1>
          PoKEYmon{" "}
          <span role="img" aria-label="emoji">
            🔑
          </span>
        </h1>
      </header>
      <div className="grid">
        {pokemon.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}

export default App;
