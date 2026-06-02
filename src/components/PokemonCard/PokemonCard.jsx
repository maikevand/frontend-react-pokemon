import "./PokemonCard.css"

function PokemonCard({name, sprites, moves, weight, abilities}) {
    return (
        <>
            <article><h2>{name}</h2></article>
            <img src={sprites.front_default} alt={name}/>
            <ul className="pokemon-features">
                <li>
                    Moves: {moves.length}
                </li>
                <li>
                    Weight: {weight}
                </li>
                <li>
                    Abilities:
                    <ul>
                        {abilities.map((ability) => (
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

