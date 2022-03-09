import React, { createContext, useState } from 'react'


export const Context = createContext()

const Provider = ({ children }) => {  
    //aca va lo que quiero proveer.
    // setear las veces q le pego a la api? 
    const [currentUrl, setCurrentUrl]= useState('');
    const [nextUrl, setNextUrl]= useState('');
    const [selected, setSelected] = useState(null);
    const value = {
      //aca van las variables que voy a proveer. 
    currentUrl,
    setCurrentUrl,
    nextUrl,
    setNextUrl,
    selected,
    setSelected
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
  Provider,
  Context: Context.Consumer
}
