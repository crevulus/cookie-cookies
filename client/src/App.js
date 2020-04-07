import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
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
    </Router>
  );
}

export default App;
