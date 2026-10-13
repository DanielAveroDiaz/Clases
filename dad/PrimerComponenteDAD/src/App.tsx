// Importamos el componente con tus iniciales correspondientes
import PerfilEstudianteDAD from './PerfilEstudianteDAD';


function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Panel de Control del Alumnado - DAD</h1>
      <hr />
      
      {/* Invocación del componente personalizado */}
      <PerfilEstudianteDAD />
    </div>
  );
}


export default App;
