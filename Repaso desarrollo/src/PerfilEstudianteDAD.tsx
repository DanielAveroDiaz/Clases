function PerfilEstudianteDAD() {

  // Variables personales
  const nombreCompleto: string = "Daniel Avero Díaz";
  const modulo: string = "Diseño de Interfaces";

  const ultimosDigitosDNI: number = 542;

  // Cálculo de las notas
  const notaPractica1: number =
    7.0 + ((ultimosDigitosDNI % 10) * 0.25);

  const notaPractica2: number =
    8.0 + ((Math.floor(ultimosDigitosDNI / 10) % 10) * 0.15);

  const matriculado: boolean = true;

  // Cálculo de la nota media
  const notaMedia: number =
    (notaPractica1 + notaPractica2) / 2;

  // Control de asistencia
  const mesNacimiento: number = 9;
  const maxFaltasPermitidas: number = 12;
  const faltasRealizadas: number =
    Math.floor(mesNacimiento * 0.8);

  // Variables personalizadas para la beca
  const diaNacimiento: number = 17;
  const longitudPrimerApellido: number = 5;
  const codigoEstudiante: string =
    "DAD" + diaNacimiento;

  // Cálculos de la beca
  const importeBeca: number =
    (diaNacimiento * 40) + 300;

  const plusApellido: number =
    longitudPrimerApellido * 25;

  const becaTotal: number =
    importeBeca + plusApellido;

  // Comprobación de los requisitos
  const becaConcedida: boolean =
    notaMedia >= 6.0 && faltasRealizadas <= 4;

  return (
    <>
      <h2>Ficha de Evaluación Personalizada</h2>

      <p>
        <strong>Estudiante:</strong> {nombreCompleto}
      </p>

      <p>
        <strong>Identificador (DNI/NIA):</strong>{" "}
        ***{ultimosDigitosDNI}
      </p>

      <p>
        <strong>Módulo actual:</strong> {modulo}
      </p>

      <h3>Calificaciones Calculadas</h3>

      <ul>
        <li>
          Práctica 1: {notaPractica1.toFixed(2)}
        </li>

        <li>
          Práctica 2: {notaPractica2.toFixed(2)}
        </li>

        <li>
          <strong>Nota Media Calculada:</strong>{" "}
          {notaMedia.toFixed(2)}
        </li>
      </ul>

      {/* Estado de la matrícula */}
      <p>
        <strong>Estado de la matrícula:</strong>{" "}
        {matriculado ? "Activa" : "Inactiva"}
      </p>

      {/* Control de asistencia */}
      <p>
        <strong>Mes de nacimiento:</strong>{" "}
        {mesNacimiento}
      </p>

      <p>
        <strong>Asistencia:</strong>{" "}
        {faltasRealizadas} faltas realizadas.{" "}
        Faltas restantes:{" "}
        {maxFaltasPermitidas - faltasRealizadas}.{" "}

        {maxFaltasPermitidas - faltasRealizadas > 5
          ? "Asistencia Correcta"
          : "Atención: Límite cercano"}
      </p>

      {/* Cálculo de la beca */}
      <h3>
        Cálculo Individual de Beca ({codigoEstudiante})
      </h3>

      <p>
        <strong>Importe base de la beca:</strong>{" "}
        {importeBeca}€
      </p>

      <p>
        <strong>Plus por longitud de apellido:</strong>{" "}
        {plusApellido}€
      </p>

      <p>
        <strong>Importe total estimado de la beca:</strong>{" "}
        {becaTotal}€
      </p>

      {/* Renderizado condicional y estilos dinámicos */}
      {becaConcedida
        ? (
          <p
            style={{
              color: "green",
              fontWeight: "bold"
            }}
          >
            {`Elegible para Beca: Concedidos ${becaTotal}€ para el curso actual.`}
          </p>
        )
        : (
          <p
            style={{
              color: "red",
              fontWeight: "bold"
            }}
          >
            {"Elegible para Beca: Solicitud Denegada (No cumple requisitos de nota/asistencia)."}
          </p>
        )
      }
    </>
  );
}

export default PerfilEstudianteDAD;