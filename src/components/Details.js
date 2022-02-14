import React from "react";
import './Details.css';
import HpIcon from '../image/hp.png';
import AttackIcon from '../image/attack.png';
import DefenseIcon from '../image/defense.png';
import SpeedIcon from '../image/speed.png';
import AttackSpecialIcon from '../image/attack-special.png';
import DefenseSpecialIcon from '../image/defense-special.png';

function Details({pokemon}) {
    return( 
        <div className='details-container'>
          <div className="image-details">
            <img src={ pokemon.sprites.front_default}/>
        </div>
        <div className='name-details'>
            <h1>{pokemon.name}</h1>
        </div>
        <div className='types-details'>
            {
            pokemon.types.map(type => {
                return <span className={type.type.name}>{type.type.name}</span>
            })
            }
        </div>
        
        <div className="stat-details">
            {
                 pokemon.stats.filter(
                    stat=> stat.stat.name==='hp'||
                    stat.stat.name==='attack'||
                    stat.stat.name==='defense'||
                    stat.stat.name==='special-defense'||
                    stat.stat.name==='special-attack'||
                    stat.stat.name==='speed' 
                    ).map(stat=>{
                    return(
                    <div>
                        {stat.stat.name==='hp'?
                        <img className='icon-detail' src={HpIcon} alt={stat.stat.name} title={stat.stat.name}/>
                        : null}
                          {stat.stat.name==='attack'?
                        <img className='icon-detail' src={AttackIcon} alt={stat.stat.name}title={stat.stat.name}/>
                        : null}
                          {stat.stat.name==='defense'?
                        <img className='icon-detail' src={DefenseIcon} alt={stat.stat.name}title={stat.stat.name}/>
                        : null}
                        {stat.stat.name==='special-defense'?
                        <img className='iconSpecial-detail' src={DefenseSpecialIcon} alt={stat.stat.name} title={stat.stat.name}/>
                        : null}
                        {stat.stat.name==='special-attack'?
                        <img className='iconSpecial-detail' src={AttackSpecialIcon} alt={stat.stat.name} title={stat.stat.name}/>
                        : null}
                        {stat.stat.name==='speed'?
                        <img className='icon-detail' src={SpeedIcon} alt={stat.stat.name} title={stat.stat.name}/>
                        : null}
                        <span className='icon-detail'>{stat.base_stat}</span>
                    </div>
                    )
                })
            }
        </div>

        <div className="ability">
            <p >abilities:</p>
        {pokemon.abilities.map(ability => {
                return <p className="text" >{ability.ability.name} </p>
            }) }
            
        </div>

        <div className="features">
        <p > heigth: {pokemon.height/10}m</p>
        <p > weight: {pokemon.weight/10}kg</p>
        </div>

        </div>
    )
}
export default Details;