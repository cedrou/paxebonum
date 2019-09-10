import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, ButtonToolbar, Button, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import * as parse from './parse'

function SongLibrary() {

  const [songs, setSongs] = useState([])

  useEffect(() => {
    async function fetchData() {
      let list = await parse.getSongList();
      setSongs(list);
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

      <Table striped hover size="sm">
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
      </Table>
    </Container>
  );
}


export default SongLibrary;
