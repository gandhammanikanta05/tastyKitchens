import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import './index.css'
import Counter from '../Counter'

class FoodItem extends Component {
  state = {
    btnClicked: false,
    cartList: [],
  }

  componentDidMount() {
    this.addItem()
  }

  addItem = () => {
    const {cartList} = this.state
    console.log(cartList)
    localStorage.setItem('Data', JSON.stringify(cartList))
  }

  onClickAddBtn = () => {
    const quantity = localStorage.getItem('Quantity')
    const {foodDetails} = this.props
    console.log(foodDetails)
    const {cost, imageUrl, foodType} = foodDetails
    const newObj = {
      Cost: cost,
      FoodType: foodType,
      ImageUrl: imageUrl,
      Quantitys: quantity,
    }
    this.setState(prevState => ({
      cartList: [...prevState.cartList, newObj],
      btnClicked: !prevState.btnClicked,
    }))
    this.addItem()
  }

  render() {
    const {foodDetails} = this.props
    const {btnClicked} = this.state
    const {cost, imageUrl, name, rating} = foodDetails
    return (
      <li className="food-item">
        <img src={imageUrl} alt="foodItem" className="food-img" />
        <div className="food-description">
          <p className="food-name">{name}</p>
          <div className="cost-sections">
            <BiRupee className="rupee" />
            <p className="food-cost">{cost}</p>
          </div>
          <div className="rating-sections">
            <AiFillStar className="star" />
            <p className="food-rating">{rating}</p>
          </div>
          {btnClicked ? (
            <Counter details={foodDetails} />
          ) : (
            <button
              type="button"
              className="add-btn"
              onClick={this.onClickAddBtn}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}
export default FoodItem
