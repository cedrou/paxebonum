import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import EditSong from './EditSong.js';
import SongLibrary from './SongLibrary.js';
import ViewSong from './ViewSong.js';
import ViewSheet from './ViewSheet.js';

function Index() {
  return <h2>Pax Bonum</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar expand="sm" bg="light">
        <Navbar.Brand>
          <img src="/taut.png" width="30" height="30" alt=""/>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer exact to="/"><Nav.Link>          Accueil           </Nav.Link></LinkContainer>
            <LinkContainer exact to="/library/"><Nav.Link>  Répertoire        </Nav.Link></LinkContainer>
            <LinkContainer exact to="/sheets/"><Nav.Link>   Feuilles de chant </Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="container">
        <Route path="/"                 exact component={Index} />

        <Route path="/library/"         exact component={SongLibrary} />
        <Route path="/library/view/:id"       component={ViewSong} />
        <Route path="/library/new"            component={EditSong} />
        <Route path="/library/edit/:id"       component={EditSong} />

        <Route path="/sheets/"          exact component={ViewSheet} />
        <Route path="/sheets/:date"           component={ViewSheet} />

      </Container>
    </BrowserRouter>
  );
}

export default App;