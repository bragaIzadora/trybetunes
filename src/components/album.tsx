import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import MusicCard from './musicCard';
import { AlbumType, SongType } from '../types';
import Loading from './loading';
import './style.css';

interface AlbumData {
  album: AlbumType;
  songs: SongType[];
}

function Album() {
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  const fetchAlbumData = async (albumId: string) => {
    try {
      const musicData: (AlbumType | SongType)[] = await getMusics(albumId);

      const albumInfo: AlbumData = {
        album: musicData[0] as AlbumType,
        songs: musicData.slice(1) as SongType[],
      };

      setAlbumData(albumInfo);
    } catch (error) {
      console.error('Error fetching album data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAlbumData(id);
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!albumData) {
    return <p>Dados do álbum não encontrados.</p>;
  }

  const { album, songs } = albumData;

  return (
    <div className="results resultsSongs">
      <h2 data-testid="artist-name">{album.artistName}</h2>
      <h3 data-testid="album-name">{album.collectionName}</h3>

      {songs.map((music) => (
        <MusicCard key={ music.trackId } music={ music } />
      ))}
    </div>
  );
}

export default Album;
