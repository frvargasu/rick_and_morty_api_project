import { useState } from 'react';

export default function Modal({ character, onClose }) {
  if (!character) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{ background: '#fff', padding: 24, borderRadius: 12, minWidth: 320 }} onClick={e => e.stopPropagation()}>
        <img src={character.image} alt={character.name} style={{ width: 120, borderRadius: 8 }} />
        <h2>{character.name}</h2>
        <p><strong>Especie:</strong> {character.species}</p>
        <p><strong>Estado:</strong> {character.status}</p>
        <p><strong>Género:</strong> {character.gender}</p>
        <p><strong>Origen:</strong> {character.origin.name}</p>
        <p><strong>Ubicación:</strong> {character.location.name}</p>
        <p><strong>Episodios:</strong> {character.episode.length}</p>
        <button onClick={onClose} style={{ marginTop: 16 }}>Cerrar</button>
      </div>
    </div>
  );
}
