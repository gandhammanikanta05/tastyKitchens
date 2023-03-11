import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: [],
    foodItemDetails: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      this.setState({restaurantDetails: updatedData})
      const updatedFoodItems = updatedData.foodItems.map(eachone => ({
        cost: eachone.cost,
        foodType: eachone.food_type,
        id: eachone.id,
        imageUrl: eachone.image_url,
        name: eachone.name,
        rating: eachone.rating,
      }))
      this.setState({foodItemDetails: updatedFoodItems})
    }
  }

  render() {
    const {restaurantDetails, foodItemDetails} = this.state
    return (
      <div className="main-container">
        <Header />
        <div className="main-section">
          <div className="restaurant-details">
            <img
              src={restaurantDetails.imageUrl}
              alt="restaurant"
              className="restaurant-img"
            />
            <div className="restaurant-description">
              <h1 className="name">{restaurantDetails.name}</h1>
              <p className="cuisine">{restaurantDetails.cuisine}</p>
              <p className="location">{restaurantDetails.location}</p>
              <div className="rating-cost-section">
                <div className="rating-section">
                  <div className="rate">
                    <AiFillStar className="star" />
                    <p className="rating">{restaurantDetails.rating}</p>
                  </div>
                  <div className="rating-count">
                    <p className="reviews-count">{`${restaurantDetails.reviewsCount} Ratings`}</p>
                  </div>
                </div>
                <hr className="line" />
                <div className="cost-section">
                  <div className="cost">
                    <BiRupee className="rupee" />
                    <p className="cost-for-two">
                      {restaurantDetails.costForTwo}
                    </p>
                  </div>
                  <p className="cost-for-two-name">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
          <ul className="unordered-list">
            {foodItemDetails.map(eachItem => (
              <FoodItem key={eachItem.id} foodDetails={eachItem} />
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
