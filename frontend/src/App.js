import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';
import NewSongForm from './NewSongForm.js';

function Index() {
  return <h2>Pax Bonum</h2>;
}

class Users extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h2>Repertoire</h2>

        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }

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
                <div className="navbar-nav mr-auto">
                  <Link to="/"  className="nav-item nav-link active">Home</Link>
                  <Link to="/users/"  className="nav-item nav-link">Repertoire</Link>
                  <Link to="/new/" className="nav-item nav-link">Nouveau chant</Link>
                </div>
              </div>
            </nav>

            <div className="container">
              <Route path="/" exact component={Index} />
              <Route path="/users/" component={Users} />
              <Route path="/new/"   component={NewSongForm} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;