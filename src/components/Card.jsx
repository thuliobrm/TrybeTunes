import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;

    return (
      <ul>
        <li>{ artistId }</li>
        <li>{ artistName }</li>
        <li>{ collectionId }</li>
        <li>{ collectionName }</li>
        <li>{ collectionPrice }</li>
        <li>{ artworkUrl100 }</li>
        <li>{ releaseDate }</li>
        <li>{ trackCount }</li>
      </ul>
    );
  }
}

export default Card;

Card.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};
