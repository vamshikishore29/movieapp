import {Link} from 'react-router-dom'

import './index.css'

const PopularItem = props => {
  const {popularListDetails} = props
  const {posterPath, title, id} = popularListDetails
  return (
    <li className="popular-item-container">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="popular-item" />
      </Link>
    </li>
  )
}
export default PopularItem
