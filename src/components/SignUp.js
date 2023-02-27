import React, { useRef, useState }  from 'react';
import { Card, Form, Button, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [err,setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const {signup} = useAuth();
    const navigate =useNavigate();
    async function handleSubmit(e){
      e.preventDefault();
      if(passwordRef.current.value !== confirmPasswordRef.current.value){
        return setErr('Passwords do not match');
      }
      try{
       setErr('');
       setLoading(true);
       await signup(emailRef.current.value, passwordRef.current.value);
       navigate('/');
      }catch(e){
        setErr('Failed to create an account');
      }
      setLoading(false);
    }
  return (
    <div className="d-flex w-100 justify-content-center" style={{marginTop:"5%"}}>
    <>
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body >
            <h2 className='text-center mb-4'>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <Form.Label >Email</Form.Label>
                    <Form.Control type='email' ref={emailRef}/>
                </Form.Group>
                <Form.Group id='password'>
                    <Form.Label >Password</Form.Label>
                    <Form.Control type='password' ref = {passwordRef}/>
                </Form.Group>
                <Form.Group id='confirm-password'>
                    <Form.Label >Confirm Password</Form.Label>
                    <Form.Control type='password' ref={confirmPasswordRef}/>
                </Form.Group>
                {
                  err && (
                    <Alert className='mt-2' variant='danger'>{err}</Alert>
                  )
                }
                <Button disabled = {loading} className='w-100 text-center mt-2' type='submit'>Sign Up</Button>   
            </Form>
        </Card.Body>
        <div className='w-100 text-center mt-2 mb-2'>Already have an account?  <Link to='/login'>Log In</Link> </div>
      </Card>
    </>
    </div>
  )
}
