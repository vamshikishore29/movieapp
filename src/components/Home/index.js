import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loader-spinner'
import {BiError} from 'react-icons/bi'
import Header from '../Header'
import Trending from '../Trending'
import Original from '../Original'
import Footer from '../Footer'

import './index.css'

const randomApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const trendingApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const originalApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    trendingList: [],
    originalList: [],
    randomPoster: [],
    randomApiStatus: randomApiStatusConstants,
    trendingApiStatus: trendingApiStatusConstants,
    originalApiStatus: originalApiStatusConstants,
  }

  componentDidMount() {
    this.getRandom()
    this.getTrending()
    this.getOriginals()
  }

  retryRandomButton = () => {
    this.getRandom()
  }

  trendingRetryButton = () => {
    this.getTrending()
  }

  originalRetryButton = () => {
    this.getOriginals()
  }

  updatedData = data => ({
    backdropPath: data.backdrop_path,
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
  })

  getTrending = async () => {
    const token = Cookies.get('jwt_token')

    this.setState({trendingApiStatus: trendingApiStatusConstants.inProgress})

    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      options,
    )

    if (response.ok === true) {
      const data = await response.json()
      const trendingData = data.results.map(eachList =>
        this.updatedData(eachList),
      )
      this.setState({
        trendingList: trendingData,
        trendingApiStatus: trendingApiStatusConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: trendingApiStatusConstants.failure})
    }
  }

  getOriginals = async () => {
    const token = Cookies.get('jwt_token')

    this.setState({originalApiStatus: originalApiStatusConstants.inProgress})

    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )

    if (response.ok === true) {
      const data = await response.json()
      const originalData = data.results.map(eachList =>
        this.updatedData(eachList),
      )

      this.setState({
        originalList: originalData,

        originalApiStatus: originalApiStatusConstants.success,
      })
    } else {
      this.setState({originalApiStatus: originalApiStatusConstants.failure})
    }
  }

  getRandom = async () => {
    const token = Cookies.get('jwt_token')

    this.setState({randomApiStatus: randomApiStatusConstants.inProgress})

    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )

    if (response.ok === true) {
      const data = await response.json()
      const originalData = data.results.map(eachList =>
        this.updatedData(eachList),
      )
      const randomMovie =
        originalData[Math.ceil(Math.random() * originalData.length - 1)]

      this.setState({
        randomPoster: randomMovie,
        randomApiStatus: randomApiStatusConstants.success,
      })
    } else {
      this.setState({randomApiStatus: randomApiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrendingFailureView = () => (
    <div className="failure-view slider-container">
      <BiError className="err-icon" />
      <img
        src="https://res.cloudinary.com/dz6z23sht/image/upload/v1655789222/Movies%20App/Group_7394_jqxtxu.png"
        alt="failure view"
        className="home-not-found"
      />

      <p className="movie-not-found-heading">
        Something went wrong. Please try again.
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.trendingRetryButton}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalFailureView = () => (
    <div className="failure-view slider-container">
      <BiError className="err-icon" />
      <img
        src="https://res.cloudinary.com/dz6z23sht/image/upload/v1655789222/Movies%20App/Group_7394_jqxtxu.png"
        alt="failure view"
        className="home-not-found"
      />
      <p className="movie-not-found-heading">
        Something went wrong. Please try again.
      </p>

      <button
        type="button"
        className="try-again-button"
        onClick={this.originalRetryButton}
      >
        Try Again
      </button>
    </div>
  )

  randomLoadingView = () => (
    <>
      <Header />
      <div className="random-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  renderRandomFailureView = () => (
    <>
      <Header />
      <div className="random-failure-con home-top-container">
        <BiError className="err-icon" />
        <img
          src="https://res.cloudinary.com/dz6z23sht/image/upload/v1655789222/Movies%20App/Group_7394_jqxtxu.png"
          alt="failure view"
          className="popular-not-found"
        />
        <p className="movie-not-found-heading">
          Something went wrong. Please try again.
        </p>

        <button
          type="button"
          className="try-again-button"
          onClick={this.retryRandomButton}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderRandomMovie = () => {
    const {randomPoster} = this.state
    const {backdropPath, overview, title} = randomPoster
    return (
      <>
        <div className="home-top-container">
          <img src={backdropPath} alt={title} className="background-img" />
          <div className="header">
            <Header />
          </div>
          <div className="top-con-heading">
            <h1>{title}</h1>
          </div>
          <div className="overview">
            <p>{overview}</p>
          </div>

          <div className="shadow">
            <img
              src="https://res.cloudinary.com/dz6z23sht/image/upload/v1654930852/Movies%20App/Rectangle_1451_zy5ucq.png"
              alt="shadow"
              className="shadow-img"
            />
          </div>
          <div className="btn">
            <button type="button" className="button">
              Play
            </button>
          </div>
        </div>
      </>
    )
  }

  renderTrendingDetailsView = () => {
    const {trendingList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      slidesToScroll: 1,
      slidesToShow: 4,
    }
    return (
      <div className="slider-container">
        <h1 className="trending-heading">Trending Now</h1>
        <Slider {...settings} className="slider">
          {trendingList.map(each => (
            <Trending trendingListDetails={each} key={each.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderOriginalDetailsView = () => {
    const {originalList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      slidesToScroll: 1,
      slidesToShow: 4,
    }
    return (
      <div className="slider-container">
        <h1 className="trending-heading">Originals</h1>
        <Slider {...settings} className="slider">
          {originalList.map(each => (
            <Original originalListDetails={each} key={each.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderTrendingDetails = () => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
      case trendingApiStatusConstants.success:
        return this.renderTrendingDetailsView()
      case trendingApiStatusConstants.failure:
        return this.renderTrendingFailureView()
      case trendingApiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderOriginalDetails = () => {
    const {originalApiStatus} = this.state
    switch (originalApiStatus) {
      case originalApiStatusConstants.success:
        return this.renderOriginalDetailsView()
      case originalApiStatusConstants.failure:
        return this.renderOriginalFailureView()
      case originalApiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderRandomMovieDetails = () => {
    const {randomApiStatus} = this.state
    switch (randomApiStatus) {
      case randomApiStatusConstants.success:
        return this.renderRandomMovie()
      case randomApiStatusConstants.failure:
        return this.renderRandomFailureView()
      case randomApiStatusConstants.inProgress:
        return this.randomLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        {this.renderRandomMovieDetails()}
        <div className="bottom-container">
          {this.renderTrendingDetails()}
          {this.renderOriginalDetails()}
          <div className="footer-con">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
