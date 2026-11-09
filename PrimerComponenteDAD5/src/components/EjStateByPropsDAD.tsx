
import { useState } from 'react';
import { HijoADAD } from './HijoADAD';
import type { UsuarioRegistro } from './HijoADAD';
import { HijoBDAD } from './HijoBDAD';
import './EjStateByPropsDAD.css';

export function EjStateByPropsDAD() {

  const nombreAlumno: string = "Daniel Avero Díaz";

  // ESTADO GLOBAL / ÚNICA FUENTE DE VERDAD
  const [usuarios, setUsuarios] = useState<UsuarioRegistro[]>([]);

  // CONFIGURACIÓN PERSONALIZADA SEGÚN TU INICIAL
  const rolPredeterminado: string = 'Desarrollador Frontend';
  const temaClase: string = 'tema-violeta';

  // 1. Función Callback para recibir nuevos usuarios desde HijoA
  const manejarAgregarUsuario = (nuevoUsuario: UsuarioRegistro) => {
    setUsuarios((usuariosAnteriores) => [
      ...usuariosAnteriores,
      nuevoUsuario
    ]);
  };

  // 2. Función Callback para eliminar usuarios
  const manejarEliminarUsuario = (idAEliminar: number) => {
    setUsuarios((usuariosAnteriores) =>
      usuariosAnteriores.filter((item) => item.id !== idAEliminar)
    );
  };

  // 3. Función Callback para activar o desactivar usuarios
  const manejarToggleActivo = (id: number) => {

    setUsuarios((usuariosAnteriores) =>
      usuariosAnteriores.map((item) =>
        item.id === id
          ? { ...item, activo: !item.activo }
          : item
      )
    );

    console.log('Se ha cambiado el estado del usuario:', id);
  };

  // 4. Calcular número de usuarios activos
  const usuariosActivos = usuarios.filter((item) => item.activo).length;

  // 5. Calcular número de usuarios inactivos
  const usuariosInactivos = usuarios.filter((item) => !item.activo).length;

  return (
    <div className={`padre-contenedor ${temaClase}`}>

      <header className="cabecera-padre">

        <h2>
          Práctica 05.01: Comunicación Hijo ➔ Padre y Levantamiento de Estado
        </h2>

        <p>
          <strong>Estudiante:</strong> {nombreAlumno}
        </p>

        <p>
          <small>
            Registros globales en el Padre: <strong>{usuarios.length}</strong>
          </small>
        </p>

        {/* Resumen de métricas */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '15px',
          flexWrap: 'wrap'
        }}>

          <div style={{
            padding: '12px 20px',
            backgroundColor: '#dcfce7',
            borderRadius: '8px',
            color: '#166534'
          }}>
            <strong>🟢 Usuarios activos</strong>
            <h2>{usuariosActivos}</h2>
          </div>

          <div style={{
            padding: '12px 20px',
            backgroundColor: '#fee2e2',
            borderRadius: '8px',
            color: '#991b1b'
          }}>
            <strong>🔴 Usuarios inactivos</strong>
            <h2>{usuariosInactivos}</h2>
          </div>

        </div>

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
          onToggleActivo={manejarToggleActivo}
        />

      </div>

    </div>
  );
}
