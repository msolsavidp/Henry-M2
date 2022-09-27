import React from 'react';

export default function Card(max, min, name, img, onClose) {
  // acá va tu código
  return(<div>
    <button onClick = {onClose}> x </button>
    <h3>{name}</h3>
    <div>
      <h5>Min</h5>
      <p>{min}</p>
    </div>
    <div>
      <h5>Max</h5>
      <p>{max}</p>
    </div>
    <img src={`http://openweathermap.org/img/wn/${img}@2x.png`} alt='img'/>
  </div>
)};