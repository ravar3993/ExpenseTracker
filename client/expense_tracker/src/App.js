import React from 'react';
import logo from './logo.svg';
import './App.css';
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact strict>
          <Welcome />
        </Route>
        <Route path="/dashboard" exact strict>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
