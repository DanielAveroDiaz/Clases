interface OperarBotonesProps {
  textoActual: string;
  onConvertirMayusculas: () => void;
  onConvertirMinusculas: () => void;
  onInvertirTexto: () => void;
  onEjecutarEspecial: () => void;
  onLimpiar: () => void;
  onDeshacer?: () => void;
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
  etiquetaEspecial,
}: OperarBotonesProps) {
  const estaVacio = textoActual.trim().length === 0;

  return (
    <div className="card-botones">
      <div className="grid-operaciones">
        <button
          className="btn-operacion btn-mayus"
          onClick={onConvertirMayusculas}
          disabled={estaVacio}
        >
          MAYÚSCULAS 🔠
        </button>
        <button
          className="btn-operacion btn-minus"
          onClick={onConvertirMinusculas}
          disabled={estaVacio}
        >
          minúsculas 🔡
        </button>
        <button
          className="btn-operacion btn-invertir"
          onClick={onInvertirTexto}
          disabled={estaVacio}
        >
          Invertir 🔀
        </button>
        <button
          className="btn-operacion btn-especial"
          onClick={onEjecutarEspecial}
          disabled={estaVacio}
        >
          {etiquetaEspecial} ⭐
        </button>
        <button
          className="btn-operacion btn-limpiar"
          onClick={onLimpiar}
          disabled={estaVacio}
        >
          Limpiar 🗑️
        </button>
        {onDeshacer && (
          <button
            className="btn-operacion btn-deshacer"
            onClick={onDeshacer}
            style={{ backgroundColor: '#475569', color: 'white' }}
          >
            Deshacer Cambios ↩️
          </button>
        )}
      </div>
    </div>
  );
}