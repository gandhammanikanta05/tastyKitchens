import {Link} from 'react-router-dom'
import './index.css'
import {AiFillStar} from 'react-icons/ai'

const RestaurantItem = props => {
  const {restaurantDetails} = props
  const {imageUrl, name, cuisine, rating, totalReviews, id} = restaurantDetails
  return (
    <Link to={`/restaurant/${id}`} className="link">
      <li className="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="image" />
        <div className="descriptions">
          <p className="names">{name}</p>
          <p className="cuisines">{cuisine}</p>
          <div className="rating-sections">
            <AiFillStar className="stars" />
            <p className="ratings">{rating}</p>
            <p className="reviews">{`(${totalReviews} ratings)`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantItem
