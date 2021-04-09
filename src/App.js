import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./App.css";
import Browser from "./components/Browser";
import Error from "./components/Error";
import { links } from "./data/links";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" varient="dark">
          <LinkContainer to="/">
            <Navbar.Brand>F Media Player</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <LinkContainer key={id} to={url}>
                  <Nav.Link>{text}</Nav.Link>
                </LinkContainer>
              );
            })}
          </Nav>
        </Navbar>

        <Switch>
          <Route path="/browser/:path*" children={<Browser />}></Route>
          <Route path="/player/:path*" children={<Browser />}></Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
