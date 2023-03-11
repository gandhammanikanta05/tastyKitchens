import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {
    value: 1,
    showBtn: false,
  }

  componentDidMount() {
    this.addQuantity()
  }

  addQuantity = () => {
    const {value} = this.state
    localStorage.setItem('Quantity', value)
  }

  onIncrement = () => {
    this.setState(prevState => ({value: prevState.value + 1}))
    this.addQuantity()
  }

  onDecrement = () => {
    const {value} = this.state
    if (value > 1) {
      this.setState(prevState => ({value: prevState.value - 1}))
    } else {
      this.setState(prevState => ({showBtn: !prevState.showBtn}))
    }
    this.addQuantity()
  }

  render() {
    const {value, showBtn} = this.state
    const ans = localStorage.getItem('Data')
    console.log(ans)
    return (
      <div className="counter-container">
        {showBtn ? (
          <button
            type="button"
            className="add-btn"
            onClick={this.onClickAddBtn}
          >
            ADD
          </button>
        ) : (
          <>
            <button type="button" onClick={this.onDecrement}>
              -
            </button>
            <p className="value">{value}</p>
            <button type="button" onClick={this.onIncrement}>
              +
            </button>
          </>
        )}
      </div>
    )
  }
}

export default Counter
