import React from 'react';
import GithubCorner from 'react-github-corner';
import { Switch, Route, Link } from 'react-router-dom';
import './App.scss';

import { Router } from './config';
import { Home } from './screens/Home';
import { UuidGenerator } from './screens/UuidGenerator';

function App() {
  return (
    <Router>
      <div className="app">
        <GithubCorner
          href="https://github.com/mat-sz/util-web"
          octoColor="#eee"
          bannerColor="#000"
        />
        <div>
          <h1>
            <Link to="/">util.to</Link>
          </h1>
          <div className="background_title">util.to</div>
        </div>
        <Switch>
          <Route path="/uuid">
            <UuidGenerator />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
