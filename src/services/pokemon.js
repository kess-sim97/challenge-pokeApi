export async function getAllPokemon(url){
    return fetch(url)
    .then(response => {
        return response.json()
    })
 }

 export async function getPokemon(url)  {
    return fetch(url)
    .then(response => {
        return response.json()
    })
 }

 export async function getOnePokemonByName(url)  {
     console.log(url);
    return fetch(url)
    .then(response => {
        if (!response.ok) throw Error(response.status);
        return response.json()
    })
}
