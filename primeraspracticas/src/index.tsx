import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Practica3 from './Practica3';
import Practica4 from './Practica4';
import Practica5 from './Practica5';
import { RelojesMundiales } from './RelojesMundiales';
import ComponenteHora from './ComponenteHora';
import Contador from './Contador';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
    <hr />
    <h1>Hola mundo!, estamos haciendo nuestras primeras pruebas con React</h1>
    <hr />
    <Practica3 />
    <hr />
    <Practica4 num1={17} num2={21} />
    <hr />
    <Practica5 num1={10} num2={12} />
    <hr />
    <RelojesMundiales />
    <hr />
    <ComponenteHora />
    <hr />
    <Contador />
  </React.StrictMode>
);