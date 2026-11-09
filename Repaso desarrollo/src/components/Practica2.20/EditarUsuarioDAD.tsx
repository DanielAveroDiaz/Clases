import React, { useState, useEffect } from 'react';
import type { Persona } from './PersonaCardDAD';

interface EditarUsuarioProps {
  personaEnEdicion: Persona | null;
  onGuardarPersona: (persona: Omit<Persona, 'id'> | Persona) => void;
  onCancelarEdicion: () => void;
  departamentoPredeterminado: string;
  verificarEmailDuplicado: (email: string, idActual?: number) => boolean;
}

export function EditarUsuarioDAD({
  personaEnEdicion,
  onGuardarPersona,
  onCancelarEdicion,
  departamentoPredeterminado,
  verificarEmailDuplicado,
}: EditarUsuarioProps) {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [departamento, setDepartamento] = useState<string>(departamentoPredeterminado);
  const [errorValidacion, setErrorValidacion] = useState<string>('');

  useEffect(() => {
    if (personaEnEdicion) {
      setNombre(personaEnEdicion.nombre);
      setEmail(personaEnEdicion.email);
      setDepartamento(personaEnEdicion.departamento);
      setErrorValidacion('');
    } else {
      limpiarFormulario();
    }
  }, [personaEnEdicion, departamentoPredeterminado]);

  const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setDepartamento(departamentoPredeterminado);
    setErrorValidacion('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim()) {
      setErrorValidacion('Todos los campos son obligatorios.');
      return;
    }

    // Validación de correo único (Ampliación)
    const idExcluir = personaEnEdicion ? personaEnEdicion.id : undefined;
    if (verificarEmailDuplicado(email.trim(), idExcluir)) {
      setErrorValidacion('⚠️ El correo electrónico ya está registrado por otra persona.');
      return;
    }

    if (personaEnEdicion) {
      onGuardarPersona({
        id: personaEnEdicion.id,
        nombre: nombre.trim(),
        email: email.trim(),
        departamento,
        esFavorito: personaEnEdicion.esFavorito,
      });
    } else {
      onGuardarPersona({
        nombre: nombre.trim(),
        email: email.trim(),
        departamento,
        esFavorito: false,
      });
      limpiarFormulario();
    }
  };

  return (
    <div className={`card-formulario ${personaEnEdicion ? 'modo-edicion' : ''}`}>
      <h3>{personaEnEdicion ? '✏️ Editar Persona' : '+ Alta de Persona'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="campo-grupo">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            id="nombre"
            type="text"
            className="campo-input"
            value={nombre}
            onChange={(e) => setNombre(e.currentTarget.value)}
            placeholder="Ej. Ana Belén Gómez"
          />
        </div>

        <div className="campo-grupo">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            id="email"
            type="email"
            className="campo-input"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="ana@empresa.com"
          />
        </div>

        <div className="campo-grupo">
          <label htmlFor="dept">Departamento:</label>
          <select
            id="dept"
            className="campo-select"
            value={departamento}
            onChange={(e) => setDepartamento(e.currentTarget.value)}
          >
            <option value="Diseño & Multimedia">Diseño & Multimedia</option>
            <option value="Ingenieria & Software">Ingenieria & Software</option>
            <option value="Gestión & Operaciones">Gestión & Operaciones</option>
          </select>
        </div>

        {errorValidacion && (
          <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: '5px 0' }}>
            {errorValidacion}
          </p>
        )}

        <div className="panel-botones-form">
          <button type="submit" className="btn-guardar">
            {personaEnEdicion ? 'Actualizar Ficha' : 'Guardar Ficha'}
          </button>
          {personaEnEdicion && (
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => {
                limpiarFormulario();
                onCancelarEdicion();
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}