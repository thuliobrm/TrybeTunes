import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favSongs: [],
    };
  }

  componentDidMount() {
    this.handleFavSongs();
  }

  handleFavSongs = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const favSongs = await getFavoriteSongs();
      const enhancedMusicList = favSongs.map((favSong) => {
        favSong.isFavorite = true;
        return favSong;
      });
      this.setState({
        favSongs: enhancedMusicList,
        isLoading: false,
      });
    });
  };

  render() {
    const { favSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading === true ? <Loading /> : (
          favSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              music={ song }
              onRemoveSongFromFav={ this.handleFavSongs }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
