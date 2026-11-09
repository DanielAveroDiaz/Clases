import { useState } from 'react';
import './GeneradorNumerosDAD.css';

export function GeneradorNumerosDAD() {
  const nombreAlumno: string = "Daniel Avero Diaz";

  // 1. Estado para almacenar los números generados
  const [numeros, setNumeros] = useState<number[]>([]);

  // Configuración para el tema rojo y rango de 1 a 50
  const minimo: number = 1;
  const maximo: number = 50;
  const temaClase: string = 'tema-rojo';

  // 2. Generar un número aleatorio y añadirlo al historial
  const generarNuevoNumero = () => {
    const aleatorio =
      Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;

    setNumeros([...numeros, aleatorio]);
  };

  // 3. Limpiar el historial
  const limpiarHistorial = () => {
    setNumeros([]);
  };

  // 4. Calcular la media aritmética
  const mediaAritmetica: number =
    numeros.length === 0
      ? 0
      : numeros.reduce((suma, num) => suma + num, 0) / numeros.length;

  // 5. Calcular el valor máximo
  const valorMaximo: number =
    numeros.length === 0 ? 0 : Math.max(...numeros);

  // 6. Calcular el valor mínimo
  const valorMinimo: number =
    numeros.length === 0 ? 0 : Math.min(...numeros);

  // 7. Contar los números pares e impares
  const resultadoParesImpares = numeros.reduce(
    (acumulador, num) => {
      if (num % 2 === 0) {
        acumulador.pares++;
      } else {
        acumulador.impares++;
      }
      return acumulador;
    },
    { pares: 0, impares: 0 }
  );

  const cantidadPares = resultadoParesImpares.pares;
  const cantidadImpares = resultadoParesImpares.impares;

  return (
    <div className={`generador-contenedor ${temaClase}`}>

      {/* CABECERA */}
      <header className="cabecera-generador">
        <h2>
          Práctica 03.02: Estado Acumulativo e Inmutabilidad
        </h2>

        <p>
          <strong>Estudiante:</strong> {nombreAlumno}
        </p>

        <p>
          <small>
            Rango de generación asignado: [{minimo} - {maximo}]
          </small>
        </p>
      </header>

      {/* 8. BOTONES DE CONTROL */}
      <div className="panel-acciones">
        <button
          className="btn-generar"
          onClick={generarNuevoNumero}
        >
          🎲 Generar Número
        </button>

        <button
          className="btn-limpiar"
          onClick={limpiarHistorial}
        >
          🗑️ Limpiar Historial
        </button>
      </div>

      {/* 9. HISTORIAL DE NÚMEROS */}
      <div className="contenedor-historial">
        <h3>
          Historial de Números Generados ({numeros.length})
        </h3>

        {numeros.length === 0 ? (
          <p className="texto-vacio">
            El historial está vacío. Haz clic en "Generar Número" para comenzar.
          </p>
        ) : (
          <div className="rejilla-numeros">
            {numeros.map((num, index) => (
              <span key={index} className="ficha-numero">
                {num}
              </span>
            ))}
          </div>
        )}

        {/* 10. MEDIA ARITMÉTICA */}
        <div className="media-aritmetica">
          <h3>Media aritmética</h3>

          <p>
            Promedio de los números generados:{' '}
            <strong>{mediaAritmetica.toFixed(2)}</strong>
          </p>
        </div>

        {/* 11. VALOR MÁXIMO Y MÍNIMO */}
        <div className="estadisticas-numeros">
          <h3>Estadísticas de los números</h3>

          <p>
            Valor máximo generado:{' '}
            <strong>{valorMaximo}</strong>
          </p>

          <p>
            Valor mínimo generado:{' '}
            <strong>{valorMinimo}</strong>
          </p>
        </div>

        {/* 12. CONTADOR DE PARES E IMPARES */}
        <div className="estadisticas-numeros">
          <h3>Contador de Pares e Impares</h3>

          <p>
            Números pares:{' '}
            <strong>{cantidadPares}</strong>
          </p>

          <p>
            Números impares:{' '}
            <strong>{cantidadImpares}</strong>
          </p>
        </div>

      </div>
    </div>
  );
}