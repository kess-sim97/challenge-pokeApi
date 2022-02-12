import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import './Card.css';
import HpIcon from '../image/hp.png';
import AttackIcon from '../image/attack.png';
import DefenseIcon from '../image/defense.png';

function Card({pokemon, details}) {
   return( 
    <div className='card-container' onClick={()=>details(pokemon)} >
        <div className="image-container">
            <img src={ pokemon.sprites.front_default}/>
        </div>
        <div className='name-container'>
            <h1>{pokemon.name}</h1>
        </div>
        <div className='types-container'>
            {
            pokemon.types.map(type => {
                return <span className={type.type.name}>{type.type.name}</span>
            })
            }
        </div>
        <div className="stat-container">
            {
                pokemon.stats.filter(
                    stat=> stat.stat.name==='hp'||
                    stat.stat.name==='attack'||
                    stat.stat.name==='defense' 
                    ).map(stat=>{
                    return(
                    <div>
                        {stat.stat.name==='hp'?
                        <img className='icon' src={HpIcon} alt={stat.stat.name} title={stat.stat.name}/>
                        : null}
                          {stat.stat.name==='attack'?
                        <img className='icon' src={AttackIcon} alt={stat.stat.name}title={stat.stat.name}/>
                        : null}
                          {stat.stat.name==='defense'?
                        <img className='icon' src={DefenseIcon} alt={stat.stat.name}title={stat.stat.name}/>
                        : null}
                        <span className={stat.stat.name}>{stat.base_stat}</span>
                    </div>
                    )
                })
               
            }
        </div>
    
    </div>
   )
}

export default Card;