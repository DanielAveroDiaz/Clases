import { useState, useEffect } from 'react';
import axios from 'axios';
import './CatalogoPokemonDAD.css';

// 1. Interfaces TypeScript para el tipado de la PokeAPI
interface PokeAPIListItem {
  name: string;
  url: string;
}

interface PokeAPIResponseList {
  results: PokeAPIListItem[];
}

export interface PokemonDetalle {
  id: number;
  nombre: string;
  imagen: string;
  altura: number; // Expresado originalmente en decímetros
  peso: number;   // Expresado originalmente en hectogramos
  tipos: string;  // Tipos elementales concatenados (Ampliación)
}

export function CatalogoPokemonDAD() {
  const nombreAlumno: string = "Daniel Avero Díaz";

  // 2. Triada de Estados Asíncronos
  const [pokemonList, setPokemonList] = useState<PokemonDetalle[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de Ampliación
  const [busqueda, setBusqueda] = useState<string>('');
  const [criterioOrden, setCriterioOrden] = useState<string>('original');

  const limitePokemon: number = 9;
  const temaClase: string = 'tema-fuego';

  // 3. Función asíncrona para obtener el catálogo completo mediante Axios
  const obtenerPokemon = async () => {
    try {
      setCargando(true);
      setError(null);

      // Petición 1: Obtener el listado inicial de URLs
      const respuestaLista = await axios.get<PokeAPIResponseList>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limitePokemon}&offset=0`
      );

      // Petición 2: Consultar los detalles de cada Pokémon en paralelo
      const peticionesDetalle = respuestaLista.data.results.map((item) =>
        axios.get(item.url)
      );

      // Resolvemos todas las promesas de detalle simultáneamente
      const respuestasDetalle = await Promise.all(peticionesDetalle);

      // Mapeamos los datos limpios a nuestra estructura interna (incluyendo tipos)
      const datosFormateados: PokemonDetalle[] = respuestasDetalle.map((res) => ({
        id: res.data.id,
        nombre: res.data.name,
        imagen:
          res.data.sprites.front_default ||
          res.data.sprites.other?.['official-artwork']?.front_default,
        altura: res.data.height,
        peso: res.data.weight,
        tipos: res.data.types.map((t: any) => t.type.name).join(' '),
      }));

      setPokemonList(datosFormateados);
    } catch (err) {
      console.error("Error consultando PokeAPI:", err);
      setError("No se pudo conectar con el servidor de PokeAPI. Revisa tu conexión a Internet.");
    } finally {
      setCargando(false);
    }
  };

  // 4. Invocación asíncrona dentro de useEffect
  useEffect(() => {
    obtenerPokemon();
  }, []);

  // Lógica de Filtrado por nombre (Buscador reactivo)
  const pokemonsFiltrados = pokemonList.filter((pokemon) =>
    pokemon.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Lógica de Ordenación (.sort())
  const pokemonsOrdenados = [...pokemonsFiltrados].sort((a, b) => {
    if (criterioOrden === 'peso-desc') {
      return b.peso - a.peso; // Mayor a menor peso
    }
    if (criterioOrden === 'altura-asc') {
      return a.altura - b.altura; // Menor a mayor altura
    }
    return a.id - b.id; // Orden original por ID
  });

  return (
    <div className={`catalogo-contenedor ${temaClase}`}>
      <header className="cabecera-catalogo">
        <h2>Práctica 02.22: Consumo de PokeAPI con Axios</h2>
        <p><strong>Estudiante:</strong> {nombreAlumno}</p>
        <p>
          <small>
            Registros configurados: {limitePokemon} Pokémon | Mostrando: {pokemonsOrdenados.length}
          </small>
        </p>
      </header>

      {/* Barra de Buscador y Ordenación (Ampliación) */}
      {!cargando && !error && (
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <input
            type="text"
            placeholder="Buscar Pokémon por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', flex: '1', minWidth: '220px' }}
          />
          <select
            value={criterioOrden}
            onChange={(e) => setCriterioOrden(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
          >
            <option value="original">Orden original (ID)</option>
            <option value="peso-desc">Mayor a menor peso</option>
            <option value="altura-asc">Menor a mayor altura</option>
          </select>
        </div>
      )}

      {/* RENDERIZADO CONDICIONAL 1: Estado de Carga */}
      {cargando && (
        <div className="panel-cargando">
          <span className="spinner-icono">⏳</span>
          <p>Cargando datos desde PokeAPI con Axios...</p>
        </div>
      )}

      {/* RENDERIZADO CONDICIONAL 2: Estado de Error */}
      {error && !cargando && (
        <div className="panel-error">
          <p>{error}</p>
          <button className="btn-reintentar" onClick={obtenerPokemon}>
            Reintentar Petición
          </button>
        </div>
      )}

      {/* RENDERIZADO CONDICIONAL 3: Mostrar Catálogo de Tarjetas */}
      {!cargando && !error && (
        <div className="grilla-pokemon">
          {pokemonsOrdenados.map((pokemon) => {
            const alturaMetros = (pokemon.altura / 10).toFixed(1);
            const pesoKg = (pokemon.peso / 10).toFixed(1);

            return (
              <article key={pokemon.id} className="tarjeta-pokemon">
                <div className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</div>
                <img
                  src={pokemon.imagen}
                  alt={pokemon.nombre}
                  className="pokemon-imagen"
                  loading="lazy"
                />
                <h3 className="pokemon-nombre">{pokemon.nombre}</h3>
                
                {/* Insignia de Tipos Elementales (Ampliación) */}
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {pokemon.tipos}
                </div>

                <div className="metrica-box">
                  <div className="metrica-item">
                    <span>Altura</span>
                    <strong>{alturaMetros} m</strong>
                  </div>
                  <div className="metrica-item">
                    <span>Peso</span>
                    <strong>{pesoKg} kg</strong>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}