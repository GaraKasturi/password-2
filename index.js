import {Component} from 'react'

import {v4} from 'uuid'

import './Password.css'

import PasswordItem from './PasswordItem'

const initialContainerBackgroundClassNames = [
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    searchInput: '',
  }

  deletePassword = id => {
    const {passwordsList} = this.state

    this.setState({
      passwordsList: passwordsList.filter(each => each.id !== id),
    })
  }

  onSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderPasswordsList = () => {
    const {passwordsList} = this.state

    return passwordsList.map(each => (
      <PasswordItem
        key={each.id}
        details={each}
        deletePassword={this.deletePassword}
      />
    ))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const initialBackgroundColorClassName = `initial ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newPassword = {
      id: v4(),
      websiteName: website,
      name: username,
      userPassword: password,

      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  getSearchResults = () => {
    const {searchInput, passwordsList} = this.state

    const searchResults = passwordsList.filter(each =>
      each.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  render() {
    const {website, username, password, passwordsList} = this.state

    return (
      <div className="bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="enter-details-card">
          <form className="my-form" onSubmit={this.onAddPassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-element">
              <div className="input-image">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="image"
                />
              </div>

              <input
                type="text"
                placeholder="Enter Website"
                className="input-text"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-element">
              <div className="input-image">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="image"
                />
              </div>

              <input
                type="text"
                placeholder="Enter Username"
                className="input-text"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-element">
              <div className="input-image">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="image"
                />
              </div>

              <input
                type="password"
                placeholder="Enter Password"
                className="input-text"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="lg-manager-image"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sm-manager-image"
          />
        </div>
        <div className="password-container">
          <div className="search-count-container">
            <div className="h-p">
              <h1 className="para">Your Passwords</h1>
              <p className="count">{passwordsList.length}</p>
            </div>
            <div className="search">
              <div className="search-image-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-image"
                />
              </div>
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.onSearchInput}
              />
            </div>
          </div>

          <hr className="line" />

          {passwordsList.length !== 0 ? (
            <ul className="list-container">{this.renderPasswordsList()}</ul>
          ) : (
            <div className="no-password-image-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />

              <p className="no-p">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
