import React, { useContext, useState } from 'react'
import {Container, Form, Button, Row, Col, FormGroup, Label, Input, Card,CardBody, CardHeader, CardFooter } from 'reactstrap'

import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import { getDatabase,ref, set, get  } from 'firebase/database';
//firebase.initializeApp(firebaseConfig);

import { UserContext } from './context/UserContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function writeUserData(userId, email, hasExistingBot) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    email: email,
    UserHasBot: hasExistingBot
  });
}


const Singup = () => {

  const context = useContext(UserContext)
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')


  const handleSignup = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( res => {
      console.log(res);
      context.setUser({email:res.user.email, uid: res.user.uid})
      try {
        writeUserData(res.user.uid, res.user.email, 'False');
      } catch (error) {
        console.log(error);
      }
      
    })
    .catch(error => {
      console.log(error)
      toast(error.message, {
        type: 'error'
      })
    })
    

  }

  const handleSubmit = e => {
    console.log("called function");
    e.preventDefault()
    handleSignup()
  }

  const dbRef = firebase.database().ref();
  const hasBotStatus = dbRef.child("users").child(userId).child(hasExistingBot).get();
  if (context.user?.uid) {
   return <Navigate to = "/Upload"/>
  }
  return(
    <Container className='text-center'>
      <Row>
        <Col lg={6} className='offset-lg-3 mt-5'>
          <Card>
            <Form onSubmit = {handleSubmit}>
              <CardHeader className=''>SignIn here</CardHeader> 
              <CardBody>
                <FormGroup row>
                  <Label for='email' sm={3}>Email</Label>
                  <Col sm={9}>
                      <Input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='provide your email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      />
                        </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label for='password' sm={3}>Password</Label>
                          <Col sm={9}>
                            <Input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='your password here'
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                                  </Col>
                                  </FormGroup>
                                  </CardBody>
                                  <CardFooter>
                          <Button type='submit' block color='primary' >Sign in</Button>
                                  </CardFooter>
                  </Form>
                  </Card>
                  </Col>
                  </Row>
                  </Container>
  );
  
}

export default Singup