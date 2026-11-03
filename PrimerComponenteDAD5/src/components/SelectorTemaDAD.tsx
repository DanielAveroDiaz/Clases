import { useState } from 'react';
// 1. Importación obligatoria de la hoja de estilos externa
import './SelectorTemaDAD.css'; // Sustituye LGD por tus iniciales


export function SelectorTemaDAD() {
  // 2. Estado local para almacenar el color seleccionado ('azul' por defecto)
  const [colorTema, setColorTema] = useState<string>('azul');


  // Datos personales para la cabecera
  const nombreAlumno: string = "Daniel Avero Díaz"; // Tu nombre real

  //Contador
  const [contadorCambios, setContadorCambios] = useState<number>(0);

  

  return (
    <div className="panel-contenedor">
      <h2>Control de Estilos Dinámicos</h2>
      <p><strong>Estudiante:</strong> {nombreAlumno}</p>
      
      {/* 3. Botonera para cambiar el estado */}
      <div className="panel-botones">
        <button
          className={`btn-color ${colorTema === 'rojo' ? 'btn-activo' : ''}`}
          style={{ backgroundColor: '#e53e3e', color: 'white' }}
          onClick={() => {
            setColorTema('rojo');
            setContadorCambios(contadorCambios +1 );
          }}
        >
          Rojo
        </button>


        <button
          className={`btn-color ${colorTema === 'verde' ? 'btn-activo' : ''}`}
          style={{ backgroundColor: '#38a169', color: 'white' }}
          onClick={() => {
            setColorTema('verde');
            setContadorCambios(contadorCambios + 1);
        }}
        >
          Verde
        </button>


        <button
          className={`btn-color ${colorTema === 'azul' ? 'btn-activo' : ''}`}
          style={{ backgroundColor: '#3182ce', color: 'white' }}
          onClick={() => {
            setColorTema('azul');
            setContadorCambios(contadorCambios + 1);
        }}
        >
          Azul
        </button>


        {/* Botón con tu tema personalizado */}
        <button
          className={`btn-color ${colorTema === 'naranja' ? 'btn-activo' : ''}`}
          style={{ backgroundColor: '#805ad5', color: 'white' }}
          onClick={() => {
            setColorTema('naranja');
            setContadorCambios(contadorCambios + 1);
          }}
        >
          Personal
        </button>
      </div>


      {/* 4. Área de presentación con inyección de clase CSS dinámica */}
      <div className={`area-presentacion tema-${colorTema}`}>
        <h3>Vista Previa del Tema</h3>
        <p>El tema activo actualmente es: <strong>{colorTema.toUpperCase()}</strong></p>
        <p>Clase CSS aplicada: <code>area-presentacion tema-{colorTema}</code></p>
        <p>
            Número de pulsaciones: <strong>{contadorCambios}</strong>    
        </p>
        {contadorCambios> 5? "¡Has probado más de 5 estilos!":""}
        <br/>
        <button
            className='btn-reset'
            style={{ 
                backgroundColor: '#3182ce', 
                color: 'white', 
                borderRadius: '6px', 
                border:'none', 
                padding: '10px 18px'  
            }}
            onClick={()=> setContadorCambios (0)}
        >
            Reset
        </button>
      </div>
    </div>
  );
}
