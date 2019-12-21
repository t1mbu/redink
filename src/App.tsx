import React from "react";
import { Editor, Home, Login, Signup } from "./components";
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
          <Nav className="mr-sm-2">
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          <Nav className="mr-sm-2">
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        </Navbar>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={Editor} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Router>
    </div>
  );
};

export default App;
