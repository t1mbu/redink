import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const OutlineInfo: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container>
        <b>Notes to outlines:</b> If you use headings on any note lines, they'll
        be treated as section titles. Any normal text font will be ignored
        except for bold words.
      </Container>
      <Container>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example"
          aria-expanded={open}
          size="sm"
        >
          See example
        </Button>
        <Collapse in={open}>
          <div id="example">
            <CardGroup>
              <Card>
                <Card.Header>Notes</Card.Header>
                <Card.Body>
                  <h2>Animals</h2>
                  <h3>Fish</h3>
                  <p>
                    Fish are <b>ectothermic</b> meaning they're coldblooded.
                  </p>
                  <h3>Mammals</h3>
                  <p>
                    Mammals are <b>intelligent</b>. Many were{" "}
                    <b>domesticated</b> by humans.
                  </p>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Outline</Card.Header>
                <Card.Body>
                  <ul>
                    <li>Animals</li>
                    <ul>
                      <li>Fish</li>
                      <ul>
                        <li>ectothermic</li>
                      </ul>
                      <li>Mammals</li>
                      <ul>
                        <li>intelligent</li>
                        <li>domesticated</li>
                      </ul>
                    </ul>
                  </ul>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
        </Collapse>
      </Container>
    </div>
  );
};

export default OutlineInfo;
