import { useState } from 'react';
import './ContadorTabla2DAD.css';

export function ContadorTabla2DAD() {
  const nombreAlumno: string = "Daniel Avero Díaz";

  // 1. Estado para el contador libre
  const [contador, setContador] = useState<number>(0);

  // 2. Estado para la tabla del 2
  const [multiplicador, setMultiplicador] = useState<number>(1);

  // 3. Estado para contar todos los clics
  const [totalClics, setTotalClics] = useState<number>(0);

  // 4. Estado para ocultar o mostrar el resultado
  const [ocultarResultado, setOcultarResultado] =
    useState<boolean>(false);

  // Configuración personalizada
  const limiteMaximo: number = 10;
  const temaClase: string = 'tema-verde';

  // Registrar un clic
  const registrarClic = () => {
    setTotalClics(totalClics + 1);
  };

  // Avanzar en la tabla del 2
  const avanzarTabla = () => {
    if (multiplicador < limiteMaximo) {
      setMultiplicador(multiplicador + 1);
    } else {
      setMultiplicador(1);
    }
  };

  // Retroceder en la tabla del 2
  const retrocederTabla = () => {
    if (multiplicador > 1) {
      setMultiplicador(multiplicador - 1);
    } else {
      setMultiplicador(limiteMaximo);
    }
  };

  // Indicar si el contador es par o impar
  function parImpar() {
    if (contador % 2 === 0) {
      return "Número par";
    } else {
      return "Número impar";
    }
  }

  return (
    <div className="practica-contenedor">

      <header className="cabecera-practica">
        <h2>Práctica 03.01: Estado y Eventos en React</h2>
        <p>
          <strong>Estudiante:</strong> {nombreAlumno}
        </p>
      </header>

      {/* EJERCICIO 1: CONTADOR LIBRE */}
      <section className="seccion-card">
        <h3>1. Contador Interactivo</h3>

        <div className="pantalla-numero">
          {contador}
        </div>

        <div className="panel-botones">
          <button
            className="btn-accion btn-restar"
            onClick={() => {
              registrarClic();
              setContador(contador - 1);
            }}
          >
            Disminuir (-1)
          </button>

          <button
            className="btn-accion btn-reset"
            onClick={() => {
              registrarClic();
              setContador(0);
            }}
          >
            Restablecer (0)
          </button>

          <button
            className="btn-accion btn-sumar"
            onClick={() => {
              registrarClic();
              setContador(contador + 1);
            }}
          >
            Aumentar (+1)
          </button>
        </div>

        <small>{parImpar()}</small>
      </section>

      {/* EJERCICIO 2: TABLA DEL 2 */}
      <section className="seccion-card">
        <h3>2. Aprendizaje Activo: Tabla del 2</h3>

        <p>
          Haz clic para avanzar en la tabla de multiplicar
          de forma secuencial:
        </p>

        <div className="visor-operacion">
          <span className="expresion-matematica">
            2 × {multiplicador} =
          </span>

          <span className={`resultado-destacado ${temaClase}`}>
            {ocultarResultado ? "?" : 2 * multiplicador}
          </span>
        </div>

        <div className="panel-botones">
          <button
            className="btn-accion btn-reset"
            onClick={() => {
              registrarClic();
              retrocederTabla();
            }}
          >
            ⬅️ Anterior
          </button>

          <button
            className={`btn-accion btn-siguiente ${temaClase}`}
            onClick={() => {
              registrarClic();
              avanzarTabla();
            }}
          >
            Siguiente Paso ➡️
          </button>

          <button
            className="btn-accion btn-reset"
            onClick={() => {
              registrarClic();
              setMultiplicador(1);
            }}
          >
            Reiniciar Tabla
          </button>

          <button
            className="btn-accion btn-reset"
            onClick={() => {
              registrarClic();
              setOcultarResultado(!ocultarResultado);
            }}
          >
            {ocultarResultado
              ? "Mostrar Respuesta"
              : "Ocultar Resultado"}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          <small>Límite configurado: 2 × {limiteMaximo}</small>
        </p>
      </section>

      {/* EJERCICIO 3: CONTADOR TOTAL DE CLICS */}
      <section className="seccion-card">
        <h3>3. Contador Total de Clics</h3>

        <div className="pantalla-numero">
          {totalClics}
        </div>

        <p style={{ textAlign: 'center' }}>
          Has realizado <strong>{totalClics}</strong> clics
          en total.
        </p>
      </section>

    </div>
  );
}
