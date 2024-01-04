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

  // const handleSignup = () => {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       console.log(res);
  //       context.setUser({ email: res.user.email, uid: res.user.uid });
  //       try {
  //         writeUserData(res.user.uid, res.user.email);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast(error.message, {
  //         type: 'error',
  //       });
  //     });
  // };

  const handleSignup = async () => {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log(res);

      // Send email verification
      await res.user.sendEmailVerification();

      context.setUser({ email: res.user.email, uid: res.user.uid });

      try {
        writeUserData(res.user.uid, res.user.email);
      } catch (error) {
        console.log(error);
      }

      toast('Verification email sent. Please verify your email address.', {
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      toast(error.message, {
        type: 'error',
      });
    }
  };


  const handleSignupWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
  
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
  
        // Check if the user is new (just signed up)
        if (result.additionalUserInfo.isNewUser) {
          // If you are using the Realtime Database, you can write user data here
          // Example: writeUserData(user.uid, user.email);
  
          // Update your context or state with user information
          context.setUser({ email: user.email, uid: user.uid });
        }
      })
      .catch((error) => {
        console.error(error);
        toast(error.message, {
          type: 'error',
        });
      });
  };

  


  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };



  if (context.user?.uid ) {
    return <Navigate to="/EmailVerification" />;
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
    {/* <Button
  onClick={handleSignupWithGoogle}
  block
  className="p-2 mx-auto text-lg mt-8 max-w-[550px]"  // Adjusted button height and text size
  style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
>
  <div className="flex items-center justify-center">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"  // Added margin to separate icon and text
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6 10.2271C19.6 9.518 19.5364 8.83619 19.4182 8.18164H10V12.0498H15.3818C15.15 13.2998 14.4455 14.3589 13.3864 15.068V17.5771H16.6182C18.5091 15.8362 19.6 13.2725 19.6 10.2271Z"
        fill="#4285F4"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99886 20.0004C12.6989 20.0004 14.9625 19.1049 16.617 17.5777L13.3852 15.0686C12.4898 15.6686 11.3443 16.0231 9.99886 16.0231C7.39432 16.0231 5.18977 14.264 4.40341 11.9004H1.0625V14.4913C2.70795 17.7595 6.08977 20.0004 9.99886 20.0004Z"
        fill="#34A853"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.40455 11.9007C4.20455 11.3007 4.09091 10.6598 4.09091 10.0007C4.09091 9.34158 4.20455 8.70067 4.40455 8.10067V5.50977H1.06364C0.386364 6.85977 0 8.38704 0 10.0007C0 11.6143 0.386364 13.1416 1.06364 14.4916L4.40455 11.9007Z"
        fill="#FBBC05"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99886 3.97727C11.467 3.97727 12.7852 4.48182 13.8216 5.47273L16.6898 2.60455C14.958 0.990909 12.6943 0 9.99886 0C6.08977 0 2.70795 2.24091 1.0625 5.50909L4.40341 8.1C5.18977 5.73636 7.39432 3.97727 9.99886 3.97727Z"
        fill="#EA4335"
      ></path>
    </svg>
    Sign up with Google
  </div>
</Button> */}
</Container>
          
          

      

  );
};

export default Signup;

