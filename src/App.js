import React, {useState, useEffect } from "react";
import Card from './components/Cards'
import "./App.css";

function App() {
  //Setting constant variables + states
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=151";


//Purpose: done after render, gets the pokemon api and then 
  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(apiURL);
      loadingPokemon(response.results);
    }
    fetchData();
  });

  //Purpose: get all the Pokemon using the API call, and testing if the call went through with the catch error
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

  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        pokemon = await getAllPokemon(pokemon.url);
        return pokemon;
      })
    );

    setPokemon(_pokemonData);
  };

  return error ? (
    <div>Error occured</div>
  ) : (
    <div className="App">
      <header>
        <h1>
          PoKEYmon{" "}
          <span role="img" aria-label="emoji">
            🔑
          </span>
        </h1>
      </header>
      {/* //Displaying pokemon in a grid */}
      <div className="grid">
        {pokemon.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}


export default App;
