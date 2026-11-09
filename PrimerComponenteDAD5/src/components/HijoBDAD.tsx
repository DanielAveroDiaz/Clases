
import { useState } from 'react';
import type { UsuarioRegistro } from './HijoADAD';

interface HijoBProps {
  usuarios: UsuarioRegistro[];
  onEliminarUsuario: (id: number) => void;
  onToggleActivo: (id: number) => void;
}

export function HijoBDAD({
  usuarios,
  onEliminarUsuario,
  onToggleActivo
}: HijoBProps) {

  // Estado para guardar el texto de búsqueda
  const [busqueda, setBusqueda] = useState<string>('');

  // Filtrar usuarios por nombre
  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="card-hijo-b">

      <h3>🖥️ Componente HijoB (Visualizador)</h3>

      <p>
        <small>
          Recibe el estado global actualizado desde el Padre.
        </small>
      </p>

      {/* Campo de búsqueda */}
      <div className="form-grupo">

        <label htmlFor="buscarUsuario">
          Buscar usuario por nombre:
        </label>

        <input
          id="buscarUsuario"
          type="text"
          className="form-input"
          placeholder="Escribe un nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.currentTarget.value)}
        />

      </div>

      {/* Comprobar si existen usuarios */}
      {usuarios.length === 0 ? (

        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          marginTop: '20px'
        }}>
          (No hay registros almacenados en el estado del Padre)
        </p>

      ) : usuariosFiltrados.length === 0 ? (

        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          marginTop: '20px'
        }}>
          No se encontraron usuarios con ese nombre.
        </p>

      ) : (

        <div className="lista-registros">

          {/* Mostrar usuarios filtrados */}
          {usuariosFiltrados.map((u) => (

            <div key={u.id} className="item-registro">

              <div>
                <strong>{u.nombre}</strong>

                <div style={{ marginTop: '2px' }}>
                  <span className="badge-rol">
                    {u.rol}
                  </span>
                </div>

                {/* Mostrar estado del usuario */}
                <div style={{ marginTop: '5px' }}>
                  Estado: {u.activo ? '🟢 Activo' : '🔴 Inactivo'}
                </div>

              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>

                {/* Botón para cambiar el estado */}
                <button
                  onClick={() => onToggleActivo(u.id)}
                  style={{
                    padding: '5px 8px',
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: u.activo ? '#ef4444' : '#10b981',
                    color: 'white'
                  }}
                >
                  {u.activo ? 'Desactivar' : 'Activar'}
                </button>

                {/* Botón para eliminar */}
                <button
                  className="btn-eliminar"
                  title="Eliminar registro"
                  onClick={() => onEliminarUsuario(u.id)}
                >
                  🗑️
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
