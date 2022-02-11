import React from "react";
import './Details.css';

function Details({pokemon}) {
    return( 
        <div className='details-container'>
          <div className="image">
            <img src={ pokemon.sprites.front_default}/>
        </div>
        <div className='name'>
            <h1>{pokemon.name}</h1>
        </div>
        <div className='types'>
            {
            pokemon.types.map(type => {
                return <span className={type.type.name}>{type.type.name}</span>
            })
            }
        </div>
        
        <div className="stat">
            {
            pokemon.stats.map(stat => {
                return <span> { stat.stat.name}: {stat.base_stat} </span>
            })
            }
        </div>

        <div className="ability">
            <p>abilities:</p>
        {pokemon.abilities.map(ability => {
                return <p>{ability.ability.name} </p>
            }) }
            
        </div>

        <div className="features">
        <p> heigth: {pokemon.height/10}m</p>
        <p> weight: {pokemon.weight/10}kg</p>
        </div>

        </div>
    )
}
export default Details;