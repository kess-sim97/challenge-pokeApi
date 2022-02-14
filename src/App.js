import react, {useState, useEffect} from "react";
import { unmountComponentAtNode } from "react-dom";
import './App.css';
import Pokemons from "./components/Pokemons.js";
import './components/Pokemons.css';
import {getAllPokemon, getPokemon, getOnePokemonByName} from './services/pokemon';
import Details from './components/Details'
import Header from './components/Header'
import imgError from './image/error.png';

function App() {
    const [currentUrl, setCurrentUrl]= useState('');
    const [nextUrl, setNextUrl]= useState('');
    const [prevUrl, setPrevUrl]= useState('');
    const [loading, setLoading]= useState(true);
    const [name, setName]= useState('');
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=0'
    const urlSearch = 'https://pokeapi.co/api/v2/pokemon/'
    useEffect( () => {
        fetchData();
    },[]);

    async function fetchData() {
        let response = await getAllPokemon(initialUrl);
        setCurrentUrl(initialUrl);
        setNextUrl(response.next);
        setPrevUrl(response.previous);
        await loadingPokemon(response.results);
        setLoading(false);
     }

    const next = async () => {
        if(!nextUrl) return;
        setCurrentUrl(nextUrl);
        setLoading(true);
        let data = await getAllPokemon(nextUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const prev = async () => {
        if(!prevUrl) return;
        setCurrentUrl(prevUrl);
        setLoading(true);
        let data = await getAllPokemon(prevUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const back = async () => {
        setSelected(null);
        setLoading(true);
        let data = await getAllPokemon(currentUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }


const loadingPokemon= async (data) => {
    const newList = [];
    await Promise.all(data.map(async pokemon => {
        let pokemonRecord= await getPokemon(pokemon.url);
        newList.push(pokemonRecord);
    }));
   setList(newList);
};

const onChange = (e) =>{
    setName(e.target.value)
}

const getPokemonByName = async () => {
    setError(null);
    setSelected(null);
    setNextUrl(null);
    setPrevUrl(null);
    if(name===''){
        fetchData();
        return;
    }
    setLoading(true);
   
    const newList = [];

    try {
        let pokemon = await getOnePokemonByName(urlSearch+name.toLowerCase());
        newList.push(pokemon);
    } catch (error) {
        setError(error);
    }
    setList(newList);
    setLoading(false);
}

const details = (pokemon)=>{
    setSelected(pokemon);
}

return (
    <div>
        <Header getPokemonByName={getPokemonByName} onChange={onChange}></Header>
        <div className="btn-container" >
         {prevUrl && selected===null ? <button className="btn" onClick={prev}>Prev</button> : null}
         {nextUrl && selected===null ? <button className="btn" onClick={next}>Next</button> : null}
         {selected!==null ? <button className="btn" onClick={back}>Back</button> : null}
         {error!==null ? <div>
         <img className="img-error" src={imgError}/>
         <h1 className="error">something went wrong, please try again.</h1>
           </div>
          : null}
         </div>
    {
        loading 
        ? <h1 className="loading-container"> </h1> 
        :  selected!==null ? 
        <Details pokemon={selected}></Details> :<Pokemons list={list} details={details}></Pokemons>
    }

    </div>
);
}

export default App;