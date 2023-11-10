import React, { useState } from 'react';
import emptyHeart from '../images/empty_heart.png';
import checkedHeart from '../images/checked_heart.png';

interface MusicCardProps {
  music: {
    trackId: number;
    trackName: string;
    previewUrl: string;
  };
}

function MusicCard({ music }: MusicCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const { trackId, trackName, previewUrl } = music;

  const handleCheckboxChange = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          checked={ isFavorited }
          onChange={ handleCheckboxChange }
          style={ { display: 'none' } }
        />
        <img
          src={ isFavorited ? checkedHeart : emptyHeart }
          alt="favorite"
          style={ { width: '20px', height: '20px' } }
        />
      </label>
    </div>
  );
}

export default MusicCard;
