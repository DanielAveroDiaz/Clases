import { useState } from 'react';
import { PersonaCardDAD } from './PersonaCardDAD';
import type { Persona } from './PersonaCardDAD';
import { EditarUsuarioDAD } from './EditarUsuarioDAD';
import './GestionPersonasDAD.css';

export function GestionPersonasDAD() {
  const nombreAlumno: string = "Daniel Avero Díaz";

  // Estado inicial de tarjetas
  const [personas, setPersonas] = useState<Persona[]>([
    { id: 1, nombre: 'Marcos Alonso', email: 'marcos@empresa.com', departamento: 'Diseño & Multimedia', esFavorito: false },
    { id: 2, nombre: 'Elena Prieto', email: 'elena@empresa.com', departamento: 'Ingenieria & Software', esFavorito: true },
  ]);

  const [personaEnEdicion, setPersonaEnEdicion] = useState<Persona | null>(null);
  
  // Estado para el filtro por departamento (Ampliación)
  const [filtroDepartamento, setFiltroDepartamento] = useState<string>('TODOS');

  const departamentoPredeterminado: string = 'Diseño & Multimedia';
  const temaClase: string = 'tema-esmeralda';

  // Validación de correo único (excluyendo la propia persona si se está editando)
  const verificarEmailDuplicado = (email: string, idActual?: number): boolean => {
    return personas.some(p => p.email.toLowerCase() === email.toLowerCase() && p.id !== idActual);
  };

  // Manejador inmutable para Guardar (Alta o Modificación)
  const manejarGuardarPersona = (datosPersona: Omit<Persona, 'id'> | Persona) => {
    if ('id' in datosPersona) {
      setPersonas(
        personas.map((p) => (p.id === datosPersona.id ? (datosPersona as Persona) : p))
      );
      setPersonaEnEdicion(null);
    } else {
      const nuevaPersona: Persona = {
        ...datosPersona,
        id: Date.now(),
        esFavorito: false,
      };
      setPersonas([...personas, nuevaPersona]);
    }
  };

  const manejarEliminarPersona = (id: number) => {
    setPersonas(personas.filter((p) => p.id !== id));
    if (personaEnEdicion?.id === id) {
      setPersonaEnEdicion(null);
    }
  };

  // Conmutador de Favorito (Ampliación)
  const manejarToggleFavorito = (id: number) => {
    setPersonas(
      personas.map((p) => (p.id === id ? { ...p, esFavorito: !p.esFavorito } : p))
    );
  };

  // Filtrado de la lista de personas
  const personasFiltradas = filtroDepartamento === 'TODOS'
    ? personas
    : personas.filter((p) => p.departamento === filtroDepartamento);

  const totalFavoritos = personas.filter((p) => p.esFavorito).length;

  return (
    <div className={`gestion-contenedor ${temaClase}`}>
      <header className="cabecera-gestion">
        <h2>Práctica 05.02: Edición de Estado y Formularios Controlados</h2>
        <p><strong>Estudiante:</strong> {nombreAlumno}</p>
        <p>
          <small>
            Total registradas: {personas.length} | Filtradas: {personasFiltradas.length} | Favoritos: {totalFavoritos}
          </small>
        </p>
      </header>

      {/* Selector de filtro por departamento (Ampliación) */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
        <label htmlFor="filtro" style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#334155' }}>
          Filtrar por Departamento:
        </label>
        <select
          id="filtro"
          value={filtroDepartamento}
          onChange={(e) => setFiltroDepartamento(e.target.value)}
          style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
        >
          <option value="TODOS">Todos los departamentos</option>
          <option value="Diseño & Multimedia">Diseño & Multimedia</option>
          <option value="Ingenieria & Software">Ingenieria & Software</option>
          <option value="Gestión & Operaciones">Gestión & Operaciones</option>
        </select>
      </div>

      <div className="layout-personas">
        <EditarUsuarioDAD
          personaEnEdicion={personaEnEdicion}
          onGuardarPersona={manejarGuardarPersona}
          onCancelarEdicion={() => setPersonaEnEdicion(null)}
          departamentoPredeterminado={departamentoPredeterminado}
          verificarEmailDuplicado={verificarEmailDuplicado}
        />

        <div className="rejilla-tarjetas">
          {personasFiltradas.length === 0 ? (
            <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
              No hay personas registradas con este filtro.
            </p>
          ) : (
            personasFiltradas.map((persona) => (
              <PersonaCardDAD
                key={persona.id}
                persona={persona}
                estaEnEdicion={personaEnEdicion?.id === persona.id}
                onSeleccionarParaEditar={setPersonaEnEdicion}
                onEliminarPersona={manejarEliminarPersona}
                onToggleFavorito={manejarToggleFavorito}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}