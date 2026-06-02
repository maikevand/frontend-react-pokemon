import './App.css'
import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonCard from "./components/PokemonCard/PokemonCard.jsx";

function App() {

    const[pokemon, setPokemon] = useState({});

    async function fetchPokemon() {
        try {
            const result=await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
            setPokemon(result.data);
        } catch (e) {
            console.error(e);
        }
    }

useEffect(() => {
    fetchPokemon();
}, []);

  return (
      <>
          <h1>Gotta catch em all!</h1>
          {pokemon.id && (
              <PokemonCard
              name={pokemon.name}
              sprites={pokemon.sprites}
              moves={pokemon.moves}
              weight={pokemon.weight}
              abilities={pokemon.abilities}
              />
          )}
      </>
  );
}

export default App
