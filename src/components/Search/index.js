import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {HiOutlineSearch} from 'react-icons/hi'

import PopularItem from '../PopularItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {searchList: [], searchText: '', apiStatus: apiStatusConstants}

  componentDidMount() {
    this.getSearchList()
  }

  getSearchResults = () => {
    this.getSearchList()
  }

  retryButton = () => {
    this.getSearchList()
  }

  onGetText = event => this.setState({searchText: event.target.value})

  updatedData = data => ({
    backdropPath: data.backdrop_path,
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
  })

  getSearchList = async () => {
    const {searchText} = this.state
    if (searchText.length === 0) {
      this.setState({searchText: 'query'})
    }

    const token = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${token}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}
`,
      options,
    )

    if (response.ok) {
      const data = await response.json()
      const searchData = data.results.map(eachList =>
        this.updatedData(eachList),
      )
      this.setState({
        searchList: searchData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container ldr-con" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        src="https://res.cloudinary.com/dz6z23sht/image/upload/v1655789222/Movies%20App/Group_7394_jqxtxu.png"
        alt="failure view"
        className="popular-not-found"
      />
      <p className="movie-not-found-heading">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.retryButton}
      >
        Try Again
      </button>
    </div>
  )

  renderHeader = () => (
    <nav className="navbar">
      <div className="lg-nav-link-con">
        <Link to="/">
          <div className="movie-img-container">
            <img
              src="https://res.cloudinary.com/dz6z23sht/image/upload/v1654697780/Movies%20App/Group_7399_gxpvkz.png"
              alt="website logo"
              className="home-logo-img"
            />
          </div>
        </Link>
        <ul className="header-link-container">
          <Link to="/" className="link">
            <h1 className="header-link">Home</h1>
          </Link>
          <Link to="/popular" className="link">
            <h1 className="header-link">Popular</h1>
          </Link>
        </ul>
      </div>

      <div className="icon-profile-container">
        <Link to="/search">
          <div className="search-container">
            <input type="search" className="search" onChange={this.onGetText} />
            <button
              type="button"
              className="search-btn"
              onClick={this.getSearchResults}
              testid="searchButton"
            >
              <HiOutlineSearch className="search-icon search-icon1" />
            </button>
          </div>
        </Link>
        <Link to="/account">
          <img
            src="https://res.cloudinary.com/dz6z23sht/image/upload/v1654879436/Movies%20App/add-to-queue_1_nte8cg.png"
            alt="profile"
            className="saved-icon"
          />
          <img
            src="https://res.cloudinary.com/dz6z23sht/image/upload/v1654878907/Movies%20App/Group_miblmk.png"
            alt="profile"
            className="profile-img"
          />
        </Link>
      </div>
    </nav>
  )

  renderSearchDetailsView = () => {
    const {searchList} = this.state
    return (
      <div className="pop-list-con">
        <ul className="popular-list">
          {searchList.map(eachList => (
            <PopularItem popularListDetails={eachList} key={eachList.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderEmptyListView = () => {
    const {searchText} = this.state
    return (
      <div className="product-details-error-view-container">
        <img
          src="https://res.cloudinary.com/dz6z23sht/image/upload/v1655789222/Movies%20App/Group_7394_jqxtxu.png"
          alt="no movies"
          className="popular-not-found"
        />
        <p className="movie-not-found-heading">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderNoListView = () => {
    const {searchList} = this.state
    if (searchList.length === 0) {
      return this.renderEmptyListView()
    }
    return null
  }

  renderSearchDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSearchDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        {this.renderHeader()}
        {this.renderSearchDetails()}
        {this.renderNoListView()}
        <div className="footer-con">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Search
