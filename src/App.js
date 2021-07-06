import { Component }  from "react";
import React  from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import "../node_modules/bootstrap-icons/bootstrap-icons.svg"
import Cart from "./components/Cart/Cart";
import ProductList from "./components/ProductList/ProductList";
import { Nav } from "./components/Nav/Nav";
import Admin from "./components/Admin/Admin";
// import Product from './Product/product';
import  AddNewProduct from './components/addProduct/addProduct';
import FactoryInstance from "./utils/factory/factory"

class App extends Component {
 
  state = {
    cart: [],
    productList: [
      { id: 0, name: "burger", count: 60, price: 10, category:"food" },
      { id: 1, name: "pizza", count: 20, price: 30 , category:"food"},
      { id: 2, name: "chicken", count: 20, price: 20 , category:"food"},
      { id: 3, name: "sea food", count: 10, price: 60, category:"food" },
      { id: 4, name: "juice", count: 10, price: 80, category:"drinks" },
      { id: 5, name: "milk", count: 8, price: 100, category:"drinks" },
      { id: 6, name: "sobia", count: 9, price: 40 , category:"drinks"},
    ],
  };
  effects ={};
  constructor(props) {
    super(props);
    console.log(this);
    this.y= 20;
    // new Component(props)
    // console.log(new Component(props))
    // console.log(    super(props))
    this.testthis();
    
    this.state.filteredList = [...this.state.productList];


  }
  addToCart = async (product) => {
    console.log(product);
    const prodIndexInCart = this.state.cart.findIndex((prod) => prod.id === product.id);
    let outOfStock = false;
    this.state.filteredList.forEach((prod) => {
      if (prod.id === product.id) {
        if (product.count > 0) {
          --prod.count;
        } else {
          outOfStock = true;
        }
      }
    });
    if (prodIndexInCart === -1 && !outOfStock) {
      const products = [...this.state.cart, { ...product, quantity: 1 }];
      this.setState({ cart: products });
    } else if (!outOfStock) {
      const cartProducts = [...this.state.cart];
      cartProducts[prodIndexInCart].quantity++;
      this.setState({ cart: cartProducts });
      console.log(this.state.cart[prodIndexInCart]);
    } else {
      alert(`${product.name}  out of stock`);
    }
  };
  removeFromCart = (prodId) => {
    let productExistedInCart = false;
    const products = this.state.cart.filter((element) => {
      if (element.id !== prodId) {
        return true;
      } else {
        productExistedInCart = true;
        return false;
      }
    });
    if (productExistedInCart) {
     
      const productsInList = this.state.filteredList.map((prod) => (prod.id === prodId ? { ...prod, count: 10 } : prod));
      console.log(productsInList);
      this.setState({ cart: products, filteredList: productsInList });
    } else {
      alert("product doesn't exist in the cart ");
    }

    // console.log(this.state.productList  )
  };

  handleCountIncrement = (prodId) => {
    const productsInCart = [...this.state.cart];
    const productsInList = [...this.state.filteredList];
    const prodIndexInCart = this.state.cart.findIndex((element) => element.id === prodId);
    const prodIndexInList = productsInList.findIndex((prod) => prod.id === prodId);
    const inStock = productsInList[prodIndexInList].count > 0 ? productsInList[prodIndexInList].count-- : false;
    console.log(inStock);
    if (inStock) {
      productsInCart[prodIndexInCart].quantity++;
      this.setState({ cart: productsInCart });
    } else {
      alert(`${productsInList[prodIndexInList].name}  out of stock`);
    }
  };
  handleCountDecrement = (prodId) => {
    const products = [...this.state.cart];
    const found = this.state.cart.findIndex((element) => element.id === prodId);
    products[found].quantity > 0 && --products[found].quantity;
    this.setState({ cart: products });
  };
  reset = (prodId) => {
    const products = this.state.cart.map((elem) => {
      return elem.id === prodId ? { ...elem, quantity: 0 } : elem;
    });
    const productList = this.state.filteredList.map((elem) => {
      return elem.id === prodId ? { ...elem, count: 10 } : elem;
    });
    console.log(productList);
    this.setState({ cart: products, filteredList:productList });
  };
  getCartInfo() {
    

    let count = 0;
    let totalPrice = 0;
    this.state.cart.map((prod) => {
      count += prod.quantity;
      totalPrice += prod.quantity * prod.price;
      return false;
    });
    return { count, totalPrice };
  }

  filterProducts(event) {
    console.log(this)
    event.preventDefault();
    const searchQuery = event.target.value;
    // if (searchQuery === "") {
      //case 2 filters at once should be implemented here 
      //1- remove from effect list 
      //2- recall all effects on original product list and make filtered list equals to it 
      this.effects.filter = (filteredProducts)=>filteredProducts.filter((prod)=>prod.name.toLowerCase().includes((searchQuery.toLowerCase() )))
      this.effectHandeling();
    //   this.setState({ filteredList: [...this.state.productList] });
    // } else {
    //   console.log(this.state);
    //   this.setState({ filteredList: this.state.filteredList.filter((prod) => prod.name.includes(searchQuery)) });
    // }
  }

  effectHandeling(){
    let filteredProducts = [...this.state.productList];
    Object.keys(this.effects).forEach((f)=>{
     filteredProducts= this.effects[f](filteredProducts)
    })
    console.log(filteredProducts)
    this.setState({filteredList:[...filteredProducts]});
  }
  

  sortProducts (sortBy){
    console.log(sortBy)
    this.effects.sort = (filteredProducts)=>filteredProducts.sort((a,b)=>(a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
    this.effectHandeling();
    // this.setState({filteredList:[...this.state.filteredList.sort((a,b)=>(a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0))]})
  }
  
  filterByCategory(e){
    
    e.preventDefault() ; 
    console.log(e.target.value)
    if(e.target.value ==="all"){
      console.log("set")
      // this.setState({filteredList : [...this.state.productList]})
      delete this.effects.category 
      this.effectHandeling();
    }
    else{
      this.effects.category = (filteredProducts)=>filteredProducts.filter((prod) => prod.category === e.target.value);
      this.effectHandeling();
    // this.setState({ filteredList: this.state.productList.filter((prod) => prod.category === e.target.value) });
    }
  }
  addNewProduct (product){
    console.log(product)
    const newProdList =  [...this.state.productList,{...product, id:this.state.productList.length}]
    this.setState({productList:newProdList ,filteredList:newProdList})

  }
  removeProduct(prodId){
    const newProdList = this.state.productList.filter(el=>el.id!== prodId)
    this.setState({productList:newProdList ,filteredList:newProdList})
  }
  editProduct(product){
    const prodList = [...this.state.productList]; 
    const prodIndexInList = this.state.productList.findIndex((el)=>el.id === product.id); 
    prodList[prodIndexInList ]= product ;
    this.setState({productList : prodList , filteredList:prodList}) 
  }

  testthis(){
    console.log(this)
  }
  
  render() {
    console.log(this)
    console.log(this.state);
    return (
      <>
        <Router>
          <Nav
            cartLength={this.state.cart.length}
            totalQuantity={this.getCartInfo().count}
            totalPrice={this.getCartInfo().totalPrice}
            filterProducts={this.filterProducts.bind(this)}
            sortProducts={this.sortProducts.bind(this)}
          />

          <div className="App" >
            <Switch>
              {/* <Route path="/about"><About /></Route> */}
              <Route path="/cart">
                <Cart
                  products={this.state.cart}
                  Methods={{
                    handleCountDecrement: this.handleCountDecrement,
                    handleCountIncrement: this.handleCountIncrement,
                    reset: this.reset,
                    removeFromCart: this.removeFromCart,
                    totalQuantity: this.getCartInfo().count,
                    totalPrice: this.getCartInfo().totalPrice,
                  }}
                  testthis = {this.testthis} 
                />
              </Route>
              <Route path="/products">
                <ProductList
                  Methods={{ addToCart: this.addToCart, removeFromCart: this.removeFromCart ,sortProducts:this.sortProducts.bind(this) ,filterByCategory:this.filterByCategory.bind(this) }}
                  products={this.state.filteredList}
                />
              </Route>
              <Route path="/admin">
                  <Admin   
                   Methods={{ sortProducts:this.sortProducts.bind(this) ,filterByCategory:this.filterByCategory.bind(this) ,addNewProduct:this.addNewProduct.bind(this), removeProduct:this.removeProduct.bind(this), 
                  editProduct :  this.editProduct.bind(this) }}
                  products={this.state.filteredList}/>
                  <FactoryInstance></FactoryInstance>
              </Route>
              <Route path= "/addNewProduct">
                    <AddNewProduct addNewProduct={this.addNewProduct.bind(this) }/>
              </Route>
              <Redirect exact from="/" to="/products"></Redirect>
              <Redirect from="/home" to="/products"></Redirect>
              <Redirect to="/error"></Redirect>
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}



export default App;
