import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const logoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="account-container">
      <Header />
      <div className="account-details">
        <h1 className="acc-heading">Account</h1>
        <hr className="hr-line" />
        <div className="user-details">
          <p className="member">Member Ship</p>
          <div>
            <p>rahul@gmail.com</p>
            <p>Password *********</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="user-details">
          <p className="member">Plan Details</p>
          <p className="premium"> Premium Ultra HD</p>
        </div>
        <hr className="hr-line" />
        <div className="logout-con">
          <button className="logout-btn" type="button" onClick={logoutButton}>
            Logout
          </button>
        </div>
      </div>
      <div className="footer-con">
        <Footer />
      </div>
    </div>
  )
}
export default withRouter(Account)
