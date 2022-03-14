import './App.css';
import Pokemons from "./components/Pokemons.js";
import './components/Pokemons.css';
import Details from './components/Details'
import Header from './components/Header'
import imgError from './image/error.png';
import { Route, Routes } from "react-router-dom";
import usePokemons from './Hooks/usePokemons';

function App() {
    const { getPokemonByName, selected, error, next, nextUrl, back, loading, onChange, details, list} = usePokemons()
    
return (
    <div>
        <Header 
        getPokemonByName={getPokemonByName} 
        onChange={onChange}>
        </Header>
        <div className="btn-container" >
         {selected!==null || error !== null ? <button className="btn" onClick={back}>Back</button> : null}
         {
         error!==null ? <div>
         <img className="img-error" src={imgError}/>
         <h1 className="error">something went wrong, please try again.</h1>
           </div>
          : null
          }
         </div>
         {
        loading 
        ? <h1 className="loading-container"> </h1> 
        :  null
       
    }
    <Routes>
        <Route path='/' element={error===null && loading===false ? <Pokemons list={list} details={details}></Pokemons> : null} >
        </Route>

        <Route path='/:name' element={error===null && loading===false ? <Details pokemon={selected}></Details> : null} >
        </Route>
    </Routes>
    <div className="btn-container" >
    {nextUrl && selected===null && error===null ? <button className="btn" onClick={next}>More</button> : null}
    </div>
    </div>
);
}

export default App;