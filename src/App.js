import React, {Component, useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Card from './components/Cards'

function App() {
  //Setting constant variables + states
  const [pokemon, setPokemon] =useState([]); 
  const apiURL ='https://pokeapi.co/api/v2/pokemon?limit=151'; 


  useEffect(() => {
    async function fetchData() {
    let response = await getAllPokemon(apiURL);
    let pokemon = await loadingPokemon(response.results);
    }
    fetchData(); 
  },[])
  

  // const fetchData = () => {
  //   axios
  //     .get('https://pokeapi.co/api/v2/pokemon?limit=151')
  //     .then(response => {
  //       setPokemon(response.data)
  //       console.log(response.data) 
  //     })

      function getAllPokemon(url) {
        return new Promise((resolve, reject) => {
          fetch(url)
            .then(res => res.json())
            .then(data => {
              resolve(data);
            })
        });
      }


  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }));

    setPokemon(_pokemonData);
  }



      async function getPokemon(url) {
        return new Promise((resolve, reject) => {
          fetch(url)
            .then(res => res.json())
            .then(data => {
              resolve(data);
            });
        });
      }

console.log(pokemon)

  return (
    
    <div className="App">
      <header>
      <h1 className="title">React Hooks</h1>
      <h3>With Pokemon</h3>
      </header>
      <div className="grid-container">
              {pokemon.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>

      {/* <div>{pokemon.result[0].name}</div> */}
        {/* <div>{pokemon.map(pokemon => (
          <div></div>
        ))}</div> */}
    </div>
  );
}

export default App;

  //add a catch bc that's good practice

  // const pokeId = () => {
  //   const min = Math.ceil(1)
  //   const max = Math.floor(151)
  //   return Math.floor(Math.random() * (max - min +1)) + min
  // }


  // const loadPokemon = (async () => {
  //  const result = await  axios (
  //     'https://pokeapi.co/api/v2/pokemon?limit=151',
  //     );
  //     setPokemon(result.data);
  //     // .then(response => {
  //       console.log(result.data)
  //       // setPokemon(response.data)
  //  }


  // useEffect(() => {
//   // GET request using fetch inside useEffect React hook
//   fetch('https://api.npms.io/v2/search?q=react')
//       .then(response => response.json())
//       .then(data => setTotalReactPackages(data.total));

// // empty dependency array means this effect will only run once (like componentDidMount in classes)
// }, []);


// fetchKantoPokemon(){
//   fetch(‘https://pokeapi.co/api/v2/pokemon?limit=151')
//   .then(response => response.json())
//   .then(allpokemon => console.log(allpokemon))
// }