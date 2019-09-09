import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';
import EditSong from './EditSong.js';
import SongLibrary from './SongLibrary.js';
import ViewSong from './ViewSong.js';

function Index() {
  return <h2>Pax Bonum</h2>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <span className="navbar-brand">
                <img src="/taut.png" width="30" height="30" alt=""/>
              </span>
              
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav">
                  <Link className="nav-item nav-link" to="/" >Home</Link>
                  <Link className="nav-item nav-link" to="/library/" >Répertoire</Link>
                </div>
              </div>
            </nav>

            <div className="container">
              <Route path="/"                 exact component={Index} />
              <Route path="/library/"         exact component={SongLibrary} />
              <Route path="/library/view/:id"       component={ViewSong} />
              <Route path="/library/new"            component={EditSong} />
              <Route path="/library/edit/:id"       component={EditSong} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;