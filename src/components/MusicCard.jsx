import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    console.log(props.music.isFavorite);
    this.state = {
      isChecked: props.music.isFavorite,
      isLoading: false,
    };
  }

  handleChange = async () => {
    const { music, onRemoveSongFromFav } = this.props;
    const { isChecked } = this.state;
    this.setState((prevState) => ({
      isLoading: true,
      isChecked: !prevState.isChecked,
    }));
    if (isChecked) {
      await removeSong(music);
      if (onRemoveSongFromFav !== undefined) {
        onRemoveSongFromFav();
      }
    } else {
      await addSong(music);
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { isLoading, isChecked } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        { isLoading && <Loading /> }
        <label
          htmlFor="favorite"
        >
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="favorite"
            name="name"
            checked={ isChecked }
            onChange={ this.handleChange }
          />
          Favorita

        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.shape({
    trackName: propTypes.string,
    previewUrl: propTypes.string,
  }),
  onRemoveSongFromFav: propTypes.func,
}.isRequired;

export default MusicCard;
