import React from "react";
import { Link } from "react-router-dom";
import Search from './../Search/Search';

export const Nav = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg  ">
      <div className="collapse navbar-collapse">
        <Link className="navbar-brand m-2" to="/products">
          Home
        </Link>
        <Link className="navbar-brand m-2" to="/Admin">
          Admin
        </Link>
        <Link className="navbar-brand nav-item nav-link active" to="/about"></Link>
      </div>
      <Search filterProducts ={props.filterProducts}/>
      <Link to="/cart" className=" my-2 my-lg-0 m-2">
        {/* <i className="fas fa-shopping-cart" style ={{colo
          r:"White !important"}}></i> */}

        <button type="button" className="btn btn-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart4"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          <span>
            {props.cartLength}  {props.cartLength > 1 ? "Products  " : "product  "}
          </span>
          <span>
            {props.totalQuantity} {props.totalQuantity > 1 ? "items  " : "item  "}
          </span>
          <span>{props.totalPrice}$</span>
        </button>
      </Link>
    </nav>
  );
};
