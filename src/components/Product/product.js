import React, { Component } from "react";
class Product extends Component {
  // state={
  //     addProduct:()=>{}
  // }
  render() {
    // const { product } = this.props;
    // const { reset, increment, decrement } = this.props.Methods || {};
    // this.state.addProduct =addToCart?addToCart:this.state.addProduct;

    return (
      <div className="col-4 mb-4" style={{transition:"ease-in-out" , transitionDuration:"12"}}>
        {/* <span>{product.name}</span> */}
        {this.props.children}
      </div>
    );
  }
}

export default Product;
