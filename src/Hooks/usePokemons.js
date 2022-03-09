import { useState, useEffect, useContext } from 'react'
import { Context as PokeContext } from '../context/pokeContext';
import {getAllPokemon, getPokemon, getOnePokemonByName} from '../services/pokeServices';
import {useNavigate} from 'react-router-dom';


const usePokemons = () => {
    const {
      //aca van las variables que toma el provider
        currentUrl,
        setCurrentUrl,
        nextUrl,
        setNextUrl,
        selected,
        setSelected
    } = useContext(PokeContext)
    //aca se setean las variables de arriba
    const [prevUrl, setPrevUrl]= useState('');
    const [loading, setLoading]= useState(true);
    const [name, setName]= useState('');
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    //aca van los demas matodos get y demas

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

    const back = async () => {
        setSelected(null);
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
    return {
       // aca retorna todas las variables que setea en los metodos
       getOnePokemonByName,
       getAllPokemon,
       currentUrl,
       setCurrentUrl,
       nextUrl,
       setNextUrl,
       selected,
       setSelected,
       prevUrl,
       loading,
       name, 
       list,
       error,
       navigate,
       details,
       next,
       back,
       getPokemonByName,
       onChange
      }
    }
    
    export default usePokemons