import React, { Component } from "react";
import Product from "../Product/product";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state.products = this.props.products;
  }
  state = {
    products: [],
  };

  static getDerivedStateFromProps(props, state) {
    state.products = props.products;
    return true;
  }

  render() {
    // console.log(this.props.testthis());
    // console.log(this.state)
    // this.state ={products:this.props.products , itemCount : this.props.products.length};
    const { removeFromCart, reset, handleCountIncrement, handleCountDecrement } = this.props.Methods;
    return (
        <div className="container m-4">
      <ul className="row">
        {this.state.products
          ? this.state.products.map((prod) => {
              return (
                
                  <Product key ={prod.id}>
                    <div style={{ margin: "0 auto" }}>
                      <div className="card">
                        <p className="card-title"><span style={{color:"red" , fontSize:"2rem"}}>{prod.quantity}</span> items of {prod.name} in your cart </p>
                        <div className="card-body">
                          <button
                            className="btn btn-primary bg-danger"
                            style={{ display: "inline" }}
                            onClick={() => {
                              removeFromCart(prod.id);
                            }}
                          >
                            remove from Cart
                          </button>

                          <button className="btn btn-primary  m-3" onClick={() => reset(prod.id)}>
                            reset
                          </button>
                          <button className="btn btn-primary m-3" onClick={() => handleCountIncrement(prod.id)}>
                            increment
                          </button>
                          <button className="btn btn-primary m-3" onClick={() => handleCountDecrement(prod.id)}>
                            decrement
                          </button>
                        </div>
                      </div>
                    </div>
                  </Product>
             
              );
            })
          : ""}

        <p>Order Count : {this.props.Methods.totalQuantity} items in the cart</p>
        <p>Total Price : {this.props.Methods.totalPrice} $</p>
      </ul>

        </div>
    );
  }
}

export default Cart;
