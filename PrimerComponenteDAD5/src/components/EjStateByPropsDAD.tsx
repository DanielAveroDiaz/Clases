import { useState } from 'react';
import { HijoADAD } from './HijoADAD';
import type { UsuarioRegistro } from './HijoADAD';
import { HijoBDAD } from './HijoBDAD';
import './EjStateByPropsDAD.css'; // Sustituye LGD por tus iniciales


export function EjStateByPropsDAD() {
  const nombreAlumno: string = "Daniel Avero Díaz"; // Tu nombre real


  // ESTADO GLOBAL / ÚNICA FUENTE DE VERDAD
  const [usuarios, setUsuarios] = useState<UsuarioRegistro[]>([]);


  /* === CONFIGURACIÓN PERSONALIZADA SEGÚN TU INICIAL ===
     Si tu nombre empieza por:
     - A-F: Rol Predeterminado = 'Desarrollador Frontend'       | temaClase = 'tema-violeta'
     - G-M: Rol Predeterminado = 'Diseñador UX/UI'             | temaClase = 'tema-azul'
     - N-Z: Rol Predeterminado = 'Administrador de Sistemas'   | temaClase = 'tema-verde'
  */
  const rolPredeterminado: string = 'Desarrollador Frontend';
  const temaClase: string = 'tema-violeta';


  // 1. Función Callback para recibir nuevos usuarios desde HijoA (Inmutabilidad)
  const manejarAgregarUsuario = (nuevoUsuario: UsuarioRegistro) => {
    setUsuarios([...usuarios, nuevoUsuario]);
  };


  // 2. Función Callback para eliminar usuarios solicitados desde HijoB
  const manejarEliminarUsuario = (idAEliminar: number) => {
    setUsuarios(usuarios.filter((item) => item.id !== idAEliminar));
  };


  return (
    <div className={`padre-contenedor ${temaClase}`}>
      <header className="cabecera-padre">
        <h2>Práctica 05.01: Comunicación Hijo ➔ Padre y Levantamiento de Estado</h2>
        <p><strong>Estudiante:</strong> {nombreAlumno}</p>
        <p><small>Registros globales en el Padre: <strong>{usuarios.length}</strong></small></p>
      </header>


      {/* Grid bidireccional conectando HijoA e HijoB */}
      <div className="grid-comunicacion">
        {/* Componente Capturador (Emisor) */}
        <HijoADAD
          onAgregarUsuario={manejarAgregarUsuario}
          rolPredeterminado={rolPredeterminado}
        />


        {/* Componente Visualizador (Receptor) */}
        <HijoBDAD
          usuarios={usuarios}
          onEliminarUsuario={manejarEliminarUsuario}
        />
      </div>
    </div>
  );
}
