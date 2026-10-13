
interface TarjetaAlumnoDADProps {
  nombreCompleto: string;
  niaNumero: number;
  moduloFavorito?: string;
  horasEstudioDiarias?: number | null;
}

function TarjetaAlumnoDAD({
  nombreCompleto,
  niaNumero,
  moduloFavorito,
  horasEstudioDiarias
}: TarjetaAlumnoDADProps) {

  // Valores por defecto utilizando ??
  const modulo = moduloFavorito ?? "No especificado";
  const horasDiarias = horasEstudioDiarias ?? 0;

  // Cálculo de las horas semanales (5 días)
  const horasSemanales = horasDiarias * 5;

  return (
    <>
      <h2>Tarjeta del Alumno</h2>

      <p>
        <strong>Nombre completo:</strong> {nombreCompleto}
      </p>

      <p>
        <strong>NIA/NIF/DNI:</strong> ***{niaNumero}
      </p>

      <p>
        <strong>Módulo favorito:</strong> {modulo}
      </p>

      <p>
        <strong>Horas de estudio diarias:</strong> {horasDiarias}
      </p>

      <p>
        <strong>Horas de estudio semanales:</strong> {horasSemanales}
      </p>
    </>
  );
}

export default TarjetaAlumnoDAD;
