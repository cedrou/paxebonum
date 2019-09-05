import React, { Component } from 'react';
import './App.css';
import NewSongForm from './NewSongForm.js';

class App extends Component {
  // state = {users: []}

  // componentDidMount() {
  //   fetch('/users')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }

  render() {
    return (
      // <div className="App">
      //   <h1>Nouveau chant</h1>

      //   {this.state.users.map(user =>
      //     <div key={user.id}>{user.username}</div>
      //   )}
      // </div>
      <div className="App">
        <NewSongForm/>
      </div>
    );
  }
}

export default App;