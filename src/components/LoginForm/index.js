import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isShowErr: false, errMsg: ''}

  submitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.setState({errMsg: data.error_msg, isShowErr: true})
    }
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderLoginForm = () => {
    const {username, password, isShowErr, errMsg} = this.state
    return (
      <form className="login-form-container" onSubmit={this.onSubmitDetails}>
        <h1 className="form-heading">Login</h1>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <br />
        <input
          className="input"
          id="username"
          type="text"
          onChange={this.changeUserName}
          value={username}
        />
        <br />
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <br />
        <input
          className="input"
          id="password"
          type="password"
          onChange={this.changePassword}
          value={password}
        />
        <br />
        {isShowErr && <p className="error">*{errMsg}</p>}
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    )
  }

  renderLogo = () => (
    <div className="movie-img-container">
      <img
        src="https://res.cloudinary.com/dz6z23sht/image/upload/v1654697780/Movies%20App/Group_7399_gxpvkz.png"
        alt="login website logo"
        className="logo-img"
      />
    </div>
  )

  render() {
    return (
      <div className="login-container">
        {this.renderLogo()}
        {this.renderLoginForm()}
      </div>
    )
  }
}

export default LoginForm
