import React from 'react';
import './App.css'
import Build from "./components/Build";
import Checkout from "./components/Checkout";
import { Route, Switch } from 'react-router-dom';
import Navigation from "./components/Navigation";


function App() {
  return (
    <div className="App">
        <Navigation/>
        <Switch>
            <Route exact path='/' component={Build}/>
            <Route exact path='/checkout' component={Checkout}/>
        </Switch>
    </div>
  );
}

export default App;
