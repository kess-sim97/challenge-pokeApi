import react, {useState, useEffect} from "react";
import { unmountComponentAtNode } from "react-dom";
import './App.css';
import Pokemons from "./components/Pokemons.js";
import './components/Pokemons.css';
import {getAllPokemon, getPokemon, getOnePokemonByName} from './services/pokemon';
import Details from './components/Details'
import Header from './components/Header'
import imgError from './image/error.png';
import {BrowserRouter, Link, Route, Router, Routes, useNavigate } from "react-router-dom";


function App() {
    const [currentUrl, setCurrentUrl]= useState('');
    const [nextUrl, setNextUrl]= useState('');
    const [prevUrl, setPrevUrl]= useState('');
    const [loading, setLoading]= useState(true);
    const [name, setName]= useState('');
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=0'
    const urlSearch = 'https://pokeapi.co/api/v2/pokemon/'
    useEffect( () => {
        fetchData();
    },[]);

    async function fetchData() {
        let response = await getAllPokemon(initialUrl);
        setCurrentUrl(initialUrl);
        setNextUrl(response.next);
        // setPrevUrl(response.previous);
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

    // const prev = async () => {
    //     if(!prevUrl) return;
    //     setCurrentUrl(prevUrl);
    //     setLoading(true);
    //     let data = await getAllPokemon(prevUrl)
    //     await loadingPokemon(data.results)
    //     setNextUrl(data.next);
    //     setPrevUrl(data.previous);
    //     setLoading(false);
    // }

    const back = async () => {
        setSelected(null);
        //setLoading(true);
        //let data = await getAllPokemon(currentUrl)
        //await loadingPokemon(data.results)
        //setNextUrl(data.next);
        //setPrevUrl(data.previous);
        //setLoading(false);
        setError(null);
        navigate('/');
    }


const loadingPokemon= async (data) => {
    const newList = list;
    await Promise.all(data.map(async pokemon => {
      let pokemonRecord= await getPokemon(pokemon.url);
        newList.push(pokemonRecord)
     }));
     setList(newList);
   console.log(newList);
};

const onChange = (e) =>{
    setName(e.target.value)
}

const getPokemonByName = async () => {
    setError(null);
    setLoading(true);
    //setSelected(null);
    //setNextUrl(null);
    //setPrevUrl(null);
    if(name===''){
        fetchData();
        return;
    }
   
   
    //const newList = [];

    try {
        let pokemon = await getOnePokemonByName(urlSearch+name.toLowerCase());
        setSelected(pokemon);
        navigate("/"+pokemon.name);
        //newList.push(pokemon);
    } catch (error) {
        setError(error);
    }
    //setList(newList);
    setLoading(false);
}

const details = (pokemon)=>{
    setSelected(pokemon);
    navigate("/"+pokemon.name);
}

return (
    <div>
        <Header 
        getPokemonByName={getPokemonByName} 
        onChange={onChange}>
        </Header>
        <div className="btn-container" >
         {/* {prevUrl && selected===null && error===null ? <button className="btn" onClick={prev}>Prev</button> : null} */}
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