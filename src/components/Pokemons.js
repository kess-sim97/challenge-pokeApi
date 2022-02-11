import react, {useState, useEffect} from "react";
import Card from "./Card";


const pokemons = ({list, details}) => {
   return( 

    <div className="pokemon-container">
           {
          list.map(pokemon => {
            return <Card pokemon={pokemon} details={details}></Card>
         })
         }
   </div>
   )}

   export default pokemons;