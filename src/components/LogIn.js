import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setErr("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setErr("Failed to sign in");
    }
    setLoading(false);
  }
  return (
    <div className="d-flex w-100 justify-content-center" style={{marginTop:"5%"}}>
    <>
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            {err && (
              <Alert className="mt-2 mb-0" variant="danger">
                {err}
              </Alert>
            )}
            <Button
              disabled={loading}
              className="w-100 text-center mt-2"
              type="submit"
            >
              Log In
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-2">
          Need a new account? <Link to="/signup"> Sign Up</Link>
        </div>
      </Card>
    </>
    </div>
  );
}
