import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value.trim(), });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/signin");
    } catch (err) {
      console.error("API Error Response:", err.response?.data);
      setError(err.response?.data ?? { non_field_errors: ["Unknown error"] });
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign up</h1>
          <Form onSubmit={handleSubmit}>
            {/* Username field */}
            <Form.Group controlId="username">
              <Form.Label className="d-none" aria-label="Username">Username</Form.Label>
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
            <Form.Group controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {error.password1 &&
              (Array.isArray(error.password1)
                ? error.password1
                : [error.password1]
              ).map((msg, index) => (
                <Alert variant="warning" key={index}>
                  {msg}
                </Alert>
              ))}
            {/* Confirm password field */}
            <Form.Group controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {error.password2 &&
              (Array.isArray(error.password2)
                ? error.password2
                : [error.password2]
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
              Sign up
            </Button>
            {error.non_field_errors &&
              (Array.isArray(error.non_field_errors)
                ? error.non_field_errors
                : [error.non_field_errors]
              ).map((msg, index) => (
                <Alert variant="warning" key={index}>
                  {msg}
                </Alert>
              ))}
          </Form>
        </Container>
        {/* Link to sign in */}
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
