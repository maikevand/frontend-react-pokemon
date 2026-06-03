import './App.css'
import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonCard from "./components/PokemonCard/PokemonCard.jsx";

function App() {

    const [pokemonList, setPokemonList] = useState([]);

    async function fetchPokemonList() {
        try {
            // const dittoResult = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
            // const jigglypuffResult = await axios.get("https://pokeapi.co/api/v2/pokemon/jigglypuff");
            const listResult = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
            console.log(listResult.data.results);
            // const detailRequests = listResult.data.results.map((pokemon) => {
            //     return axios.get(pokemon.url);
            // });
            // setPokemonList([dittoResult.data, jigglypuffResult.data]);
            setPokemonList(listResult.data.results);
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
            {/*{pokemonList.map((pokemon) => (*/}
            {/*    <PokemonCard key={pokemon.id} currentPokemon={pokemon}/>*/}
            {/*))}*/}
            {pokemonList.map((pokemon) => (
            <p key={pokemon.name}>{pokemon.name}</p>
            ))}
        </>
    );
}

export default App
