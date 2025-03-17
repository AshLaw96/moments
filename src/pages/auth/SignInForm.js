import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";

function SignInForm() {
  const [SignInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = SignInData;
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSignInData({ ...SignInData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/login/", SignInData);
      navigate("/");
    } catch (err) {
      console.error("API Error Response:", err.response?.data);
      setError(err.response?.data ?? { non_field_errors: ["Unknown error"] });
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>
          <Form onSubmit={handleSubmit}>
            {/* Username field */}
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {error.username &&
              (Array.isArray(error.username)
                ? error.username
                : [error.username]
              ).map((msg, index) => (
                <Alert variant="warning" key={index}>
                  {msg}
                </Alert>
              ))}
            {/* Password field */}
            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {error.password &&
              (Array.isArray(error.password)
                ? error.password
                : [error.password]
              ).map((msg, index) => (
                <Alert variant="warning" key={index}>
                  {msg}
                </Alert>
              ))}
            {/* Submit button */}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign in
            </Button>
            {error.non_field_errors &&
              (Array.isArray(error.non_field_errors)
                ? error.non_field_errors
                : [error.non_field_errors]
              ).map((msg, index) => (
                <Alert variant="warning" key={index} className="mt-3">
                  {msg}
                </Alert>
              ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;
