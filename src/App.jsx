import './App.css'
import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonCard from "./components/PokemonCard/PokemonCard.jsx";

function App() {

    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [nextUrl, setNextUrl] = useState(null);
    const [previousUrl, setPreviousUrl] = useState(null);

    async function fetchPokemonList() {
        try {
            // const dittoResult = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
            // const jigglypuffResult = await axios.get("https://pokeapi.co/api/v2/pokemon/jigglypuff");
            const listResult = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
            console.log(listResult.data.results);
            // const detailRequests = listResult.data.results.map((pokemon) => {
            //     return axios.get(pokemon.url);
            // });
            // setPokemonList([dittoResult.data, jigglypuffResult.data]);
            // const firstPokemon = listResult.data.results[0];
            const twentyPokemon = listResult.data.results;
            // console.log(firstPokemon);
            const fullPokemonList = [];

            for (const pokemon of twentyPokemon) {
                const detailResult = await axios.get(pokemon.url);
                fullPokemonList.push(detailResult.data);
            }

            console.log(fullPokemonList);
            setPokemonList(fullPokemonList);
            setNextUrl(listResult.data.next);
            setPreviousUrl(listResult.data.previous);

            // const twentyPokemonDetails = await axios.get(twentyPokemon);
            // console.log(twentyPokemonDetails.data)
            // setPokemonList([twentyPokemonDetails.data]);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchPokemonList();
    }, [offset]);

    function handleNext() {
        setOffset(offset + 20);
    }

    function handlePrevious() {
        setOffset(offset - 20);
    }

    return (
        <>
            <h1>Gotta catch em all!</h1>

            <button type="button" onClick={handlePrevious} disabled={!previousUrl}>Vorige</button>
            <button type="button" onClick={handleNext} disabled={!nextUrl}>Volgende</button>

            {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.id} currentPokemon={pokemon}/>
            ))}
            {/*{pokemonList.map((pokemon) => (*/}
            {/*<p key={pokemon.name}>{pokemon.name}</p>*/}
            {/*))}*/}
        </>
    );
}

export default App
