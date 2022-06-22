import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icons-container">
      <div className="icons">
        <FaGoogle />
      </div>
      <div className="icons">
        <FaTwitter />
      </div>
      <div className="icons">
        <FaInstagram />
      </div>
      <div className="icons">
        <FaYoutube />
      </div>
    </div>
    <p className="footer-heading">Contact us</p>
  </div>
)

export default Footer
