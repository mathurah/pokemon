import React from "react";
import "./Cards.css";

function Card({ pokemon }) {
  return (
    <div className="card">
      <div>
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div>{pokemon.name}</div>
    </div>
  );
}

export default Card;
