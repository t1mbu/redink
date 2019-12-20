import React from "react";
import Container from "react-bootstrap/Container";

const Home: React.FC = () => {
  return (
    <div>
      <Container>
        Welcome "user". <br />
        <br />
        Display last five previews of notes. "Paginate" too.
      </Container>
    </div>
  );
};

export default Home;
