import { useState } from 'react';
import './TablaMonedasDAD.css'; // Sustituye LGD por tus iniciales


// 1. Modelo de datos estructurado para cada divisa
interface Moneda {
  id: string; // Identificador único obligatorio para la propiedad key
  nombre: string;
  simbolo: string;
  tasaCambio: number; // Valor respecto a la moneda base
  tendencia: 'alza' | 'baja';
}


export function TablaMonedasDAD() {
  const nombreAlumno: string = "Daniel Avero Díaz"; // Tu nombre real


  // 2. Estado para el importe base de conversión (por defecto 100)
  const [montoBase, setMontoBase] = useState<number>(100);


  /* === CONFIGURACIÓN PERSONALIZADA SEGÚN TU INICIAL ===
     Si tu nombre empieza por:
     - A-F: Moneda Base = EUR (€) | temaClase = 'tema-verde'
     - G-M: Moneda Base = USD (\$) | temaClase = 'tema-azul'
     - N-Z: Moneda Base = GBP (£) | temaClase = 'tema-violeta'
  */
  const monedaBase: string = "EUR (€)";
  const temaClase: string = "";


  // Array de objetos de prueba
  const monedas: Moneda[] = [
    { id: 'USD', nombre: 'Dólar Estadounidense', simbolo: '\$', tasaCambio: 1.08, tendencia: 'alza' },
    { id: 'GBP', nombre: 'Libra Esterlina', simbolo: '£', tasaCambio: 0.85, tendencia: 'baja' },
    { id: 'JPY', nombre: 'Yen Japonés', simbolo: '¥', tasaCambio: 162.40, tendencia: 'alza' },
    { id: 'CHF', nombre: 'Franco Suizo', simbolo: 'CHF', tasaCambio: 0.96, tendencia: 'baja' },
    { id: 'CAD', nombre: 'Dólar Canadiense', simbolo: 'C\$', tasaCambio: 1.47, tendencia: 'alza' },
  ];


  return (
    <div className={`tabla-contenedor ${temaClase}`}>
      <header className="cabecera-tabla">
        <h2>Práctica 02.14: Renderizado de Listas y Clave Única</h2>
        <p><strong>Estudiante:</strong> {nombreAlumno}</p>
      </header>


      {/* Panel de entrada de datos */}
      <div className="panel-conversor">
        <label htmlFor="monto">Importe Base ({monedaBase}):</label>
        <input
          id="monto"
          type="number"
          min="1"
          value={montoBase}
          onChange={(e) => setMontoBase(Number(e.currentTarget.value) || 0)}
        />
      </div>


      {/* Tabla con renderizado dinámico mediante .map() */}
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
          {/* 3. Mapeo de la colección de objetos. Se utiliza el atributo obligatorio key={moneda.id} */}
          {monedas.map((moneda) => {
            // Cálculo dinámico del total convertido
            const totalConvertido = (montoBase * moneda.tasaCambio).toFixed(2);


            return (
              <tr key={moneda.id}>
                <td><strong>{moneda.id}</strong></td>
                <td>{moneda.nombre}</td>
                <td>1 = {moneda.tasaCambio} {moneda.simbolo}</td>
                <td><strong>{totalConvertido} {moneda.simbolo}</strong></td>
                <td>
                  <span
                    className={`badge-tendencia ${
                      moneda.tendencia === 'alza' ? 'tendencia-subida' : 'tendencia-bajada'
                    }`}
                  >
                    {moneda.tendencia === 'alza' ? '▲ Alza' : '▼ Baja'}
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
