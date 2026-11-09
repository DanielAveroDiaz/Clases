import { useState } from 'react';


// Interfaces de tipado explícito
export interface UsuarioRegistro {
  id: number;
  nombre: string;
  rol: string;
  activo: boolean;
}


interface HijoAProps {
  onAgregarUsuario: (nuevoUsuario: UsuarioRegistro) => void;
  rolPredeterminado: string;
}


export function HijoADAD({ onAgregarUsuario, rolPredeterminado }: HijoAProps) {
  const [nombreInput, setNombreInput] = useState<string>('');
  const [rolInput, setRolInput] = useState<string>(rolPredeterminado);
  const [errorValidacion, setErrorValidacion] = useState<string>('');


  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    // 1. Saneamiento y Validación de Entrada
    const nombreLimpio = nombreInput.trim();
    if (nombreLimpio.length < 3) {
      setErrorValidacion('El nombre debe tener al menos 3 caracteres.');
      return;
    }


    // 2. Creación del objeto de registro
    const nuevoRegistro: UsuarioRegistro = {
      id: Date.now(),
      nombre: nombreLimpio,
      rol: rolInput,
      activo: true
    };


    // 3. COMUNICACIÓN HIJO -> PADRE: Invocación de callback pasada en props
    onAgregarUsuario(nuevoRegistro);


    // 4. Limpieza de campos locales
    setNombreInput('');
    setErrorValidacion('');
  };


  return (
    <div className="card-hijo-a">
      <h3>🧩 Componente HijoA (Formulario)</h3>
      <p><small>Captura datos y los emite al Padre mediante callback.</small></p>


      <form onSubmit={manejarEnvio}>
        <div className="form-grupo">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            id="nombre"
            type="text"
            className="form-input"
            placeholder="Ej. Carlos Mendoza"
            value={nombreInput}
            onChange={(e) => setNombreInput(e.currentTarget.value)}
          />
        </div>


        <div className="form-grupo">
          <label htmlFor="rol">Rol Asignado:</label>
          <select
            id="rol"
            className="form-select"
            value={rolInput}
            onChange={(e) => setRolInput(e.currentTarget.value)}
          >
            <option value="Desarrollador Frontend">Desarrollador Frontend</option>
            <option value="Diseñador UX/UI">Diseñador UX/UI</option>
            <option value="Administrador de Sistemas">Administrador de Sistemas</option>
          </select>
        </div>


        {errorValidacion && (
          <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: '5px 0' }}>
            {errorValidacion}
          </p>
        )}


        <button type="submit" className="btn-enviar">
          ➕ Enviar Registro al Padre
        </button>
      </form>
    </div>
  );
}
