import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import Loading from './loading';
import './style.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchedArtist, setSearchedArtist] = useState('');
  const [noAlbumsFound, setNoAlbumsFound] = useState(false);
  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await searchAlbumsAPI(searchTerm);

      if (response.length > 0) {
        setAlbums(response);
        setSearchedArtist(searchTerm);
        setNoAlbumsFound(false);
      } else {
        setAlbums([]);
        setNoAlbumsFound(true);
      }
    } catch (error) {
      console.error('Error fetching albums', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
    setSearchTerm('');
  };

  const displayAlbums = searchedArtist && (
    <div className="results">
      <h2>{`Resultado de álbuns de: ${searchedArtist}`}</h2>
      {albums.map((album) => (
        <div key={ album.collectionId }>
          <p className="nameSearch">
            { album.collectionName }
            <Link
              className="Album"
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              Ver Álbum
            </Link>
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <form onSubmit={ handleSubmit } className="inputSearch">
        <input
          type="text"
          value={ searchTerm }
          onChange={ handleInputChange }
          placeholder="Pesquisar artista ou banda"
          data-testid="search-artist-input"
          disabled={ loading }
          className="input inputS"
        />
        <button
          disabled={ searchTerm.length < 2 || loading }
          data-testid="search-artist-button"
          className="buttonS"
        >
          Pesquisar
        </button>
      </form>

      {loading && <Loading />}

      {noAlbumsFound && !loading && <p>Nenhum álbum foi encontrado</p>}

      {albums.length > 0 && !noAlbumsFound && !loading && (
        <div>
          {displayAlbums}
        </div>
      )}
    </div>
  );
}

export default Search;
