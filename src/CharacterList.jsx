// Mapeo de nombres en español (ejemplo, puedes agregar más)
const nameMap = {
  'Rick Sanchez': 'Rick Sánchez',
  'Morty Smith': 'Morty Smith',
  'Summer Smith': 'Summer Smith',
  'Beth Smith': 'Beth Smith',
  'Jerry Smith': 'Jerry Smith',
  'Birdperson': 'Pajaro Persona',
  'Squanchy': 'Squanchy',
  'Mr. Meeseeks': 'Sr. Meeseeks',
  'Jessica': 'Jessica',
  'Abradolf Lincler': 'Abradolf Lincler',
  'Evil Morty': 'Morty Malvado',
  'Noob-Noob': 'Noob-Noob',
  'Unity': 'Unidad',
  'Gearhead': 'Cabeza de Engranaje',
  'Tammy Guetermann': 'Tammy Guetermann',
  'Principal Vagina': 'Director Vagina',
  'Mr. Goldenfold': 'Sr. Goldenfold',
  'Ants in my Eyes Johnson': 'Johnson Hormigas en los Ojos',
  // ...agrega más si lo deseas
};



import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from './Modal';

function getSeasonFromEpisodeUrl(url) {
  const epNum = parseInt(url.split('/').pop(), 10);
  if (epNum <= 11) return 1;
  if (epNum <= 21) return 2;
  if (epNum <= 31) return 3;
  if (epNum <= 41) return 4;
  if (epNum <= 51) return 5;
  if (epNum <= 61) return 6;
  return 7;
}

function getSpeciesList(characters) {
  return Array.from(new Set(characters.map(c => c.species))).sort();
}
function getStatusList(characters) {
  return Array.from(new Set(characters.map(c => c.status))).sort();
}
function getGenderList(characters) {
  return Array.from(new Set(characters.map(c => c.gender))).sort();
}

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [season, setSeason] = useState('');
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);
  // Eliminar paginación

  useEffect(() => {
    let cancel = false;
    async function fetchAllCharacters() {
      setLoading(true);
      setError(null);
      let all = [];
      let page = 1;
      try {
        while (!cancel) {
          const res = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
          all = all.concat(res.data.results);
          if (!res.data.info.next) break;
          page++;
        }
        if (!cancel) setCharacters(all);
      } catch (err) {
        if (!cancel) setError(err);
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    fetchAllCharacters();
    return () => { cancel = true; };
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  if (loading) return <p>Cargando todos los personajes...</p>;
  if (error) return <p>Error al cargar personajes</p>;

  // Filtrar por nombre, temporada, especie, estado, género y favoritos
  const filtered = characters.filter(character => {
    const matchName = character.name.toLowerCase().includes(search.toLowerCase());
    const matchSpecies = !species || character.species === species;
    const matchStatus = !status || character.status === status;
    const matchGender = !gender || character.gender === gender;
    const matchFav = !showOnlyFavs || favorites.includes(character.id);
    if (!season) return matchName && matchSpecies && matchStatus && matchGender && matchFav;
    const appearsInSeason = character.episode.some(url => getSeasonFromEpisodeUrl(url) === Number(season));
    return matchName && matchSpecies && matchStatus && matchGender && appearsInSeason && matchFav;
  });


  const speciesList = getSpeciesList(characters);
  const statusList = getStatusList(characters);
  const genderList = getGenderList(characters);

  // Traducciones
  const speciesMap = {
    'Human': 'Humano',
    'Alien': 'Alienígena',
    'Humanoid': 'Humanoide',
    'Poopybutthole': 'Poopybutthole',
    'Mythological Creature': 'Criatura mitológica',
    'Animal': 'Animal',
    'Robot': 'Robot',
    'Cronenberg': 'Cronenberg',
    'Disease': 'Enfermedad',
    'unknown': 'Desconocido',
    'Other': 'Otro'
  };
  const statusMap = {
    'Alive': 'Vivo',
    'Dead': 'Muerto',
    'unknown': 'Desconocido'
  };
  const genderMap = {
    'Male': 'Masculino',
    'Female': 'Femenino',
    'Genderless': 'Sin género',
    'unknown': 'Desconocido'
  };

  function toggleFavorite(id) {
    setFavorites(favs => favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]);
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Todos los personajes ({filtered.length})</h2>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8 }}
        />
        <select value={season} onChange={e => setSeason(e.target.value)} style={{ padding: 8 }}>
          <option value="">Todas las temporadas</option>
          <option value="1">Temporada 1</option>
          <option value="2">Temporada 2</option>
          <option value="3">Temporada 3</option>
          <option value="4">Temporada 4</option>
          <option value="5">Temporada 5</option>
        </select>
        <select value={species} onChange={e => setSpecies(e.target.value)} style={{ padding: 8 }}>
          <option value="">Todas las especies</option>
          {speciesList.map(s => <option key={s} value={s}>{speciesMap[s] || s}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: 8 }}>
          <option value="">Todos los estados</option>
          {statusList.map(s => <option key={s} value={s}>{statusMap[s] || s}</option>)}
        </select>
        <select value={gender} onChange={e => setGender(e.target.value)} style={{ padding: 8 }}>
          <option value="">Todos los géneros</option>
          {genderList.map(g => <option key={g} value={g}>{genderMap[g] || g}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <button onClick={() => setFavorites([])} style={{ padding: 8 }}>Limpiar favoritos</button>
        <button onClick={() => setShowOnlyFavs(f => !f)} style={{ padding: 8, marginLeft: 8 }}>
          {showOnlyFavs ? 'Ver todos' : 'Ver solo favoritos'}
        </button>
        <span style={{ marginLeft: 12 }}>Favoritos: {favorites.length}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        {filtered.map(character => (
          <div key={character.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12, width: 200, position: 'relative', background: favorites.includes(character.id) ? '#fffbe6' : '#fff', color: '#222', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={character.image} alt={character.name} style={{ width: '100%', borderRadius: 8, cursor: 'pointer' }} onClick={() => setSelected(character)} />
            <button onClick={() => toggleFavorite(character.id)} style={{ position: 'absolute', top: 8, right: 8, background: '#eee', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }} title="Favorito">
              <span style={{ color: favorites.includes(character.id) ? '#e00' : '#bbb', transition: 'color 0.2s' }}>
                {favorites.includes(character.id) ? '❤️' : '🤍'}
              </span>
            </button>
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <h3 style={{ margin: '8px 0', cursor: 'pointer' }} onClick={() => setSelected(character)}>{nameMap[character.name] || character.name}</h3>
              <p style={{ margin: '4px 0', fontSize: 14 }}><strong>Especie:</strong> {speciesMap[character.species] || character.species}</p>
              <p style={{ margin: '4px 0', fontSize: 14 }}><strong>Estado:</strong> {statusMap[character.status] || character.status}</p>
              <p style={{ margin: '4px 0', fontSize: 14 }}><strong>Género:</strong> {genderMap[character.gender] || character.gender}</p>
            </div>
          </div>
        ))}
      </div>
      <Modal character={selected} onClose={() => setSelected(null)} />
      <div style={{ marginTop: 32 }}>
        <h3 style={{ textAlign: 'center' }}>Favoritos</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
          {characters.filter(c => favorites.includes(c.id)).map(character => (
            <div key={character.id} style={{ border: '1px solid #f90', borderRadius: 8, padding: 12, width: 200, background: '#fffbe6' }}>
              <img src={character.image} alt={character.name} style={{ width: '100%', borderRadius: 8 }} />
              <h3>{character.name}</h3>
              <p>{character.species} - {character.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
