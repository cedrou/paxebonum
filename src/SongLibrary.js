import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, ButtonToolbar, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

function SongLibrary() {

  const [songs, setSongs] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        '/parse/classes/Song', { 
          headers: { 'X-Parse-Application-Id': 'paxebonum' }
        });
      const json = await res.json();
      setSongs(json.results);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Row className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h1 className="h2">Répertoire</h1>
        <ButtonToolbar className="btn-toolbar">
          <LinkContainer to="/library/new"><Button size="sm" variant="outline-secondary">Ajouter un chant</Button></LinkContainer>
        </ButtonToolbar>
      </Row>

      <table className="table table-striped table-sm table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titre</th>
          </tr>
        </thead>
        <tbody>
          { songs.map( (song, index) =>
            <tr key={song.objectId}>
              <th scope="row">{index + 1}</th>
              <td><Link to={"/library/view/" + song.objectId}>{song.title}</Link></td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}


export default SongLibrary;
