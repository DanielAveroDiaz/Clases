// Definición del contrato de propiedades del componente
export interface FichaDesarrolladorProps {
  nombre: string;              // Propiedad obligatoria
  especialidad: string;        // Propiedad obligatoria
  anosExperiencia: number;     // Propiedad obligatoria
  proyectoActual?: string;     // Propiedad opcional (símbolo ?)
  proyectosCompletados?: number | null; // Opcional, puede venir como null
}

export function FichaDesarrollador({
  nombre,
  especialidad,
  anosExperiencia,
  proyectoActual,
  proyectosCompletados,
}: FichaDesarrolladorProps) {


  // Uso del operador Nullish Coalescing (??) para asignar valores por defecto
  const proyectoTexto = proyectoActual ?? "Sin proyecto asignado";
  
  // Si proyectosCompletados es null o undefined, toma el valor 0 (preservando el 0 si se envía explícitamente)
  const totalProyectos = proyectosCompletados ?? 0;


  return (
    <>
      {/* Encabezado y datos principales */}
      <article style={{ border: '1px solid #4A5568', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
        <h3>Desarrollador/a: {nombre}</h3>
        <p><strong>Especialidad:</strong> {especialidad}</p>
        <p><strong>Experiencia:</strong> {anosExperiencia} {anosExperiencia === 1 ? 'año' : 'años'}</p>
        
        {/* Evaluación con datos gestionados por ?? */}
        <p><strong>Asignación actual:</strong> {proyectoTexto}</p>
        <p><strong>Proyectos finalizados:</strong> {totalProyectos}</p>
      </article>
    </>
  );
}
