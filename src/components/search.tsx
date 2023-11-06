import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import Loading from './loading';

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

  return (
    <div>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          handleSearch();
        } }
      >
        <input
          type="text"
          value={ searchTerm }
          onChange={ handleInputChange }
          placeholder="Pesquisar artista ou banda"
          data-testid="search-artist-input"
          disabled={ loading }
        />
        <button
          disabled={ searchTerm.length < 2 || loading }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>

      {loading && <Loading />}

      {noAlbumsFound ? (
        <p>Nenhum álbum foi encontrado</p>
      ) : (
        <>
          {searchedArtist && (
            <p>
              Resultado de álbuns de:
              {searchedArtist}
            </p>
          )}

          {albums.map((album) => (
            <div key={ album.collectionId }>
              <p>{album.collectionName}</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Ver Álbum
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Search;
