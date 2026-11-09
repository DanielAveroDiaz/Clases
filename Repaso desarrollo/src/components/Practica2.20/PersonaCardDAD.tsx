export interface Persona {
  id: number;
  nombre: string;
  email: string;
  departamento: string;
  esFavorito?: boolean;
}

interface PersonaCardProps {
  persona: Persona;
  estaEnEdicion: boolean;
  onSeleccionarParaEditar: (persona: Persona) => void;
  onEliminarPersona: (id: number) => void;
  onToggleFavorito: (id: number) => void;
}

export function PersonaCardDAD({
  persona,
  estaEnEdicion,
  onSeleccionarParaEditar,
  onEliminarPersona,
  onToggleFavorito,
}: PersonaCardProps) {
  return (
    <div className={`tarjeta-persona ${estaEnEdicion ? 'en-edicion' : ''}`}>
      <div>
        <div className="persona-header">
          <div className="persona-nombre">{persona.nombre}</div>
          <div className="persona-dept">📁 {persona.departamento}</div>
        </div>
        <p className="persona-email">✉️ {persona.email}</p>
        
        {/* Botón de Favorito (Ampliación) */}
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={() => onToggleFavorito(persona.id)}
            style={{
              background: persona.esFavorito ? '#f59e0b' : '#e2e8f0',
              color: persona.esFavorito ? '#ffffff' : '#334155',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 'bold',
            }}
          >
            {persona.esFavorito ? '⭐ Favorito' : '⭐ Agregar a favoritos'}
          </button>
        </div>
      </div>

      <div className="acciones-tarjeta">
        <button
          className="btn-accion-card btn-editar-card"
          onClick={() => onSeleccionarParaEditar(persona)}
        >
          ✏️ Editar
        </button>
        <button
          className="btn-accion-card btn-eliminar-card"
          onClick={() => onEliminarPersona(persona.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}