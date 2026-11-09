import { useState, useEffect } from 'react';
import './RelojesMundialesDAD.css';

interface CiudadReloj {
  id: string;
  ciudad: string;
  zonaHoraria: string;
  esPrincipal: boolean;
}

export function RelojesMundialesDAD() {
  const nombreAlumno: string = "Daniel Avero Díaz";

  // 1. Estado para almacenar el objeto Date actual (se actualiza cada segundo)
  const [fechaActual, setFechaActual] = useState<Date>(new Date());

  // 2. Estados de Ampliación
  const [esFormato24h, setEsFormato24h] = useState<boolean>(true);
  
  const ciudadDestacadaId: string = "TOK";
  const temaClase: string = 'tema-tokio';

  // Estado inmutable para la colección de ciudades (permite añadir nuevas)
  const [ciudades, setCiudades] = useState<CiudadReloj[]>([
    { id: 'MAD', ciudad: 'Madrid (Local)', zonaHoraria: 'Europe/Madrid', esPrincipal: false },
    { id: 'TOK', ciudad: 'Tokio', zonaHoraria: 'Asia/Tokyo', esPrincipal: ciudadDestacadaId === 'TOK' },
    { id: 'NYC', ciudad: 'Nueva York', zonaHoraria: 'America/New_York', esPrincipal: ciudadDestacadaId === 'NYC' },
    { id: 'LON', ciudad: 'Londres', zonaHoraria: 'Europe/London', esPrincipal: ciudadDestacadaId === 'LON' },
  ]);

  // Estados para el formulario de añadir nueva ciudad
  const [nuevoNombre, setNuevoNombre] = useState<string>('');
  const [nuevaZona, setNuevaZona] = useState<string>('');

  // 3. EFECTO SECUNDARIO: Iniciar el temporizador al montar el componente
  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaActual(new Date());
    }, 1000);

    // FUNCIÓN DE LIMPIEZA OBLIGATORIA (CLEANUP FUNCTION)
    return () => {
      clearInterval(intervalo);
    };
  }, []);

  // Función auxiliar para obtener la hora formateada según zona horaria y formato 12h/24h
  const obtenerHoraZona = (timeZone: string): string => {
    return fechaActual.toLocaleTimeString('es-ES', {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !esFormato24h,
    });
  };

  // Función para obtener la hora numérica (0-23) y determinar Día o Noche
  const obtenerIconoDiaNoche = (timeZone: string): string => {
    try {
      const horaStr = new Intl.DateTimeFormat('es-ES', {
        timeZone: timeZone,
        hour: 'numeric',
        hour12: false,
      }).format(fechaActual);
      
      const horaNum = parseInt(horaStr, 10);
      // Día: 06:00 a 19:59 | Noche: 20:00 a 05:59
      if (horaNum >= 6 && horaNum < 20) {
        return '🪙'; // Icono sol / día
      } else {
        return '🌙'; // Icono luna / noche
      }
    } catch {
      return '🪙';
    }
  };

  // Manejador para añadir nueva ciudad de forma inmutable
  const agregarCiudad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevaZona.trim()) return;

    // Generar ID a partir de las 3 primeras letras en mayúsculas
    const idGenerado = nuevoNombre.trim().substring(0, 3).toUpperCase();

    const nueva: CiudadReloj = {
      id: idGenerado + Math.floor(Math.random() * 100),
      ciudad: nuevoNombre.trim(),
      zonaHoraria: nuevaZona.trim(),
      esPrincipal: false, // Las nuevas ciudades no son principales por defecto
    };

    setCiudades([...ciudades, nueva]);
    setNuevoNombre('');
    setNuevaZona('');
  };

  return (
    <div className={`relojes-contenedor ${temaClase}`}>
      <header className="cabecera-relojes">
        <h2>Práctica 02.17: Temporizadores y Efectos (useEffect)</h2>
        <p><strong>Estudiante:</strong> {nombreAlumno}</p>
      </header>

      {/* Panel Superior Informativo con Conmutador de Formato */}
      <div className="panel-estado-tiempo">
        <div>
          <span className="indicador-pulso"></span>
          <strong>Sincronización en tiempo real activa</strong>
        </div>
        <div>
          <span style={{ marginRight: '15px', fontSize: '0.9rem' }}>
            Formato: {esFormato24h ? '24 horas' : '12 horas'}
          </span>
          <button
            onClick={() => setEsFormato24h(!esFormato24h)}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem'
            }}
          >
            Cambiar a {esFormato24h ? '12h' : '24h'}
          </button>
        </div>
      </div>

      {/* Formulario Inmutable para Añadir Nueva Ciudad */}
      <form onSubmit={agregarCiudad} style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #cbd5e1' }}>
        <h4 style={{ margin: '0 0 10px 0', textAlign: 'center', color: '#1e293b' }}>+ Añadir Nueva Ciudad</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Nombre de la ciudad"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #94a3b8', flex: '1', minWidth: '180px' }}
          />
          <input
            type="text"
            placeholder="Zona horaria IANA (ej. Europe/Paris)"
            value={nuevaZona}
            onChange={(e) => setNuevaZona(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #94a3b8', flex: '1', minWidth: '220px' }}
          />
          <button
            type="submit"
            style={{ background: '#0284c7', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Añadir Ciudad
          </button>
        </div>
      </form>

      {/* Grilla con recorrido dinámico mediante .map() */}
      <div className="grilla-relojes">
        {ciudades.map((item) => (
          <article
            key={item.id}
            className={`tarjeta-reloj ${item.esPrincipal ? 'destacada' : ''}`}
          >
            <div className="nombre-ciudad">{item.ciudad}</div>
            <div className="zona-horaria">{item.zonaHoraria}</div>
            <div className="visor-hora">{obtenerHoraZona(item.zonaHoraria)}</div>
            <div style={{ marginTop: '8px', fontSize: '1.2rem' }} title="Indicador Día/Noche">
              {obtenerIconoDiaNoche(item.zonaHoraria)}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}