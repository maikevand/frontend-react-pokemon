import './App.css'
import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonCard from "./components/PokemonCard/PokemonCard.jsx";

function App() {

    const [pokemonList, setPokemonList] = useState([]);

    async function fetchPokemonList() {
        try {
            const dittoResult = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
            const jigglypuffResult = await axios.get("https://pokeapi.co/api/v2/pokemon/jigglypuff");
            setPokemonList([dittoResult.data, jigglypuffResult.data]);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchPokemonList();
    }, []);

    return (
        <>
            <h1>Gotta catch em all!</h1>
            {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.id} currentPokemon={pokemon}/>
            ))}
        </>
    );
}

export default App
