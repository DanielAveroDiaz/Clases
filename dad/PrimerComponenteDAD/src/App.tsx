import { FichaDesarrollador } from './components/FichaDesarrollador';


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


      {/* Instancia 2: Omitiendo props opcionales para probar los valores por defecto */}
      <FichaDesarrollador
        nombre="Elena Beltrán"
        especialidad="Backend Node.js"
        anosExperiencia={1}
      />


      {/* Instancia 3: Pasando proyectosCompletados como 0 explícito */}
      <FichaDesarrollador
        nombre="David Soto"
        especialidad="Fullstack Junior"
        anosExperiencia={0}
        proyectosCompletados={0}
      />
    </main>
  );
}


export default App;
