import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

class ViewSong extends Component {

  state = {
    song: {}
  }

  async componentDidMount() {
    let res = await fetch('/parse/classes/Song/' + this.props.match.params.id, { headers: { 'X-Parse-Application-Id': 'paxebonum' } });
    let song = await res.json();
    this.setState({ song });
  }

  render() {
    let song = this.state.song;

    return (
      <main>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-baseline pt-3 pb-2 mb-3">
          <div className="d-flex flex-column">
            <h1 className="h2">{song.title}</h1>
            <div className="small">{song.author} - {song.code}</div>
          </div>
          <div className="btn-toolbar align-top">
            <Link role="button" className="btn btn-sm btn-outline-secondary" to={"/library/edit/" + this.props.match.params.id}>Modifier</Link>
            <Link role="button" className="btn btn-sm btn-outline-danger" to="edit">Supprimer</Link>
          </div>
        </div>
        <ReactMarkdown className="leads">{song.lyrics}</ReactMarkdown>
      </main>);
  }
}

export default ViewSong;