import React from 'react';

export default function SearchBar({onSearch}) {
  // acá va tu código
  return <div>
    <input type='text' placeholder='Ciudad...'></input>
    //en el boton al usar la función onClick paso la función que va a ejecutarse al hacer click por una función flecha anónima para que no se dispare o autoejecute sin hacer click, sin para que lo haga en el momento de hacer click nada mas :
    <button onClick={()=> onSearch('Valor buscado')}>Agregar</button>
  </div>
};