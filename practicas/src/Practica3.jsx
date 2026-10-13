import React from 'react';

const Practica3 = () => {
  const misDatos = {
    nombre: "Daniel",
    apellidos: "Avero Díaz ",
    estudios: "Desarrollo de Aplicaciones Web"
  };

  return (
    <>
      <h1>mis datos:</h1>
      <h4>{JSON.stringify(misDatos)}</h4>
    </>
  );
};

export default Practica3;