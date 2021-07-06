import React, { Component } from "react";
import Product from "../Product/product";
import image from "./../../utils/images/home-made-burgers-fire-flames-close-up-65689327.jpg";

class AddNewProduct extends Component {
  state = {
    product: {
      name: "",
      count: 0,
      price: 0,
      category: "drinks",
    },
  };
  handleInputsChange(e) {
    const product = { ...this.state.product };
    product[e.target.id] = e.target.value;
    this.setState({ product });
  }

  render() {
    return (
      <div className="container ">
        <div className="row" style = {{justifyContent:"center"}}>
     

           
          <Product>
            <div className="card" style={{ margin: "0 auto" }}>
              <div>
                <img src={image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <p className="card-title">
                    name :
                    <input id="name" onChange={(e) => this.handleInputsChange(e)} value={this.state.product.name}></input>
                  </p>
                  <span style={{ color: "gray" }}>
                    Stock :
                    <input id="count" onChange={(e) => this.handleInputsChange(e)} value={this.state.product.count}></input>
                  </span>
                  <p style={{ color: "green" }}>
                    Price :
                    <input id="price" onChange={(e) => this.handleInputsChange(e)} value={this.state.product.price}></input>
                  </p>
                  <p className="card-text">
                    Burgers is one our best seller , don't miss them Burgers is one our best seller , don't miss them
                  </p>
                  <select value={this.state.product.category} id="category" onChange={(e) => this.handleInputsChange(e)} onClick={(e) => this.handleInputsChange(e)}>
                    <option  value="drinks">drinks</option>
                    <option value="food">food</option>
                  </select>
                </div>
              </div>
          <button className="btn btn-primary "   onClick={() => this.props.addNewProduct(this.state.product)}>
            submit
          </button>
            </div>
          </Product>
      
        </div>
      </div>
    );
  }
}

export default AddNewProduct;
