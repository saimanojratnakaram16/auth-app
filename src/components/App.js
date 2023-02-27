import React from "react";
import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";


function App() {
  return (
    <Container>
        <React.StrictMode>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={<PrivateRoute Component = {Dashboard}/> } />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </AuthProvider>
          </Router>
        </React.StrictMode>
    </Container>
  );
}

export default App;
