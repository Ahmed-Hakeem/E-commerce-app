import React, { Component, createContext } from 'react'
// import Product from "../Product/Product";
import image from "./../../utils/images/home-made-burgers-fire-flames-close-up-65689327.jpg";
import Product from "../Product/product"
// import Product from './../../Product/product';

import { Link } from 'react-router-dom';
class Admin extends Component{

    state = {
        editing :-1 , 
        prodCount : 0 , 
        prodPrice : 0 , 

    }
    toggleEdit (ProductId){
        this.setState({editing:ProductId})
    }
    handleInputChange (e){
        this.setState({[e.target.id]:e.target.value})
    }

    render(){
        const{products} = this.props
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
            onClick={(e) => this.props.Methods.filterByCategory(e)}
          >
            <option value="all">all</option>
            <option value="food">food</option>
            <option value="drinks">drinks</option>
          </select>
          <Link className= "btn-danger col-3 " style={{textDecoration :"none"}} to="/addNewProduct" >Add New Product</Link>
        </div>
        <ul className="row">
          {products.map((prod) => (
            <Product key={prod.id}>
              <div style={{ margin: "0 auto" }}>
                <div>
                  <img src={image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <div style={{ color: "gray" }}>Stock :{this.state.editing ===prod.id?<input className = "input-group input-group-sm mb-3" id="prodCount" value={this.state.prodCount} onChange={(e)=>this.handleInputChange(e)} type="text"></input>:<span>{prod.count}</span>}</div>
                    <div style={{ color: "green" }}>Price :{this.state.editing===prod.id?<input className = "input-group input-group-sm mb-3" id="prodPrice" value = {this.state.prodPrice}  onChange={(e)=>this.handleInputChange(e)} type="text"></input>:<span>{prod.price}</span>}</div>
                    <p className="card-text">
                      Burgers is one our best seller , don't miss them Burgers is one our best seller , don't miss them
                    </p>
                    {/* <a href="/" className="btn btn-primary">
                  Go somewhere
                </a> */}
                    {this.state.editing ===prod.id? <button
                      className="btn btn-danger"
                      onClick={() => {

                        this.props.Methods.editProduct({...prod ,count:this.state.prodCount , price:this.state.prodPrice});
                        this.setState({editing:-1})
                      }}
                    >
                      confirm Edit
                    </button>:
                    <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.toggleEdit(prod.id);
                      
                    }}
                  >
                    edit Product
                  </button>
                    
                    
                    
                    }
                   
                    <button
                      className="btn btn-primary"
                      style={{ display: "inline", margin: "1rem" }}
                      onClick={() => {
                        this.props.Methods.removeProduct(prod.id)
                      }}
                    >
                        deleteProduct
                    </button>
                  </div>
                </div>
              </div>
            </Product>
          ))}
        </ul>
      </div>
        )
    }
}


export default Admin;