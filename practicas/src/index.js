import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Practica3 from './Practica3';
import Practica4 from './Practica4';
import Practica5 from './Practica5';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    <hr></hr>
    <h1>Hola mundo!, estamos haciendo nuestras primeras pruebas con React</h1>
    <hr></hr>
    <Practica3/>
    <hr></hr>
    <Practica4 num1={17} num2={21}/>
    <hr></hr>
    <Practica5 num1={10} num2={12}/>
    <hr></hr>
    
  </React.StrictMode>
);