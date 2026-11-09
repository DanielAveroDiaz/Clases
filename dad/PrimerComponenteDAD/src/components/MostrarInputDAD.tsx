import React from 'react';


interface MostrarInputProps {
  valorTexto: string;
  onCambiarTexto: (nuevoTexto: string) => void;
}


export function MostrarInputDAD({ valorTexto, onCambiarTexto }: MostrarInputProps) {
  const manejarEscritura = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Inspección directa y segura del objeto del evento sin manipular el DOM
    onCambiarTexto(e.currentTarget.value);
  };


  return (
    <div className="card-input">
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
        Escribe un texto o palabra:
      </label>
      <input
        type="text"
        className="input-controlado"
        placeholder="Escribe aquí para modificar el estado..."
        value={valorTexto}
        onChange={manejarEscritura}
      />
    </div>
  );
}
