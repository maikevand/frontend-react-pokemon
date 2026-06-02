import './App.css'
import axios from 'axios';
import {useEffect, useState} from "react";

function App() {

    const[pokemon, setPokemon] = useState({});

    async function fetchPokemon() {
        try {
            const result=await axios.get("https://pokeapi.co/api/v2/pokemon/jigglypuff");
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
      {pokemon.id && (
      <>
      <h1>Gotta catch em all!</h1>
        <article><h2>{pokemon.name}</h2></article>
        <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
          <ul className="pokemon-features">
              <li>
                  Moves: {pokemon.moves.length}
              </li>
              <li>
                  Weight: {pokemon.weight}
              </li>
              <li>
                  Abilities:
                  <ul>
                      {pokemon.abilities.map((ability) => (
                          <li key={ability.ability.name}>
                              {ability.ability.name}
                          </li>
                      ))}
                  </ul>
              </li>
          </ul>
    </>
          )}
      </>
  );

    // Ditto
    //     [afbeelding]
    // Moves: 146
    // Weight: 55
    // Abilities:
    //     cute-charm
    // competitive
    // friend-guard
}

export default App
