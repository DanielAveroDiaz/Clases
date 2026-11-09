import { useState } from 'react';
import { MostrarInputDAD } from './MostrarInputDAD';
import { OperarBotonesDAD } from './OperarBotonesDAD';
import './PanelAccionesDAD.css';

export function PanelAccionesDAD() {

  const nombreAlumno: string = "Daniel Avero Díaz";

  // Estado para guardar el texto actual
  const [texto, setTexto] = useState<string>('');

  // Estado para guardar el texto anterior
  const [textoAnterior, setTextoAnterior] = useState<string>('');

  /*
    CONFIGURACIÓN PERSONALIZADA SEGÚN TU INICIAL

    A-F: Duplicar Texto | tema-rojo
    G-M: Enmarcar Texto | tema-azul
    N-Z: Reemplazar Espacios por Guiones | tema-verde
  */

  const temaClase: string = 'tema-rojo';
  const etiquetaEspecial: string = 'Duplicar Texto';

  // Transformar el texto a mayúsculas
  const transformarMayusculas = () => {
    setTextoAnterior(texto);
    setTexto(texto.toUpperCase());
  };

  // Transformar el texto a minúsculas
  const transformarMinusculas = () => {
    setTextoAnterior(texto);
    setTexto(texto.toLowerCase());
  };

  // Invertir el texto
  const invertirTexto = () => {
    setTextoAnterior(texto);
    setTexto(texto.split('').reverse().join(''));
  };

  // Ejecutar la operación personalizada: duplicar texto
  const ejecutarOperacionEspecial = () => {
    setTextoAnterior(texto);
    setTexto(texto + texto);
  };

  // Limpiar el texto
  const limpiarTexto = () => {
    setTextoAnterior(texto);
    setTexto('');
  };

  // Deshacer la última transformación
  const deshacerCambios = () => {
    setTexto(textoAnterior);
    setTextoAnterior('');
  };

  // Contar el número total de caracteres
  const totalCaracteres = texto.length;

  // Contar el número total de palabras
  const totalPalabras = texto.split(/\s+/).filter(Boolean).length;

  // Eliminar espacios y convertir el texto a minúsculas
  const textoNormalizado = texto.toLowerCase().replace(/\s+/g, '');

  // Invertir el texto normalizado
  const textoInvertido = textoNormalizado.split('').reverse().join('');

  // Comprobar si el texto es un palíndromo
  const esPalindromo =
    textoNormalizado.length > 0 &&
    textoNormalizado === textoInvertido;

  return (
    <div className={`panel-contenedor ${temaClase}`}>

      {/* Cabecera */}
      <header className="cabecera-panel">

        <h2>
          Práctica 02.15: Lectura de Inputs y Disparo de Acciones
        </h2>

        <p>
          <strong>Estudiante:</strong> {nombreAlumno}
        </p>

      </header>

      {/* Subcomponente 1: Lectura de datos por evento */}
      <MostrarInputDAD
        valorTexto={texto}
        onCambiarTexto={setTexto}
      />

      {/* Subcomponente 2: Botonera de acciones */}
      <OperarBotonesDAD
        textoActual={texto}
        onConvertirMayusculas={transformarMayusculas}
        onConvertirMinusculas={transformarMinusculas}
        onInvertirTexto={invertirTexto}
        onEjecutarEspecial={ejecutarOperacionEspecial}
        onLimpiar={limpiarTexto}
        onDeshacer={deshacerCambios}
        puedeDeshacer={textoAnterior !== ''}
        etiquetaEspecial={etiquetaEspecial}
      />

      {/* Área de visualización del texto */}
      <div className="card-visor">

        <small style={{ color: '#94a3b8' }}>
          Estado Actual del Texto:
        </small>

        <p className="texto-resultado">
          {texto.trim().length > 0
            ? texto
            : '(Esperando entrada de texto...)'}
        </p>

      </div>

      {/* Detector de palíndromos */}
      {esPalindromo && (
        <div className="mensaje-palindromo">
          ¡Es un palíndromo!
        </div>
      )}

      {/* Barra informativa de caracteres y palabras */}
      <div className="barra-estadisticas">

        <span>
          Caracteres: <strong>{totalCaracteres}</strong>
        </span>

        <span>
          Palabras: <strong>{totalPalabras}</strong>
        </span>

      </div>

    </div>
  );
}
