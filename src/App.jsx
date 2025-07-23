

import { useState, useEffect } from 'react';
import CharacterList from './CharacterList';
import EpisodeList from './EpisodeList';

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.style.background = dark ? '#242424' : '#fff';
    document.body.style.color = dark ? '#fff' : '#222';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <button onClick={() => setDark(d => !d)} style={{ position: 'absolute', right: 32, top: 24, padding: 8, fontSize: 18 }}>
        {dark ? '🌙 Modo oscuro' : '☀️ Modo claro'}
      </button>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Rick y Morty API</h1>
      <CharacterList />
      <hr style={{ margin: '2rem 0' }} />
      <EpisodeList />
    </div>
  );
}

export default App;
