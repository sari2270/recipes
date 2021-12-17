import { Card, Col, Container, Row } from "react-bootstrap";
import Login from "../components/user/Login";
import Register from "../components/user/Register";
import classes from "./AuthPage.module.css";

const AuthPage = () => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5 text-white rounded-pill">
        <Col xs={12} md={4}>
          <Card className={`${classes.card} m-4 p-4 bg-warning`}>
            <Register />
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className={`${classes.card} m-4 p-4 bg-warning`}>
            <Login />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
