import { useState } from 'react';
import './LayoutDinamicoDAD.css'; // Sustituye LGD por tus iniciales


interface ElementoItem {
  id: number;
  titulo: string;
  categoria: string;
  activo: boolean;
}


export function LayoutDinamicoDAD() {
  const nombreAlumno: string = "Daniel Avero Díaz"; // Tu nombre real


  // 1. Estado para conmutar la disposición de contenedores dinámicos
  const [modoVista, setModoVista] = useState<'rejilla' | 'lista'>('rejilla');


  /* === CONFIGURACIÓN SEGÚN TU INICIAL ===
     Si tu nombre empieza por:
     - A-F: sidebarColapsado inicia en true
     - G-M: sidebarColapsado inicia en false
     - N-Z: sidebarColapsado inicia en true
  */
  const [sidebarColapsado, setSidebarColapsado] = useState<boolean>(true);


  // Datos de prueba para pintar tarjetas
  const items: ElementoItem[] = [
    { id: 1, titulo: "Módulo Flexbox", categoria: "CSS", activo: true },
    { id: 2, titulo: "Módulo Grid", categoria: "Layout", activo: true },
    { id: 3, titulo: "Estado useState", categoria: "React", activo: false },
    { id: 4, titulo: "Clases Dinámicas", categoria: "TSX", activo: true },
  ];

  const[filtroActivos, setFiltroActivos] = useState<boolean>(false);

  const elementosVisibles = items.filter(
  (item) => !filtroActivos || item.activo
  ).length;

  return (
    <div className={`layout-contenedor ${sidebarColapsado ? 'sidebar-colapsado' : ''}`}>
      {/* Cabecera */}
      <header className="layout-header">
        <h2>Panel de Control - Layout Dinámico</h2>
        <span><strong>Alumno:</strong> {nombreAlumno}</span>
      </header>


      {/* Barra Lateral / Sidebar */}
      <aside className="layout-sidebar">
        <button 
          className="btn-toggle-sidebar"
          onClick={() => setSidebarColapsado(!sidebarColapsado)}
        >
          {sidebarColapsado ? '➡️' : '⬅️ Colapsar'}
        </button>
        {!sidebarColapsado && <p><small>Opciones de maquetación activas.</small></p>}
      </aside>


      {/* Ámbito Principal y Selector de Vista */}
      <main className="layout-main">
        <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
          <button 
            style={{ fontWeight: modoVista === 'rejilla' ? 'bold' : 'normal' }}
            onClick={() => setModoVista('rejilla')}
          >
            Vista Rejilla 🔲
          </button>
          <button 
            style={{ fontWeight: modoVista === 'lista' ? 'bold' : 'normal' }}
            onClick={() => setModoVista('lista')}
          >
            Vista Lista 📄
          </button>
          <button
            onClick={() => setFiltroActivos(!filtroActivos)}
          >
            {filtroActivos ? 'Mostrar todos' : 'Mostrar solo activos'}
          </button>
          <p>
            Mostrando {elementosVisibles} de {items.length} elementos
          </p>
        </div>



        {/* Contenedor Dinámico: altera sus clases según el estado */}
        <div className={`contenedor-tarjetas vista-${modoVista}`}>
          {items.map((item) => (
            <article key={item.id} 
            className="tarjeta-item"  
            hidden={filtroActivos && !item.activo}>
              <div>
                <h4>{item.titulo}</h4>
                <p><small>Categoría: {item.categoria}</small></p>
              </div>
              <span className={`badge-estado ${item.activo ? 'badge-activo' : 'badge-pendiente'}`}>
                {item.activo ? 'Activo' : 'Pendiente'}
              </span>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
