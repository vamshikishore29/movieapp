import {Component} from 'react'

import {Link} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'
import {GrFormClose} from 'react-icons/gr'

import './index.css'

class Header extends Component {
  state = {isShowList: false}

  savedQueue = () =>
    this.setState(prevState => ({
      isShowList: !prevState.isShowList,
    }))

  closeButton = () =>
    this.setState(prevState => ({
      isShowList: !prevState.isShowList,
    }))

  renderNavBar = () => (
    <nav className="navbar">
      <div className="lg-nav-link-con">
        <div className="movie-img-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dz6z23sht/image/upload/v1654697780/Movies%20App/Group_7399_gxpvkz.png"
              alt="website logo"
              className="home-logo-img"
            />
          </Link>
        </div>

        <ul className="header-link-container">
          <Link to="/" className="link">
            <li className="header-link">Home</li>
          </Link>
          <Link to="/popular" className="link">
            <li className="header-link">Popular</li>
          </Link>
        </ul>
      </div>

      <div className="icon-profile-container">
        <Link to="/search">
          <button
            type="button"
            className="search-container"
            testid="searchButton"
          >
            <HiOutlineSearch className="search-icon" />
          </button>
        </Link>

        <Link to="/account">
          <img
            src="https://res.cloudinary.com/dz6z23sht/image/upload/v1654878907/Movies%20App/Group_miblmk.png"
            alt="profile"
            className="profile-img"
          />
        </Link>
        <button
          type="button"
          className="saved-icon-btn saved-icon"
          onClick={this.savedQueue}
        >
          <img
            src="https://res.cloudinary.com/dz6z23sht/image/upload/v1654879436/Movies%20App/add-to-queue_1_nte8cg.png"
            alt="profile"
            className=" saved-icon"
          />
        </button>
      </div>
    </nav>
  )

  renderSmList = () => (
    <ul className="header-link-container sm-list-con">
      <Link to="/" className="link">
        <li className="header-link">Home</li>
      </Link>
      <Link to="/popular" className="link">
        <li className="header-link">Popular</li>
      </Link>
      <Link to="/account" className="link">
        <li className="header-link">Account</li>
      </Link>
      <button type="button" onClick={this.closeButton}>
        <GrFormClose />
      </button>
    </ul>
  )

  render() {
    const {isShowList} = this.state
    return (
      <>
        {this.renderNavBar()} {isShowList && this.renderSmList()}
      </>
    )
  }
}

export default Header
