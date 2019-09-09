import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SongLibrary extends Component {

  state = {songs: []}

  async componentDidMount() {
    let res = await fetch('/parse/classes/Song', { headers: { 'X-Parse-Application-Id': 'paxebonum' } });
    let json = await res.json();
    this.setState({ songs: json.results });
  }

  render() {
    return (
      <main>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <h1 className="h2">Répertoire</h1>
          <div className="btn-toolbar">
            <Link role="button" className="btn btn-sm btn-outline-secondary" to="/library/new">Ajouter un chant</Link>
          </div>
        </div>

        <table className="table table-striped table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titre</th>
            </tr>
          </thead>
          <tbody>
            { this.state.songs.map( (song, index) =>
              <tr key={song.objectId}>
                <th scope="row">{index + 1}</th>
                <td><Link to={"/library/view/" + song.objectId}>{song.title}</Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    );
  }

}


export default SongLibrary;