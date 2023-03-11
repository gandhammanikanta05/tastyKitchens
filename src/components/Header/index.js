import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <div className="logo-section">
        <img
          src="https://res.cloudinary.com/dctnoka3e/image/upload/v1677837777/Group_7420_f2kxob.png"
          alt="website logo"
        />
        <p className="heading">Tasty Kitchens</p>
      </div>
      <div className="end-section">
        <Link to="/" className="link-item">
          <p className="heading-1">Home</p>
        </Link>
        <Link to="/cart" className="link-item">
          <p className="heading-2">Cart</p>
        </Link>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
