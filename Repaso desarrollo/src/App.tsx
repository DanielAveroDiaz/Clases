import { ContadorTablaDAD } from './components/Practica2.11/ContadorTablaDAD';
import { GeneradorNumerosDAD } from './components/Practica2.12/GeneradorNumerosDAD';
import { TablaMonedasDAD } from './components/Practica2.14/TablaMonedasDAD';
import { PanelAccionesDAD } from './components/Practica2.15/PanelAccionesDAD';
import { RelojesMundialesDAD } from './components/Practica2.17/RelojesMundialesDAD';
import { EjStateByPropsDAD } from './components/Practica2.19/EjStateByPropsDAD';
import { GestionPersonasDAD } from './components/Practica2.20/GestionPersonasDAD';
import { CatalogoPokemonDAD } from './components/Practica2.22/CatalogoPokemonDAD';
import FichaModuloDAD from './components/Practica2.6.1/FichaModuloDAD';
import { FichaDesarrollador } from './components/Practica2.6/FichaDesarollador';
import TarjetaAlumnoDAD from './components/Practica2.6/TarjetaAlumnoDAD';
import { SelectorTemaDAD } from './components/Practica2.8/SelectorTemaDAD';
import { LayoutDinamicoDAD } from './components/Practica2.9/LayoutDinamicoDAD';


function App() {
  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1>Equipo de Desarrollo de Software</h1>
      <hr />

      <h2><strong>Practica 2.6</strong></h2>
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
      <hr/>

      <TarjetaAlumnoDAD
        nombreCompleto='Daniel Avero Díaz'
        niaNumero={542}
        moduloFavorito='Diseño de Interfaces'
        horasEstudioDiarias={3}
      />
      <hr/>

      <TarjetaAlumnoDAD
        nombreCompleto='Carlos Pérez González'
        niaNumero={1234}
      />
      <hr/>

      <h2><strong>Practica 2.8</strong></h2>
      <SelectorTemaDAD/>

      <h2><strong>Practica 2.9</strong></h2>
      <LayoutDinamicoDAD/>
      <hr/>

      <h2><strong>Practica 2.6.1</strong></h2>
      <FichaModuloDAD
        nombreAlumno='Daniel Avero Díaz'
        nombreModulo='Diseño de interfaces'
        horasTotales={96}
        horasFaltadas={21}
        notaParcial={8.5}
      />
      <FichaModuloDAD
        nombreAlumno='Daniel Avero Díaz'
        nombreModulo='Diseño de interfaces'
        horasTotales={96}
      />
      <hr/>

      <h2><strong>Practica 2.11</strong></h2>
      <ContadorTablaDAD/>
      <hr/>

      <h2><strong>Practica 2.12</strong></h2>
      <GeneradorNumerosDAD/>
      <hr/>

      <h2><strong>Practica 2.14</strong></h2>
      <TablaMonedasDAD/>
      <hr/>

      <h2><strong>Practica 2.15</strong></h2>
      <PanelAccionesDAD/>
      <hr/>

      <h2><strong>Practica 2.17</strong></h2>
      <RelojesMundialesDAD/>
      <hr/>

      <h2><strong>Practica 2.19</strong></h2>
      <EjStateByPropsDAD/>
      <hr/>

      <h2><strong>Practica 2.20</strong></h2>
      <GestionPersonasDAD/>
      <hr/>

      <h2><strong>Practica 2.22</strong></h2>
      <CatalogoPokemonDAD/>
    </main>
  );
}


export default App;
