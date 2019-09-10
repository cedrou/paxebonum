import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, ButtonToolbar, Button, ButtonGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import ReactMarkdown from 'react-markdown'
import * as parse from './parse'

function ViewSong(props) {

  const [song, setSong] = useState({})


  useEffect(() => {
    async function fetchData() {
      let song = await parse.getSong(props.match.params.id);
      setSong(song);
    }
    fetchData()
  }, []);

  return (
    <Container>
      <Row className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-baseline pt-3 pb-2 mb-3">
        <Col className="d-flex flex-column">
          <h1 className="h2">{song.title}</h1>
          <div className="small">{song.author} - {song.code}</div>
        </Col>
        <ButtonToolbar>
          <ButtonGroup>
            <LinkContainer to={"/library/edit/" + props.match.params.id}><Button size="sm" variant="outline-secondary">Modifier</Button></LinkContainer>
            <LinkContainer to="edit"><Button size="sm" variant="outline-danger">Supprimer</Button></LinkContainer>
          </ButtonGroup>
        </ButtonToolbar>
        <div className="btn-toolbar align-top">
        </div>
      </Row>
      <ReactMarkdown className="leads">{song.lyrics}</ReactMarkdown>
    </Container>
  );
}

export default ViewSong;