// import React, { useContext, useState } from 'react'
// import {Container, Form, Button, Row, Col, FormGroup, Label, Input, Card,CardBody, CardHeader, CardFooter } from 'reactstrap'

// import firebase from 'firebase/compat/app'
// import "firebase/compat/auth";
// import { getDatabase,ref, set, get,child  } from 'firebase/database';


// import { UserContext } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'





// const Signin = () => {
//   const navigate = useNavigate();
//   const context = useContext(UserContext)
//   const[email, setEmail] = useState('')
//   const[password, setPassword] = useState('')
//   const userId = context.user?.uid;


//   const handleSignup = () => {
//     firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then( res => {
//       console.log(res);
//       context.setUser({email:res.user.email, uid: res.user.uid, botStatus:'false'})
//     }
//     )
//     .catch(error => {
//       console.log(error)
//       toast(error.message, {
//         type: 'error'
//       })
//     }) }

//   const handleSubmit = e => {
//     console.log("called function");
//     e.preventDefault()
//     handleSignup()
//   }

  



 

//   if ( context.user?.uid )  {
//     const checkForBot = async() => {
//       const db = getDatabase();
//       const userRef = ref(db, 'users/' + context.user.uid);
//        // Retrieve updated data
//     const snapshot = await get(userRef);
//     const updatedUserData = snapshot.val();
//     const userHasBot = updatedUserData.HasBotStatus;
      
//     if (userHasBot === 'true') {
//       navigate("/BotDashboardWithUsers");
//     } else {
//       navigate("/BotDashboard");
//     }

//     }

//     checkForBot();
    
//    }
   
  

//   return(
//     <Container className='mt-4 text-center' style={{ minHeight: '60vh' }}>
//       <Row>
//         <Col lg={6} className='offset-lg-3 mt-5 '>
//           <Card>
//             <Form onSubmit = {handleSubmit} >
//               <CardHeader className=''>SignIn here</CardHeader> 
//               <CardBody>
//                 <FormGroup row>
//                   <Label for='email' sm={3}>Email</Label>
//                   <Col sm={9}>
//                       <Input
//                       type='email'
//                       name='email'
//                       id='email'
//                       placeholder='provide your email'
//                       value={email}
//                       onChange={e => setEmail(e.target.value)}
//                       />
//                         </Col>
//                         </FormGroup>
//                         <FormGroup row>
//                         <Label for='password' sm={3}>Password</Label>
//                           <Col sm={9}>
//                             <Input
//                                 type='password'
//                                 name='password'
//                                 id='password'
//                                 placeholder='your password here'
//                                 value={password}
//                                 onChange={e => setPassword(e.target.value)}/>
//                                   </Col>
//                                   </FormGroup>
//                                   </CardBody>
//                                   <CardFooter>
//                           <Button type='submit' block color='primary' >Sign in</Button>
//                                   </CardFooter>
//                   </Form>
//                   </Card>
//                   </Col>
//                   </Row>
//                   </Container>
//   );
  
// }

// export default Signin


import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col, FormGroup, Label, Input, Card, CardBody, CardFooter } from 'reactstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signin = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        context.setUser({ email: res.user.email, uid: res.user.uid, botStatus: 'false' });
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
    handleSignin();
  };

  if (context.user?.uid) {
    const checkForBot = async () => {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + context.user.uid);
      const snapshot = await get(userRef);
      const updatedUserData = snapshot.val();
      const userHasBot = updatedUserData.HasBotStatus;

      if (userHasBot === 'true') {
        navigate('/BotDashboardWithUsers');
      } else {
        navigate('/BotDashboard');
      }
    };

    checkForBot();
  }

  return (
    
    <Container className="mt-8 text-left p-8 text-helvetica-neue" >
      <Card className='max-w-[550px] justify-center mx-auto '>
        <Form onSubmit={handleSubmit}>
          <h2 className="p-3 text-helvetica-neue text-3xl font-medium mb-4">Sign Into Your Account</h2>
          <div className="my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px"></div>


          <CardBody>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Provide your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <div className="mt-2 text-sm">
              <a href="#forgot-password">Forgot your password?</a>
            </div>
          </CardBody>
         <div className='p-3'>
            <Button type="submit" block className='p-3 text-xl' style = {{backgroundColor: "#2D3748"}}>
              Sign in
            </Button>
            </div>
        </Form>
      </Card>
    </Container>
  
  );
};

export default Signin;
