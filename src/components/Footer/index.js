import {BsInstagram, BsTwitter, BsFacebook} from 'react-icons/bs'
import {FaPinterestP} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo-section">
        <img
          src="https://res.cloudinary.com/dctnoka3e/image/upload/v1678164348/Vector_wcbdwn.png"
          alt="website logo"
          className="logo"
        />
        <p className="footer-heading">Tasty Kitchens</p>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="social-media">
        <div className="each-social-media">
          <FaPinterestP />
        </div>
        <div className="each-social-media">
          <BsInstagram />
        </div>
        <div className="each-social-media">
          <BsTwitter />
        </div>
        <div className="each-social-media">
          <BsFacebook />
        </div>
      </div>
    </div>
  )
}
