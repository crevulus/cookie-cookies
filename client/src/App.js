import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { withCookies } from "react-cookie";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    const { cookies } = this.props;
    console.log(cookies)

    if (this.state.cart) return
    fetch('/carts', {
      method: "POST"
    })
      .then(res => res.json())
      .then(res => this.setState({ cartId: res.id }))
  }

  render() {
    return (
      <Router>
        <header>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </header>

        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
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
