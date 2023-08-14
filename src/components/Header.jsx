import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Images from '../Images/logo.svg';
import '../styles/Search.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.handleLoadingUser();
  }

  handleLoadingUser = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const response = await getUser();
      this.setState({
        isLoading: false,
        user: response,
      });
    });
  };

  render() {
    const { isLoading, user } = this.state;
    return (
      <section className="links-container">
        <img className="img-content" src={ Images } alt="Trybe Tunes" />
        <header data-testid="header-component">
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          { isLoading === true ? <Loading /> : (
            <p
              data-testid="header-user-name"
            >
              { user.name }
            </p>

          )}
        </header>
      </section>

    );
  }
}

export default Header;
