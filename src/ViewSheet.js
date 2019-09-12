import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ButtonToolbar, Button, ButtonGroup, Alert, Modal } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import * as parse from './parse'



function ViewSheet({match}) {

  const [sheet, setSheet] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      let song = await parse.getSong(match.params.id);
      if (song.objectId === undefined) {
        setError('Impossible de trouver le chant')
      }
      setIsLoading(false);
      setSong(song);
    }
    fetchData()
  }, [match.params.id]);


  if (error) {
    return <Alert variant='danger'>{error}</Alert>
  }

  if (isLoading) {
    return <Alert variant='light'>Chargement en cours...</Alert>
  }

  if (redirect) {
    return <Redirect to={"/library"} />
  }

  return (
    <Container className="">
      <Row className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-baseline pt-3 pb-2 mb-3">
        <Col className="d-flex flex-column">
          <h2>{song.title}</h2>
          <div className="small">{song.author} - {song.code}</div>
        </Col>
        <ButtonToolbar>
          <ButtonGroup>
            <LinkContainer to={"/library/edit/" + match.params.id}><Button size="sm" variant="outline-secondary">Modifier</Button></LinkContainer>
            <Button size="sm" variant="outline-danger" onClick={() => setShowModal(true)}>Supprimer</Button>
            <Modal show={showModal} >
              <Modal.Header>
                <Modal.Title>Supprimer le chant ?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Etes-vous certain de vouloir supprimer ce chant?
                Toutes les informations seront definitivement perdues.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Supprimer
                </Button>
              </Modal.Footer>
            </Modal>

          </ButtonGroup>
        </ButtonToolbar>
        <div className="btn-toolbar align-top">
        </div>
      </Row>
      <ReactMarkdown className="leads">{song.lyrics}</ReactMarkdown>
    </Container>
  );
}

export default ViewSheet;