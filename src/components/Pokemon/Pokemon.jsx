import "./Pokemon.css";

export const Pokemon = ({ pokemon }) => {
    return (
        <div className="pokemon">
            <h2>{pokemon.name}</h2>
            <div className="pokemon-img">
                <img src={pokemon.sprite} alt="" />
            </div>
            <div className="pokemon-info">
                <p>
                    Weight: <span>{pokemon.weight}</span>
                </p>
                <p>
                    Height: <span>{pokemon.height}</span>
                </p>
                <p>
                    Abilities: <span>{pokemon.totalAbilities}</span>
                </p>
                <p>
                    Base experience: <span>{pokemon.baseExperience}</span>
                </p>
            </div>
        </div>
    );
};
