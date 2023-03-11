import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {BsFilterLeft} from 'react-icons/bs'
import {CgChevronLeftR, CgChevronRightR} from 'react-icons/cg'
import './index.css'
import Header from '../Header'
import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'

const sortByOptions = [
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
]

class Home extends Component {
  state = {
    carouselList: [],
    restaurantsList: [],
    activePage: 1,
    sortBy: sortByOptions[0].value,
  }

  componentDidMount() {
    this.getCarousel()
    this.getRestaurants()
  }

  getCarousel = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.offers.map(eachone => ({
      imageUrl: eachone.image_url,
      id: eachone.id,
    }))
    this.setState({carouselList: updatedData})
  }

  getRestaurants = async () => {
    const {activePage, sortBy} = this.state
    const offset = (activePage - 1) * 9
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sortBy}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.restaurants.map(eachone => ({
      costForTwo: eachone.cost_for_two,
      cuisine: eachone.cuisine,
      groupByTime: eachone.group_by_time,
      hasOnlineDelivery: eachone.has_online_delivery,
      hasTableBooking: eachone.has_table_booking,
      id: eachone.id,
      imageUrl: eachone.image_url,
      isDeliveringNow: eachone.is_delivering_now,
      location: eachone.location,
      menuType: eachone.menu_type,
      name: eachone.name,
      opensAt: eachone.opens_at,
      rating: eachone.user_rating.rating,
      ratingColor: eachone.user_rating.rating_color,
      ratingText: eachone.user_rating.rating_text,
      totalReviews: eachone.user_rating.total_reviews,
    }))
    this.setState({restaurantsList: updatedData})
  }

  onClickSortBy = event => {
    this.setState({sortBy: event.target.value})
    this.getRestaurants()
  }

  onClickLeftBtn = () => {
    this.setState(prevState => ({activePage: prevState.activePage - 1}))
    this.getRestaurants()
  }

  onClickRightBtn = () => {
    this.setState(prevState => ({activePage: prevState.activePage + 1}))
    this.getRestaurants()
  }

  render() {
    const settings = {
      dots: true,
    }
    const {carouselList, restaurantsList, activePage} = this.state
    return (
      <div className="home-container">
        <Header />
        <div className="carousel-section">
          <Slider {...settings}>
            {carouselList.map(eachone => (
              <div key={eachone.id}>
                <img
                  src={eachone.imageUrl}
                  alt="offer"
                  className="carousel-img"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="restaurants-section">
          <h1 className="heading">Popular Restaurants</h1>
          <div className="small-section">
            <p className="para">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="filter-section">
              <BsFilterLeft />
              <p>sort by</p>
              <select onClick={this.onClickSortBy}>
                {sortByOptions.map(eachone => (
                  <option
                    key={eachone.value}
                    value={eachone.value}
                    className="option"
                  >
                    {eachone.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="break" />
          <ul className="restaurants-list">
            {restaurantsList.map(eachone => (
              <RestaurantItem
                key={eachone.id}
                restaurantDetails={eachone}
                showRestaurantDetails={this.showRestaurantDetails}
              />
            ))}
          </ul>
          <div className="pagination-section">
            <button
              type="button"
              className="pagination-btn"
              onClick={this.onClickLeftBtn}
            >
              <CgChevronLeftR />
            </button>
            <p className="pagination-text">
              <span>{activePage}</span> of 20
            </p>
            <button
              type="button"
              className="pagination-btn"
              onClick={this.onClickRightBtn}
            >
              <CgChevronRightR />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
