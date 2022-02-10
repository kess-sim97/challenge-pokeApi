import react, {useState, useEffect} from "react";
import Card from "./Card";

const pokemons = ({list, prueba}) => {
   return( 

    <div className="pokemon-container">
           {
          list.map(pokemon => {
            return <Card pokemon={pokemon} prueba={prueba}></Card>
         })
         }
   </div>
   )}

   export default pokemons;