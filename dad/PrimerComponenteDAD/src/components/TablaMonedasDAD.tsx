import { useState } from 'react';

import './TablaMonedasDAD.css';

// Modelo de datos para cada divisa
interface Moneda {
  id: string;
  nombre: string;
  simbolo: string;
  tasaCambio: number;
  tendencia: 'alza' | 'baja';
}

export function TablaMonedasDAD() {

  const nombreAlumno: string = "Daniel Avero Díaz";

  // Estado para el importe base de conversión
  const [montoBase, setMontoBase] = useState<number>(100);

  // Estado para el filtro de tendencia
  const [filtroTendencia, setFiltroTendencia] = useState<
    'todas' | 'alza' | 'baja'
  >('todas');

  /*
    Estado que contiene todas las monedas.
    Ahora monedas es un estado para poder añadir nuevas divisas.
  */
  const [monedas, setMonedas] = useState<Moneda[]>([
    {
      id: 'USD',
      nombre: 'Dólar Estadounidense',
      simbolo: '$',
      tasaCambio: 1.08,
      tendencia: 'alza'
    },
    {
      id: 'GBP',
      nombre: 'Libra Esterlina',
      simbolo: '£',
      tasaCambio: 0.85,
      tendencia: 'baja'
    },
    {
      id: 'JPY',
      nombre: 'Yen Japonés',
      simbolo: '¥',
      tasaCambio: 162.40,
      tendencia: 'alza'
    },
    {
      id: 'CHF',
      nombre: 'Franco Suizo',
      simbolo: 'CHF',
      tasaCambio: 0.96,
      tendencia: 'baja'
    },
    {
      id: 'CAD',
      nombre: 'Dólar Canadiense',
      simbolo: 'C$',
      tasaCambio: 1.47,
      tendencia: 'alza'
    },
  ]);

  /*
    Estados para los campos del formulario
    de nueva divisa.
  */
  const [nuevoId, setNuevoId] = useState<string>('');
  const [nuevoNombre, setNuevoNombre] = useState<string>('');
  const [nuevoSimbolo, setNuevoSimbolo] = useState<string>('');
  const [nuevaTasa, setNuevaTasa] = useState<string>('');
  const [nuevaTendencia, setNuevaTendencia] = useState<
    'alza' | 'baja'
  >('alza');

  /*
    CONFIGURACIÓN PERSONALIZADA SEGÚN TU INICIAL

    A-F: Moneda Base = EUR (€) | tema-verde
    G-M: Moneda Base = USD ($) | tema-azul
    N-Z: Moneda Base = GBP (£) | tema-violeta
  */

  const monedaBase: string = "EUR (€)";
  const temaClase: string = "tema-verde";

  /*
    Función para añadir una nueva moneda.
  */
  const handleAgregarMoneda = (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    // Evitamos que el formulario recargue la página
    e.preventDefault();

    // Eliminamos espacios innecesarios
    const id = nuevoId.trim();
    const nombre = nuevoNombre.trim();
    const simbolo = nuevoSimbolo.trim();

    // Convertimos la tasa de cambio a número
    const tasaCambio = Number(nuevaTasa);

    // Validación de los campos
    if (
      id === '' ||
      nombre === '' ||
      simbolo === '' ||
      nuevaTasa === '' ||
      isNaN(tasaCambio) ||
      tasaCambio <= 0
    ) {
      alert('Debes rellenar todos los campos correctamente.');
      return;
    }

    // Comprobamos que no exista otra moneda con el mismo ID
    const existeId = monedas.some(
      (moneda) => moneda.id.toUpperCase() === id.toUpperCase()
    );

    if (existeId) {
      alert('Ya existe una divisa con ese código.');
      return;
    }

    // Creamos el nuevo objeto Moneda
    const nuevaMoneda: Moneda = {
      id: id.toUpperCase(),
      nombre: nombre,
      simbolo: simbolo,
      tasaCambio: tasaCambio,
      tendencia: nuevaTendencia
    };

    /*
      Actualización INMUTABLE del array.

      No modificamos directamente monedas.
      Creamos un nuevo array utilizando el operador ...
    */
    setMonedas([...monedas, nuevaMoneda]);

    // Reseteamos los campos del formulario
    setNuevoId('');
    setNuevoNombre('');
    setNuevoSimbolo('');
    setNuevaTasa('');
    setNuevaTendencia('alza');
  };

  /*
    Filtramos las monedas según la tendencia seleccionada.
  */
  const monedasFiltradas = monedas.filter((moneda) => {
    return (
      filtroTendencia === 'todas' ||
      moneda.tendencia === filtroTendencia
    );
  });

  return (
    <div className={`tabla-contenedor ${temaClase}`}>

      {/* Cabecera */}
      <header className="cabecera-tabla">

        <h2>
          Práctica 02.14: Renderizado de Listas y Clave Única
        </h2>

        <p>
          <strong>Estudiante:</strong> {nombreAlumno}
        </p>

      </header>


      {/* Panel de entrada del importe */}
      <div className="panel-conversor">

        <label htmlFor="monto">
          Importe Base ({monedaBase}):
        </label>

        <input
          id="monto"
          type="number"
          min="1"
          value={montoBase}
          onChange={(e) =>
            setMontoBase(Number(e.currentTarget.value) || 0)
          }
        />

      </div>


      {/* Panel de filtro */}
      <div className="panel-filtro">

        <label>
          Filtrar por Tendencia:
        </label>

        <div className="botones-filtro">

          {/* Mostrar todas */}
          <button
            className={
              filtroTendencia === 'todas'
                ? 'filtro-activo'
                : ''
            }
            onClick={() => setFiltroTendencia('todas')}
          >
            Todas ({monedas.length})
          </button>

          {/* Mostrar alza */}
          <button
            className={
              filtroTendencia === 'alza'
                ? 'filtro-activo'
                : ''
            }
            onClick={() => setFiltroTendencia('alza')}
          >
            ▲ Alza
          </button>

          {/* Mostrar baja */}
          <button
            className={
              filtroTendencia === 'baja'
                ? 'filtro-activo'
                : ''
            }
            onClick={() => setFiltroTendencia('baja')}
          >
            ▼ Baja
          </button>

        </div>

      </div>


      {/* Formulario para añadir una nueva divisa */}
      <form
        className="formulario-moneda"
        onSubmit={handleAgregarMoneda}
      >

        <h3>
          ＋ Añadir Nueva Divisa
        </h3>

        {/* Código / ID */}
        <input
          type="text"
          placeholder="Código (ej. AUD)"
          value={nuevoId}
          onChange={(e) => setNuevoId(e.currentTarget.value)}
        />

        {/* Nombre */}
        <input
          type="text"
          placeholder="Nombre de la Divisa"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.currentTarget.value)}
        />

        {/* Tasa de cambio */}
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Tasa de Cambio"
          value={nuevaTasa}
          onChange={(e) => setNuevaTasa(e.currentTarget.value)}
        />

        {/* Símbolo */}
        <input
          type="text"
          placeholder="Símbolo (ej. $)"
          value={nuevoSimbolo}
          onChange={(e) => setNuevoSimbolo(e.currentTarget.value)}
        />

        {/* Tendencia */}
        <select
          value={nuevaTendencia}
          onChange={(e) =>
            setNuevaTendencia(
              e.currentTarget.value as 'alza' | 'baja'
            )
          }
        >
          <option value="alza">▲ Alza</option>
          <option value="baja">▼ Baja</option>
        </select>

        {/* Botón de envío */}
        <button
          type="submit"
          className="boton-anadir"
        >
          Añadir Divisa a la Tabla
        </button>

      </form>


      {/* Tabla de cotizaciones */}
      <table className="tabla-cotizaciones">

        <thead>
          <tr>
            <th>Código / ID</th>
            <th>Divisa</th>
            <th>Tasa (1 {monedaBase})</th>
            <th>Conversión Total</th>
            <th>Tendencia</th>
          </tr>
        </thead>

        <tbody>

          {/* Mostramos las monedas que cumplen el filtro */}
          {monedasFiltradas.map((moneda) => {

            // Calculamos la conversión
            const totalConvertido = (
              montoBase * moneda.tasaCambio
            ).toFixed(2);

            return (
              <tr key={moneda.id}>

                {/* Código */}
                <td>
                  <strong>{moneda.id}</strong>
                </td>

                {/* Nombre */}
                <td>
                  {moneda.nombre}
                </td>

                {/* Tasa de cambio */}
                <td>
                  1 = {moneda.tasaCambio} {moneda.simbolo}
                </td>

                {/* Conversión */}
                <td>
                  <strong>
                    {totalConvertido} {moneda.simbolo}
                  </strong>
                </td>

                {/* Tendencia */}
                <td>

                  <span
                    className={`badge-tendencia ${
                      moneda.tendencia === 'alza'
                        ? 'tendencia-subida'
                        : 'tendencia-bajada'
                    }`}
                  >

                    {moneda.tendencia === 'alza'
                      ? '▲ Alza'
                      : '▼ Baja'}

                  </span>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}