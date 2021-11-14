import React, { useEffect, useState } from "react";
import tp from "../tipos";

const Card = ({ pokemon, name }) => {
  const [data, setData] = useState({});
  const getImg = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    setData({
      img: data.sprites.front_default,
      moves: data.moves.slice(0, 14),
      types: data.types,
    });
  };

  useEffect(() => {
    getImg();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{pokemon.name}</h3>
        <div className="types-img">
          <div className="type">
            {data.types &&
              data.types.map(({ type }) => (
                <span
                  key={type.name}
                  style={{
                    backgroundColor: tp.find(
                      (t) => t.type.toLowerCase() === type.name
                    ).color,
                  }}
                >
                  {type.name}
                </span>
              ))}
          </div>
          <img src={data.img && data.img} alt={pokemon.name} />
        </div>
        <h5>Moves:</h5>
        <div className="moves">
          {data.moves &&
            data.moves.map(({ move }) => <li key={move.name}>{move.name}</li>)}
        </div>
      </div>
    </div>
  );
};

export default Card;
