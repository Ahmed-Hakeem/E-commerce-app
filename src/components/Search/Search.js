import React, { Component } from 'react'

class Search extends Component{

  state={
    searchQuery:""
  }
    render(){
        return(
            <form className="d-flex" onSubmit={(e)=>this.props.filterProducts(e)}>
            <input className="form-control me-2" type="search" placeholder="Search"  aria-label="Search" onKeyUp={(e)=>{console.log(e);return this.props.filterProducts(e)}} />
            {/* <button className="btn btn-outline-success" type="submit">
              Search
            </button> */}
          </form>
        )
    }



}
export default Search ; 