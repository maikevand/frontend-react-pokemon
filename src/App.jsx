import './App.css'
import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonCard from "./components/PokemonCard/PokemonCard.jsx";

function App() {

    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [nextUrl, setNextUrl] = useState(null);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchPokemonList() {
        try {
            setLoading(true);
            setError("");

            const listResult = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);

            const twentyPokemon = listResult.data.results;
            const fullPokemonList = [];

            for (const pokemon of twentyPokemon) {
                const detailResult = await axios.get(pokemon.url);
                fullPokemonList.push(detailResult.data);
            }

            setPokemonList(fullPokemonList);
            setNextUrl(listResult.data.next);
            setPreviousUrl(listResult.data.previous);

        } catch (e) {
            console.error(e);
            setError("Er ging iets mis bij het ophalen van de Pokémon.");
        } finally {
            setLoading(false);
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

            {loading && <p>Pokémon worden geladen...</p>}

            {error && <p>{error}</p>}

            {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.id} currentPokemon={pokemon}/>
            ))}
        </>
    );
}

export default App
