import React, { Component } from "react";
import Product from "./../Product/product";
import image from "./../../utils/images/home-made-burgers-fire-flames-close-up-65689327.jpg";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: props.products, bought: false };
  }
  static getDerivedStateFromProps(props, state) {
    state.products = props.products;
    return true;
  }
  render() {
    const { products } = this.state;
    return (
      <div className="container m-4">
        <div className="m-6 p-6 col-4 d-flex">
          <select
            className="form-select m-1 "
            aria-label="Default select example"
            onChange={(e) => this.props.Methods.sortProducts(e.target.value)}
          >
            <option className={"btn btn-warning p-2 m-3"} value={"name"}>
              sort by name
            </option>
            <option className={"btn btn-warning p-2 m-3"} value={"price"}>
              sort by price
            </option>
            <option className={"btn btn-warning p-2 m-3"} value={"count"}>
              sort by stock
            </option>
          </select>
          <select
            className="form-select m-1"
            aria-label="Default select example"
            onClick={(e) => {console.log(this);this.props.Methods.filterByCategory(e)}}
          >
            <option value="all">all</option>
            <option value="food">food</option>
            <option value="drinks">drinks</option>
          </select>
        </div>
        <ul className="row">
          {products.map((prod) => (
            <Product key={prod.id}>
              <div style={{ margin: "0 auto" }}>
                <div>
                  <img src={image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <span style={{ color: "gray" }}>Stock :{prod.count}</span>
                    <p style={{ color: "green" }}>Price :{prod.price}</p>
                    <p className="card-text">
                      Burgers is one our best seller , don't miss them Burgers is one our best seller , don't miss them
                    </p>
                    {/* <a href="/" className="btn btn-primary">
                  Go somewhere
                </a> */}

                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        
                        this.props.Methods.addToCart(prod);
                      }}
                    >
                      add to Cart
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ display: "inline", margin: "1rem" }}
                      onClick={() => {
                        this.props.Methods.removeFromCart(prod.id);
                      }}
                    >
                      remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            </Product>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductList;
