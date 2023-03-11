import {Component} from 'react'

class Cart extends Component {
  state = {
    cartList: [],
  }

  render() {
    const cart = localStorage.getItem('Data')
    console.log(cart)
    return <div>hii</div>
  }
}
export default Cart
