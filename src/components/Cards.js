import React from 'react';

function Card({ pokemon }) {
    return (
      <div className="Card">
        <div className="Card__img">
          <img src={pokemon.sprites.front_default} alt="" />
        </div>
        <div className="Card__name">
          {pokemon.name}
        </div>
      </div>
    )
  }
  
  export default Card;