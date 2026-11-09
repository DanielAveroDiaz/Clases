interface OperarBotonesProps {
  textoActual: string;
  onConvertirMayusculas: () => void;
  onConvertirMinusculas: () => void;
  onInvertirTexto: () => void;
  onEjecutarEspecial: () => void;
  onLimpiar: () => void;
  onDeshacer: () => void;
  puedeDeshacer: boolean;
  etiquetaEspecial: string;
}

export function OperarBotonesDAD({
  textoActual,
  onConvertirMayusculas,
  onConvertirMinusculas,
  onInvertirTexto,
  onEjecutarEspecial,
  onLimpiar,
  onDeshacer,
  puedeDeshacer,
  etiquetaEspecial,
}: OperarBotonesProps) {

  // Un botón está deshabilitado si el texto está vacío
  const estaVacio = textoActual.trim().length === 0;

  return (
    <div className="card-botones">

      <div className="grid-operaciones">

        {/* Botón de mayúsculas */}
        <button
          className="btn-operacion btn-mayus"
          onClick={onConvertirMayusculas}
          disabled={estaVacio}
        >
          MAYÚSCULAS 🔠
        </button>

        {/* Botón de minúsculas */}
        <button
          className="btn-operacion btn-minus"
          onClick={onConvertirMinusculas}
          disabled={estaVacio}
        >
          minúsculas 🔡
        </button>

        {/* Botón para invertir el texto */}
        <button
          className="btn-operacion btn-invertir"
          onClick={onInvertirTexto}
          disabled={estaVacio}
        >
          Invertir 🔀
        </button>

        {/* Botón de operación especial */}
        <button
          className="btn-operacion btn-especial"
          onClick={onEjecutarEspecial}
          disabled={estaVacio}
        >
          {etiquetaEspecial} ⭐
        </button>

        {/* Botón para limpiar */}
        <button
          className="btn-operacion btn-limpiar"
          onClick={onLimpiar}
          disabled={estaVacio}
        >
          Limpiar 🗑️
        </button>

        {/* Nuevo botón para deshacer */}
        <button
          className="btn-operacion btn-deshacer"
          onClick={onDeshacer}
          disabled={!puedeDeshacer}
        >
          Deshacer Cambios ↩️
        </button>

      </div>

    </div>
  );
}