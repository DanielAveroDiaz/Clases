
import './FichaModuloDAD.css';

// Interfaz de las propiedades
interface FichaModuloDADProps {
    nombreAlumno: string;
    nombreModulo: string;
    horasTotales: number;
    horasFaltadas?: number | null;
    notaParcial?: number | undefined;
}

// Componente FichaModuloDAD
const FichaModuloDAD = ({
    nombreAlumno,
    nombreModulo,
    horasTotales,
    horasFaltadas,
    notaParcial
}: FichaModuloDADProps) => {

    // Valores por defecto utilizando ??
    const faltasReales = horasFaltadas ?? 0;
    const notaActual = notaParcial ?? 5.0;

    // Cálculo de asistencia
    const porcentajeAsistencia =
        ((horasTotales - faltasReales) / horasTotales) * 100;

    // Comprobamos el derecho a evaluación
    const derechoAEvaluacion: boolean = porcentajeAsistencia >= 80;

    return (
        <>
            <div className="ficha-modulo">
                <h2>Módulo: {nombreModulo}</h2>

                <p>
                    <strong>Estudiante:</strong> {nombreAlumno}
                </p>

                <p>
                    <strong>Horas Lectivas:</strong> {horasTotales}h
                    {" | "}
                    <strong>Faltas:</strong> {faltasReales}h
                </p>

                <p>
                    <strong>Porcentaje Asistencia:</strong>{" "}
                    {porcentajeAsistencia.toFixed(1)}%
                </p>

                <p>
                    <strong>Nota Promedio:</strong> {notaActual.toFixed(1)}
                </p>

                <p className={derechoAEvaluacion ? "estado-apto" : "estado-no-apto"}>
                    <strong>
                        Estado: {derechoAEvaluacion
                            ? "Apto para Evaluación Continua"
                            : "No Apto para Evaluación Continua"}
                    </strong>
                </p>
            </div>
        </>
    );
};

export default FichaModuloDAD;
