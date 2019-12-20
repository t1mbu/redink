import React from "react";
import { Editor, Home } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <div className="Default">
      <Router>
        <Navbar>
          <Navbar.Brand href="/">Redink</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/create">Note-take</Nav.Link>
          </Nav>
        </Navbar>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={Editor} />
      </Router>
    </div>
  );
};

export default App;
