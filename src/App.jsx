import { useEffect, useState } from "react";
import { Pokemon } from "./components/Pokemon/Pokemon";
import "./App.css";

export const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const limit = 20;

    // Function to get the details of each pokemon
    const fetchPokemonDetails = async (url) => {
        const resp = await fetch(url);
        const data = await resp.json();

        return {
            id: data.id,
            name: data.name,
            sprite: data.sprites.back_default,
            totalAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            weight: data.weight,
            height: data.height,
        };
    };

    // Function to get all de list of the pokemons
    const fetchPokemons = async (url) => {
        const resp = await fetch(url);
        const data = await resp.json();

        return data.results;
    };

    // Function to set the pokemons state with de custom pokemon object
    const createPokemons = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

        const pokemonsData = await fetchPokemons(url);

        const pokemonsCreated = await Promise.all(
            pokemonsData.map(async ({ url }) => {
                return await fetchPokemonDetails(url);
            })
        );

        setPokemons(pokemonsCreated);
        setIsLoading(true);
    };

    // Exec the funciont every time the offset change
    useEffect(() => {
        createPokemons();
    }, [offset]);

    return (
        <>
            <header>
                <h1>Pokemons</h1>
            </header>
            <main>
                <div className="pokemons-grid">
                    {pokemons.length ? (
                        pokemons.map((pokemon) => (
                            <Pokemon key={pokemon.id} pokemon={pokemon} />
                        ))
                    ) : isLoading ? (
                        <h2 className="loading">Loading...</h2>
                    ) : (
                        <h2 className="not-found">{"Theres not pokemons:("}</h2>
                    )}
                </div>
            </main>
            <div className="pagination-buttons">
                <button
                    className="button__prev"
                    onClick={() => setOffset(offset - limit)}
                    disabled={offset <= 0}
                >
                    previous
                </button>
                <button
                    className="button__next"
                    onClick={() => setOffset(offset + limit)}
                >
                    next
                </button>
            </div>
        </>
    );
};
