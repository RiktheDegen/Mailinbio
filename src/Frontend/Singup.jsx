// 


import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col, FormGroup, Label, Input, Card, CardBody, CardFooter } from 'reactstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        context.setUser({ email: res.user.email, uid: res.user.uid });
        try {
          writeUserData(res.user.uid, res.user.email);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: 'error',
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  if (context.user?.uid) {
    return <Navigate to="/Onboarding" />;
  }

  return (
    <Container className="mt-4 mb-4" >
      
          <Card className='max-w-[550px] justify-center mx-auto '>
            <Form onSubmit={handleSubmit}>
              <CardBody>
              <h2 className="p-3 text-helvetica-neue text-3xl font-medium mb-4">Sign Up Today</h2>
          <div className="my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px"></div>
                <FormGroup className='pl-3' >
                  <Label for="email" sm={3}>
                    Email
                  </Label>
                  <Col >
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="provide your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup className='pl-3'>
                  <Label for="password" sm={3}>
                    Password
                  </Label>
                 
                  <Col >
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="your password here"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <div className='p-8'>
                <Button type="submit" block className="p-3 text-xl" style={{ backgroundColor: '#2D3748' }}>
                  Sign up
                </Button>
                </div>
            </Form>
          </Card>
      
    </Container>
  );
};

export default Signup;
