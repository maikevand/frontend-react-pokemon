import "./PokemonCard.css"

function PokemonCard({currentPokemon}) {
    return (
        <>
            <article><h2>{currentPokemon.name}</h2></article>
            <img src={currentPokemon.sprites.front_default} alt={currentPokemon.name}/>
            <ul className="pokemon-features">
                <li>
                    Moves: {currentPokemon.moves.length}
                </li>
                <li>
                    Weight: {currentPokemon.weight}
                </li>
                <li>
                    Abilities:
                    <ul>
                        {currentPokemon.abilities.map((ability) => (
                            <li key={ability.ability.name}>
                                {ability.ability.name}
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default PokemonCard;

