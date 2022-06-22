import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Trending extends Component {
  render() {
    const {trendingListDetails} = this.props
    const {posterPath, title, id} = trendingListDetails

    return (
      <Link to={`/movies/${id}`}>
        <div className="slider-img-container">
          <img src={posterPath} alt={title} className="slider-img" />
        </div>
      </Link>
    )
  }
}

export default Trending
