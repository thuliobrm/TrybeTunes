import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      artist: '',
      album: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      await this.handleMusics(favoriteSongs);
      this.setState({
        isLoading: false,
      });
    });
  }

  handleMusics = async (favoriteSongs) => {
    const { match } = this.props;
    const { id } = match.params;
    const [artistInfo, ...musicList] = await getMusics(id);
    const enhancedMusicList = musicList.map((music) => {
      music.isFavorite = !!favoriteSongs
        .find((favMusic) => favMusic.trackId === music.trackId);
      return music;
    });
    this.setState({
      musicList: enhancedMusicList,
      artist: artistInfo.artistName,
      album: artistInfo.collectionName,
    });
  };

  render() {
    const {
      musicList,
      artist,
      album,
      isLoading,
    } = this.state;
    return (
      <div data-testid="page-album">
        { isLoading ? <Loading /> : (
          <>
            <Header />
            <p data-testid="artist-name">{ artist }</p>
            <p data-testid="album-name">{ album }</p>
            { musicList.map((music) => (
              <MusicCard
                key={ music.trackName }
                music={ music }
              />
            ))}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;
