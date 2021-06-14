import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GridTable from './components/gridTable';
import NavBar from './components/navBar';

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path="/" component={GridTable} />
      <Route exact path="/grid" component={GridTable} />
    </Switch>
  </Router>
);

export default App;
