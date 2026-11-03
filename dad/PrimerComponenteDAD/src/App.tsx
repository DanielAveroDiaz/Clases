
import { FichaDesarrollador } from './components/FichaDesarrollador';
import TarjetaAlumnoDAD from './components/TarjetaAlumnoDAD';

function App() {
  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Equipo de Desarrollo de Software</h1>
      <hr />

      {/* Instancia 1: Enviando todos los datos completos */}
      <FichaDesarrollador
        nombre="Carlos Mendoza"
        especialidad="Frontend React"
        anosExperiencia={5}
        proyectoActual="Portal Bancario"
        proyectosCompletados={12}
      />

      {/* Instancia 2: Omitiendo props opcionales */}
      <FichaDesarrollador
        nombre="Elena Beltrán"
        especialidad="Backend Node.js"
        anosExperiencia={1}
      />

      {/* Instancia 3: Pasando proyectosCompletados como 0 */}
      <FichaDesarrollador
        nombre="David Soto"
        especialidad="Fullstack Junior"
        anosExperiencia={0}
        proyectosCompletados={0}
      />

      <hr />

      <h1>Tarjetas de Alumnos</h1>
      <hr />

      {/* Instancia 1: Tus datos completos */}
      <TarjetaAlumnoDAD
        nombreCompleto="Daniel Avero Díaz"
        niaNumero={542}
        moduloFavorito="Diseño de Interfaces"
        horasEstudioDiarias={3}
      />

      <hr />

      {/* Instancia 2: Compañero con las props opcionales omitidas */}
      <TarjetaAlumnoDAD
        nombreCompleto="Carlos Pérez González"
        niaNumero={1234}
      />
    </main>
  );
}

export default App;

