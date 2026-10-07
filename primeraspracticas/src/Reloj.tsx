import React from 'react';

type Props = {
  zona?: string;
};

export const Reloj = (props: Props) => {
  const zonaString = props.zona ?? "Europe/Madrid";
  const fecha = new Date().toLocaleString("es-ES", { timeZone: zonaString });

  return (
    <div>
      <h4>Hora de: {zonaString}</h4>
      <p>{fecha}</p>
    </div>
  );
};