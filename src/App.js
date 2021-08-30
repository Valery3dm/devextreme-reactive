import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ChartTable from './components/chartTable';
import GridTable from './components/gridTable';
import NavBar from './components/navBar';
import Demo from './components/schedulerTable';

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact path="/" component={GridTable} />
      <Route exact path="/grid" component={GridTable} />
      <Route exact path="/chart" component={ChartTable} />
      <Route exact path="/scheduler" component={Demo} />
    </Switch>
  </Router>
);

export default App;
