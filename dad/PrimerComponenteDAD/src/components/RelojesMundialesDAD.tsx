
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import './RelojesMundialesDAD.css';

interface CiudadReloj {
  id: string;
  ciudad: string;
  zonaHoraria: string;
  esPrincipal: boolean;
}

export function RelojesMundialesDAD() {

  // Nombre del alumno
  const nombreAlumno: string = 'Daniel Avero Diaz';

  // Estado para almacenar la fecha y hora actual
  const [fechaActual, setFechaActual] = useState<Date>(new Date());

  // Estado para controlar el formato de la hora
  // true = formato 24 horas
  // false = formato 12 horas
  const [esFormato24h, setEsFormato24h] = useState<boolean>(true);

  // Estados para los campos del formulario
  const [nuevoNombre, setNuevoNombre] = useState<string>('');
  const [nuevaZonaHoraria, setNuevaZonaHoraria] = useState<string>('');

  // Estado para mostrar posibles errores
  const [errorFormulario, setErrorFormulario] = useState<string>('');

  // Nueva York será la ciudad destacada
  const ciudadDestacadaId: string = 'NYC';

  // Lista inicial de ciudades
  const [ciudades, setCiudades] = useState<CiudadReloj[]>([
    {
      id: 'MAD',
      ciudad: 'Madrid (Local)',
      zonaHoraria: 'Europe/Madrid',
      esPrincipal: false
    },
    {
      id: 'TOK',
      ciudad: 'Tokio',
      zonaHoraria: 'Asia/Tokyo',
      esPrincipal: false
    },
    {
      id: 'NYC',
      ciudad: 'Nueva York',
      zonaHoraria: 'America/New_York',
      esPrincipal: true
    },
    {
      id: 'LON',
      ciudad: 'Londres',
      zonaHoraria: 'Europe/London',
      esPrincipal: false
    }
  ]);

  // Efecto secundario para actualizar la hora cada segundo
  useEffect(() => {

    const intervalo = setInterval(() => {
      setFechaActual(new Date());
    }, 1000);

    // Limpiamos el intervalo cuando el componente desaparece
    return () => {
      clearInterval(intervalo);
    };

  }, []);

  // Obtiene la hora de una ciudad según su zona horaria
  const obtenerHoraZona = (timeZone: string): string => {

    return fechaActual.toLocaleTimeString('es-ES', {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !esFormato24h
    });

  };

  // Obtiene la hora numérica para determinar si es de día o de noche
  const obtenerHoraNumerica = (timeZone: string): number => {

    const hora = new Intl.DateTimeFormat('es-ES', {
      timeZone: timeZone,
      hour: '2-digit',
      hour12: false
    }).format(fechaActual);

    return parseInt(hora, 10);
  };

  // Devuelve un sol durante el día y una luna durante la noche
  const obtenerIndicadorDiaNoche = (timeZone: string): string => {

    const hora = obtenerHoraNumerica(timeZone);

    if (hora >= 6 && hora < 20) {
      return '☀️';
    }

    return '🌙';
  };

  // Cambia entre el formato de 24 y 12 horas
  const cambiarFormatoHora = () => {
    setEsFormato24h(!esFormato24h);
  };

  // Añade una ciudad nueva al listado
  const agregarCiudad = (evento: FormEvent<HTMLFormElement>) => {

    // Evitamos que se recargue la página
    evento.preventDefault();

    // Eliminamos espacios innecesarios
    const nombre = nuevoNombre.trim();
    const zonaHoraria = nuevaZonaHoraria.trim();

    // Comprobamos que los dos campos estén completos
    if (nombre === '' || zonaHoraria === '') {
      setErrorFormulario('Debes rellenar los dos campos.');
      return;
    }

    // Comprobamos que la zona horaria sea válida
    try {
      new Intl.DateTimeFormat('es-ES', {
        timeZone: zonaHoraria
      });
    } catch {
      setErrorFormulario('La zona horaria introducida no es válida.');
      return;
    }

    // Comprobamos que no exista ya esa ciudad
    const ciudadExiste = ciudades.some(
      (item) =>
        item.ciudad.toLowerCase() === nombre.toLowerCase() ||
        item.zonaHoraria.toLowerCase() === zonaHoraria.toLowerCase()
    );

    if (ciudadExiste) {
      setErrorFormulario('Esa ciudad ya está añadida.');
      return;
    }

    // Generamos un identificador único para la nueva ciudad
    const id = `${Date.now()}`;

    // Creamos el objeto de la nueva ciudad
    const nuevaCiudad: CiudadReloj = {
      id: id,
      ciudad: nombre,
      zonaHoraria: zonaHoraria,
      esPrincipal: false
    };

    // Añadimos la ciudad sin modificar la lista original
    setCiudades([...ciudades, nuevaCiudad]);

    // Limpiamos el formulario y los errores
    setNuevoNombre('');
    setNuevaZonaHoraria('');
    setErrorFormulario('');

  };

  return (
    <div className="relojes-contenedor">

      {/* Cabecera */}
      <header className="cabecera-relojes">

        <h2>
          Práctica 02.17: Temporizadores y Efectos (useEffect)
        </h2>

        <p>
          <strong>Estudiante:</strong> {nombreAlumno}
        </p>

      </header>

      {/* Barra de estado y formato horario */}
      <div className="panel-estado-tiempo">

        <div className="estado-sincronizacion">
          <span className="indicador-pulso"></span>

          <strong>
            Sincronización en tiempo real activa
          </strong>
        </div>

        <div className="controles-tiempo">

          <span className="formato-sistema">
            Formato de sistema: UTC / IANA
          </span>

          <button
            type="button"
            className="boton-formato"
            onClick={cambiarFormatoHora}
          >
            {esFormato24h
              ? 'Cambiar a 12h'
              : 'Cambiar a 24h'}
          </button>

        </div>

      </div>

      {/* Formulario para añadir ciudades */}
      <form
        className="formulario-ciudad"
        onSubmit={agregarCiudad}
      >

        <h3>
          <span className="icono-anadir">✚</span>
          Añadir Nueva Ciudad
        </h3>

        <div className="campos-ciudad">

          {/* Campo del nombre de la ciudad */}
          <input
            id="nombreCiudad"
            type="text"
            placeholder="Nombre de la ciudad"
            aria-label="Nombre de la ciudad"
            value={nuevoNombre}
            onChange={(evento) =>
              setNuevoNombre(evento.currentTarget.value)
            }
          />

          {/* Campo de la zona horaria */}
          <input
            id="zonaHoraria"
            type="text"
            placeholder="Zona horaria IANA"
            aria-label="Zona horaria IANA"
            value={nuevaZonaHoraria}
            onChange={(evento) =>
              setNuevaZonaHoraria(evento.currentTarget.value)
            }
          />

        </div>

        {/* Botón para añadir la ciudad */}
        <button type="submit" className="boton-anadir">
          Añadir Ciudad
        </button>

        {/* Mensaje de error del formulario */}
        {errorFormulario && (
          <p className="error-formulario">
            {errorFormulario}
          </p>
        )}

      </form>

      {/* Cuadrícula de relojes mundiales */}
      <div className="grilla-relojes">

        {ciudades.map((item) => (

          <article
            key={item.id}
            className={`tarjeta-reloj ${
              item.esPrincipal ||
              item.id === ciudadDestacadaId
                ? 'destacada'
                : ''
            }`}
          >

            {/* Nombre de la ciudad */}
            <h3 className="nombre-ciudad">
              {item.ciudad}
            </h3>

            {/* Zona horaria */}
            <p className="zona-horaria">
              {item.zonaHoraria}
            </p>

            {/* Hora actual */}
            <div className="visor-hora">
              {obtenerHoraZona(item.zonaHoraria)}
            </div>

            {/* Indicador de día o noche */}
            <div className="indicador-dia-noche">
              {obtenerIndicadorDiaNoche(item.zonaHoraria)}
            </div>

          </article>

        ))}

      </div>

    </div>
  );
}
