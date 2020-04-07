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
    const { cookies } = this.props;
    console.log(cookies)

    this.fetchProducts();

    if (cookies.get('cookie-cookies_cart-cookie')) {
      const sessionId = cookies.get('cookie-cookies_cart-cookie');
      console.log(sessionId);
      fetch(`/carts/${sessionId}`)
        .then(res => res.json())
        .then(cart => this.setState({ cart }));
      return;
    }

    fetch('/carts', {
      method: "POST"
    })
      .then(res => res.json())
      .then(cart => this.setState({ cart }));
  }

  // addToCart = () => {
  //   fetch('/carts/:id', {
  //     method: "POST"
  //   })
  //     .then(res => res.json())
  // }

  fetchProducts = () => {
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
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
