import { useState } from 'react';
import { MostrarInputDAD } from './MostrarInputDAD';
import { OperarBotonesDAD } from './OperarBotonesDAD';
import './PanelAccionesDAD.css';

export function PanelAccionesDAD() {
  const nombreAlumno: string = "Daniel Avero Díaz";

  const [texto, setTexto] = useState<string>('');
  const [textoAnterior, setTextoAnterior] = useState<string>('');

  const temaClase: string = '';
  const etiquetaEspecial: string = 'Duplicar Texto';

  // Función auxiliar para actualizar guardando el estado previo (Undo)
  const actualizarConHistorial = (nuevoTexto: string) => {
    setTextoAnterior(texto);
    setTexto(nuevoTexto);
  };

  const ejecutarOperacionEspecial = () => {
    actualizarConHistorial(texto + texto);
  };

  const transformarMayusculas = () => {
    actualizarConHistorial(texto.toUpperCase());
  };

  const transformarMinusculas = () => {
    actualizarConHistorial(texto.toLowerCase());
  };

  const invertirTexto = () => {
    actualizarConHistorial(texto.split('').reverse().join(''));
  };

  const limpiarTexto = () => {
    actualizarConHistorial('');
  };

  const deshacerCambios = () => {
    setTexto(textoAnterior);
  };

  // Cálculos de ampliación (Palíndromo, Caracteres y Palabras)
  const textoLimpio = texto.replace(/[\sW_]/g, '').toLowerCase();
  const esPalindromo = textoLimpio.length > 0 && textoLimpio === textoLimpio.split('').reverse().join('');
  const totalPalabras = texto.split(/\s+/).filter(Boolean).length;

  return (
    <div className={`panel-contenedor ${temaClase}`}>
      <header className="cabecera-panel">
        <h2>Práctica 02.15: Lectura de Inputs y Disparo de Acciones</h2>
        <p><strong>Estudiante:</strong> {nombreAlumno}</p>
      </header>

      {/* Subcomponente 1: Lectura */}
      <MostrarInputDAD
        valorTexto={texto}
        onCambiarTexto={(nuevo) => actualizarConHistorial(nuevo)}
      />

      {/* Subcomponente 2: Botonera */}
      <OperarBotonesDAD
        textoActual={texto}
        onConvertirMayusculas={transformarMayusculas}
        onConvertirMinusculas={transformarMinusculas}
        onInvertirTexto={invertirTexto}
        onEjecutarEspecial={ejecutarOperacionEspecial}
        onLimpiar={limpiarTexto}
        onDeshacer={deshacerCambios}
        etiquetaEspecial={etiquetaEspecial}
      />

      {/* Área de Visualización */}
      <div className="card-visor">
        <small style={{ color: '#94a3b8' }}>Estado Actual del Texto:</small>
        <p className="texto-resultado">
          {texto.trim().length > 0 ? texto : '*(Esperando entrada de texto...)*'}
        </p>

        {/* Detector de Palíndromos */}
        {esPalindromo && (
          <p style={{ color: '#4ade80', fontWeight: 'bold', marginTop: '10px' }}>
            ¡Es un palindromo!
          </p>
        )}
      </div>

      {/* Barra Informativa de Caracteres y Palabras */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px', background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#334155', fontWeight: 'bold' }}>
        <span>Caracteres: {texto.length}</span>
        <span>Palabras: {totalPalabras}</span>
      </div>
    </div>
  );
}