import React, { useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

interface MusicCardProps {
  music: SongType;
}

function MusicCard({ music }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteChange = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <p>{music.trackName}</p>
      <audio
        data-testid={ `audio-component-${music.trackId}` }
        src={ music.previewUrl }
        controls
      >
        <track kind="captions" />
        O seu navegador não suporta o elemento 
        <code>
          audio
        </code>
        .
      </audio>
      <label
        data-testid={ `checkbox-music-${music.trackId}` }
        htmlFor={ `checkbox-music-${music.trackId}` }
      >
        <input
          id={ `checkbox-music-${music.trackId}` }
          type="checkbox"
          checked={ isFavorite }
          onChange={ handleFavoriteChange }
        />
        <img
          src={ isFavorite ? checkedHeart : emptyHeart }
          alt="favorite"
          style={ { width: '20px', height: '20px' } }
        />
      </label>
    </div>
  );
}

export default MusicCard;
