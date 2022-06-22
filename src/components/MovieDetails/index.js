import {Component} from 'react'
import Cookies from 'js-cookie'
// import {format} from 'date-fns'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import PopularItem from '../PopularItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    movieItem: [],
    genreList: [],
    languagesList: [],
    similarList: [],
    apiStatus: apiStatusConstants,
    adult: true,
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  retryButton = () => {
    this.getMovieItemDetails()
  }

  updatedData = data => ({
    backdropPath: data.backdrop_path,
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
  })

  getMovieItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        overview: data.movie_details.overview,
        runTime: data.movie_details.runtime,
        title: data.movie_details.title,
        adult: data.movie_details.adult,
        releaseDate: data.movie_details.release_date,
        ratingCount: data.movie_details.vote_count,
        ratingAvg: data.movie_details.vote_average,
      }
      const updatedGenreList = data.movie_details.genres.map(eachGenre => ({
        name: eachGenre.name,
        id: eachGenre.id,
      }))

      const updatedLanguages = data.movie_details.spoken_languages.map(
        eachLan => ({
          id: eachLan.id,
          language: eachLan.english_name,
        }),
      )
      const similarData = data.movie_details.similar_movies.map(eachList =>
        this.updatedData(eachList),
      )

      this.setState({
        movieItem: updatedData,
        genreList: updatedGenreList,
        languagesList: updatedLanguages,
        apiStatus: apiStatusConstants.success,
        similarList: similarData,
        adult: data.movie_details.adult,
      })
    }

    if (response.status === 404) {
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
      <Header />
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
        onClick={this.retryButton}
      >
        Try Again
      </button>
    </div>
  )

  movieTime = () => {
    const {movieItem, adult} = this.state
    const {runTime} = movieItem
    const hours = Math.floor(runTime / 60)
    const minutes = runTime % 60

    let sensor = ''
    if (adult) {
      sensor = 'A'
    } else {
      sensor = 'U/A'
    }

    return (
      <p>
        {' '}
        {`${hours}h ${minutes}m `}
        <span className="sensor">{`${sensor}`}</span>{' '}
      </p>
    )
  }

  renderMovieItemDetailsView = () => {
    const {movieItem, genreList, languagesList, similarList} = this.state
    const {ratingAvg, ratingCount, budget, releaseDate} = movieItem

    const {backdropPath, title, overview} = movieItem
    return (
      <>
        <div className="home-top-container ">
          <img src={backdropPath} alt={title} className="background-img" />
          <div className="header">
            <Header />
          </div>
          <div className="top-con-heading">
            <h1>{title}</h1>
          </div>
          <div className="runtime ">{this.movieTime()}</div>
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
        <div className="bottom-container">
          <div className="movie-details-con">
            <div className="genre-con">
              <h1 className="details-heading">Genres</h1>
              {genreList.map(each => (
                <ul className="list-con" key={each.id}>
                  <li className="list">
                    <p>{each.name}</p>
                  </li>
                </ul>
              ))}
            </div>

            <div className="genre-con">
              <h1 className="details-heading">Audio Available</h1>
              {languagesList.map(each => (
                <ul className="list-con" key={each.id}>
                  <li className="list">
                    <p>{each.language}</p>
                  </li>
                </ul>
              ))}
            </div>
            <div className="genre-con">
              <h1 className="details-heading">Rating Count</h1>
              <p className="details">{ratingCount}</p>
              <h1 className="details-heading">Rating Average</h1>
              <p className="details">{ratingAvg}</p>
            </div>
            <div className="genre-con">
              <h1 className="details-heading">Budget</h1>
              <p className="details">{budget}</p>
              <h1 className="details-heading">Release Date</h1>
              <p className="details">{releaseDate}</p>
            </div>
          </div>

          <div className="similar-movies-container">
            <h1 className="similar-movies-heading">More like this</h1>
            <div className="pop-list-con">
              <ul className="popular-list">
                {similarList.map(eachList => (
                  <PopularItem
                    popularListDetails={eachList}
                    key={eachList.id}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-con">
            <Footer />
          </div>
        </div>
      </>
    )
  }

  renderMovieItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieItemDetailsView()
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
      <div className="movie-details-container">
        {this.renderMovieItemDetails()}
      </div>
    )
  }
}

export default MovieDetails
