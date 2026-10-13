import React from 'react';
import { Reloj } from './Reloj';

export const RelojesMundiales = () => {
  return (
    <>
      <h1>Actividad react: Relojes mundiales</h1>
      <Reloj zona="Europe/Madrid" />
      <Reloj zona="America/New_York" />
      <Reloj zona="Europe/London" />
    </>
  );
};