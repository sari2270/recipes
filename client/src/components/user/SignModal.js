import { Modal } from "react-bootstrap";

const SignModal = () => {
  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
      >
        <Modal.Header closeButton onClick={errorsReset}></Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={6} className="border-left mx-auto">
                <NewsignIn
                  Login={props.Login}
                  user={props.user}
                  error={props.error}
                  auth={props.auth}
                />{" "}
              </Col>
              <Col xs={12} md={6} className="border-right">
                <SignUp
                  Signup={props.Signup}
                  user={props.user}
                  SignupError={props.SignupError}
                  Login={props.Login}
                  error={props.error}
                  auth={props.auth}
                  editProfile={props.editProfile}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignModal;
