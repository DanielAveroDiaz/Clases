import type { UsuarioRegistro } from './HijoADAD'; // Importa la interface


interface HijoBProps {
  usuarios: UsuarioRegistro[];
  onEliminarUsuario: (id: number) => void;
}


export function HijoBDAD({ usuarios, onEliminarUsuario }: HijoBProps) {
  return (
    <div className="card-hijo-b">
      <h3>🖥️ Componente HijoB (Visualizador)</h3>
      <p><small>Recibe el estado global actualizado desde el Padre.</small></p>


      {/* Renderizado condicional con && */}
      {usuarios.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '20px' }}>
          *(No hay registros almacenados en el estado del Padre)*
        </p>
      ) : (
        <div className="lista-registros">
          {/* Mapeo dinámico con atributo key obligatorio */}
          {usuarios.map((u) => (
            <div key={u.id} className="item-registro">
              <div>
                <strong>{u.nombre}</strong>
                <div style={{ marginTop: '2px' }}>
                  <span className="badge-rol">{u.rol}</span>
                </div>
              </div>


              {/* Botón que solicita la eliminación invocando callback hacia el Padre */}
              <button
                className="btn-eliminar"
                title="Eliminar registro"
                onClick={() => onEliminarUsuario(u.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
