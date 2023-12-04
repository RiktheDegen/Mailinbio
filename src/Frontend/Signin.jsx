import React, { useContext, useState } from 'react'
import {Container, Form, Button, Row, Col, FormGroup, Label, Input, Card,CardBody, CardHeader, CardFooter } from 'reactstrap'

import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import { getDatabase,ref, set, get,child  } from 'firebase/database';


import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'





const Signin = () => {

  const context = useContext(UserContext)
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const userId = context.user?.uid;


  const handleSignup = () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then( res => {
      console.log(res);
      context.setUser({email:res.user.email, uid: res.user.uid, botStatus:'false'})
    }
    )
    .catch(error => {
      console.log(error)
      toast(error.message, {
        type: 'error'
      })
    }) }

  const handleSubmit = e => {
    console.log("called function");
    e.preventDefault()
    handleSignup()
  }


  if ( context.user?.uid && context.user.botStatus === 'false')  {
    return <Navigate to = "/Upload"/>
   }
  

  return(
    <Container className='mt-4 text-center' style={{ minHeight: '60vh' }}>
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

export default Signin