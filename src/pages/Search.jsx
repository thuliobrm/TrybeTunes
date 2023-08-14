import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';
import '../styles/Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
      albumList: [],
      artist: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSearch = async () => {
    const { name } = this.state;
    this.setState({
      name: '',
      isLoading: true,
      artist: name,
    });
    const albumList = await searchAlbumsAPI(name);
    console.log(albumList);
    this.setState({
      isLoading: false,
      albumList,
    });
  };

  render() {
    const {
      name,
      isLoading,
      artist,
      albumList,
    } = this.state;
    const MAX_CHAR = 2;
    const buttonDisabled = name.length < MAX_CHAR;
    const nothingFound = artist.length > 0 && albumList.length === 0;
    return (
      <div data-testid="page-search">
        { isLoading === true ? <Loading /> : (
          <>
            <section className="input-and-btn-container">
              <Header />
              <input
                className="input-content"
                data-testid="search-artist-input"
                placeholder="Nome da banda ou artista"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
              <button
                className="btn-content"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.handleSearch }
              >
                Pesquisar
              </button>
              <p>
                Resultado de álbuns de:
                {' '}
                { artist }
              </p>
            </section>
            {
              nothingFound ? 'Nenhum álbum foi encontrado' : (
                albumList.map((album) => (
                  <Link
                    key={ album.collectionId }
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <Card
                      artistId={ album.artistId }
                      artistName={ album.artistName }
                      collectionId={ album.collectionId }
                      collectionName={ album.collectionName }
                      collectionPrice={ album.collectionPrice }
                      artworkUrl100={ album.artworkUrl100 }
                      releaseDate={ album.releaseDate }
                      trackCount={ album.trackCount }
                    />
                  </Link>
                ))
              )
            }
          </>
        )}
      </div>
    );
  }
}
export default Search;
