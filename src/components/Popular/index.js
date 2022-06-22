import {Component} from 'react'
import Cookies from 'js-cookie'
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

class Popular extends Component {
  state = {popularList: [], searchText: '', apiStatus: apiStatusConstants}

  componentDidMount() {
    this.getPopular()
  }

  retryButton = () => {
    this.getPopular()
  }

  onGetText = searchInput => this.setState({searchText: searchInput})

  updatedData = data => ({
    backdropPath: data.backdrop_path,
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
  })

  getPopular = async () => {
    const token = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const options = {
      method: 'GET',
      headers: {
        Authorization: `BEARER ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const popularData = data.results.map(eachList =>
        this.updatedData(eachList),
      )
      this.setState({
        popularList: popularData,
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
    <div className="product-details-error-view-container popular-failure-con">
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

  renderPopularDetailsView = () => {
    const {popularList, searchText} = this.state
    const searchList = popularList.filter(each =>
      each.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    return (
      <div className="pop-list-con">
        <ul className="popular-list">
          {searchList.map(eachList => (
            <PopularItem key={eachList.id} popularListDetails={eachList} />
          ))}
        </ul>
      </div>
    )
  }

  renderPopularDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularDetailsView()
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
        <Header />
        {this.renderPopularDetails()}
        <div className="footer-con">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Popular
