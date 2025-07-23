
import { useRickMortyApi } from './useRickMortyApi';
import { useState } from 'react';
import axios from 'axios';

export default function EpisodeList() {
  const { data, loading, error } = useRickMortyApi('episode');
  const [search, setSearch] = useState('');

  // Eliminado: personajes por episodio

  if (loading) return <p>Cargando episodios...</p>;
  if (error) return <p>Error al cargar episodios</p>;

  const filtered = data.results.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.episode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Episodios</h2>
      <input
        type="text"
        placeholder="Buscar episodio por nombre o código..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: 8, marginBottom: 16 }}
      />
      <ul>
        {filtered.map(episode => (
          <li key={episode.id} style={{ marginBottom: 8 }}>
            <strong>{episode.name}</strong> - {episode.episode} ({episode.air_date})
          </li>
        ))}
      </ul>
    </div>
  );
}
