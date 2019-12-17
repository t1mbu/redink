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
        <b>Turning notes to outlines:</b> Non-normal text sizes are treated as
        section titles. Bolded, normal words are interpreted as important vocab.
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
                  <Card.Text>
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
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Outline</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <ul>
                      <li>
                        Animals
                        <ul>
                          <li>
                            Fish
                            <ul>
                              <li>ectothermic</li>
                            </ul>
                          </li>
                          <li>
                            Mammals
                            <ul>
                              <li>intelligent</li>
                              <li>ectothermic</li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Card.Text>
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
