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
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/users/">Users</Link>
                </li>
                <li>
                  <Link to="/new/">Nouveau chant</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/users/" component={Users} />
            <Route path="/new/"   component={NewSongForm} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;