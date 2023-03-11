import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errMsg: '',
    isError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errormsg => {
    this.setState({errMsg: errormsg, isError: true})
  }

  onClickLogin = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {isError, errMsg} = this.state
    return (
      <div className="main-container">
        <div className="first-section">
          <div className="login-card">
            <img
              src="https://res.cloudinary.com/dctnoka3e/image/upload/v1677837777/Group_7420_f2kxob.png"
              alt="website logo"
              className="website-logo"
            />
            <p className="heading">Tasty Kitchens</p>
            <p className="login">Login</p>
            <div className="input-section">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                id="username"
                type="input"
                className="input-box"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-section">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                className="input-box"
                onChange={this.onChangePassword}
              />
            </div>
            <button
              type="button"
              className="login-btn"
              onClick={this.onClickLogin}
            >
              Login
            </button>
            {isError && <p className="errorMsg">{errMsg}</p>}
          </div>
        </div>
        <div className="second-section">
          <img
            src="https://res.cloudinary.com/dctnoka3e/image/upload/v1677836678/Rectangle_1456_be8wsh.png"
            alt="website login"
            className="image"
          />
        </div>
      </div>
    )
  }
}

export default Login
