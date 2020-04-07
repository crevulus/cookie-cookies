import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { withCookies } from "react-cookie";
import Products from './components/Products'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
      cart: {},
    }
  }

  componentDidMount() {
    this.fetchProducts();
    this.fetchCartData();
  }

  fetchCartData = () => {
    const { cookies } = this.props;
    const sessionId = cookies.get('cookie-cookies_cart-cookie');

    if (sessionId) {
      fetch(`/carts/${sessionId}`)
        .then(res => res.json())
        .then(cart => this.setState({ cart }));
      return;
    }

    const fetchOptions = { method: 'POST' };
    fetch('/carts', fetchOptions)
      .then(res => res.json())
      .then(cart => this.setState({ cart }));
  }

  fetchProducts = () => {
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  addToCart = (productId) => {
    const { products, cart } = this.state;
    const productsInCart = cart.products || [];
    const productToAdd = products.find(({ id }) => id === productId);

    const updatedProducts = [...productsInCart, productToAdd];
    // maybe move to its own method
    const updatedCart = {
      id: cart.id,
      products: updatedProducts
    };

    this.setState({ cart: updatedCart });

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCart),
    };

    fetch(`/carts/${cart.id}`, options)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  render() {
    return (
      <Router>
        <header>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </header>

        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/products">
            <Products products={this.state.products} addToCart={this.addToCart}/>
          </Route>
          <Route path="/cart">
            <h1>Cart cookie display header</h1>
          </Route>
        </Switch>
      </Router >
    );
  }

}

export default withCookies(App);
