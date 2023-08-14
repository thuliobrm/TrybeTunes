import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';
import Images from '../Images/logo.svg';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
    };
  }

  handleLoginUser = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { name } = this.state;
      await createUser({ name });
      this.setState({
        isLoading: false,
      });
      const { history } = this.props;
      history.push('/search');
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { name, isLoading } = this.state;
    const MAX_CHAR = 3;
    const buttonDisabled = name.length < MAX_CHAR;
    return (
      <div data-testid="page-login" className="login-container">
        <section className="form-container">
          { isLoading === true ? <Loading /> : (
            <form className="form-content">
              <img className="img-container" src={ Images } alt="Logo Trybe Tunes" />

              <input
                className="login-content"
                data-testid="login-name-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                placeholder="Digite seu nome"
              />
              <button
                className="btn-container"
                data-testid="login-submit-button"
                onClick={ this.handleLoginUser }
                disabled={ buttonDisabled }
              >
                Entrar
              </button>
            </form>
          )}
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Login;
