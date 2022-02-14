import pokedex from '../image/pokedex.png';
import './Header.css';

function Header({getPokemonByName, onChange}) {
    return( 
        <header className="header-container">
        <img className="logo" src={pokedex} />
        <input 
        className="search" 
        type="text" 
        placeholder="Search You Favorite Pokemon..." 
        onKeyPress={(ev)=> {
            if(ev.key === "Enter") {
                ev.preventDefault();
                getPokemonByName();
             }}} 
        onChange={(e) => onChange(e)} />
        <input type="button" className="ok"  onSubmit={()=>getPokemonByName} onClick={()=>getPokemonByName()}/>
        <h1 className="catch">¡Catch Them All!</h1>
        </header>
    )}

    
export default Header;