import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [interval, setInterval] = useState({
    offset: 0,
    limit: 100,
  });
  const [pokemon, setPokemon] = useState("");

  const getPokemons = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${interval.offset}&limit=${interval.limit}`
    );
    const data = await res.json();
    setPokemons(data.results);
  };

  useEffect(() => {
    getPokemons();
  }, [interval]);

  const handleChange = (e) => {
    const { value } = e.target;
    setPokemon(value.toLowerCase());
  };

  const submitPokemon = async (e) => {
    e.preventDefault();
    try {
      if (pokemon !== "") {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await res.json();
        setPokemons([data]);
        setPokemon("");
      }
    } catch (error) {
      console.log(error);
      setPokemons([]);
      setPokemon("");
    }
  };

  const click = (direction) => {
    if (direction === "prev") {
      setInterval({
        ...interval,
        offset: interval.offset - 100,
        limit: interval.limit - 100,
      });
    } else if (direction === "next") {
      setInterval({
        ...interval,
        offset: interval.offset + 100,
        limit: interval.limit + 100,
      });
    } else {
      setInterval({
        ...interval,
        offset: 0,
        limit: 100,
      });
    }
  };

  return (
    <div className="app container">
      <div className="title">
        <h1>Poké - API</h1>
        <img
          src="https://studio.cults3d.com/xq7ujVHg4nZNXZSoSrLEfk8QYNY=/https://files.cults3d.com/uploaders/14358643/illustration-file/d297497f-58f4-4134-a901-cea92d05496f/Pokeball-medium-Res.png"
          alt="PokeBall"
        />
      </div>
      <hr />

      <form onSubmit={submitPokemon} className="form">
        <div className="form-group">
          <label htmlFor="search">Search:</label>
          <input
            autoComplete="off"
            type="text"
            className="form-control"
            id="search"
            onChange={handleChange}
            placeholder="Ej. Bulbasaur"
            value={pokemon}
          />
          <button type="submit" className="btn">
            Go
          </button>
        </div>
      </form>
      <div className={pokemons.length <= 1 ? "hidden" : "buttons"}>
        <button
          onClick={(e) => click("prev")}
          disabled={interval.offset === 0 ? true : false}
          className="btn"
        >
          Prev
        </button>
        <button onClick={(e) => click("next")} className="btn">
          Next
        </button>
      </div>

      <section className="list">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <Card key={pokemon.name} pokemon={pokemon} name={pokemon.name} />
          ))
        ) : (
          <>
            <h2>No existe ese Pokemon</h2>
            <button onClick={(e) => click("lista")} className="btn">
              Voler a la lista
            </button>
          </>
        )}
      </section>
      {pokemons.length === 1 && (
        <button onClick={(e) => click("lista")} className="btn">
          Lista
        </button>
      )}
      <div className={pokemons.length <= 1 ? "hidden" : "buttons"}>
        <button
          onClick={(e) => click("prev")}
          disabled={interval.offset === 0 ? true : false}
          className="btn"
        >
          Prev
        </button>
        <button onClick={(e) => click("next")} className="btn">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
