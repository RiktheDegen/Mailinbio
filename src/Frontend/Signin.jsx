import React, { useContext, useState, useEffect } from 'react';
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
        const authUser = res.user; // <-- This is the authenticated user
        if (authUser.emailVerified) {
          checkForBot(authUser);
        } else {
          navigate('/EmailVerification');
        }
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: 'error',
        });
      });
  };

  

  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        // You may want to check if the user is new here as well
        context.setUser({ email: user.email, uid: user.uid });
    
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
    handleSignin();
  };

 
    const checkForBot = async () => {
      console.log('Email Verified:', context.user);
    
  
      const db = getDatabase();
      const userRef = ref(db, 'users/' + context.user.uid);
      const snapshot = await get(userRef);
      const updatedUserData = snapshot.val();

      const userHasBot = updatedUserData.HasBotStatus;
      console.log('HasBotStatus:', userHasBot);

      
        console.log('email is verified');
        if (userHasBot === "true") {
          navigate('/BotDashboardWithUsers');
        }

        else {
          navigate('/BotDashboard');
        }

      

     
    };

  

  useEffect(() => {
    if (context.user?.uid) {
        // Use an async IIFE to wait for the asynchronous checkForBot function
    (async () => {
      await checkForBot();
    })();
    }
  }, [context.user]);

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

      {/* <div className='max-w-[550px] justify-center mx-auto'>
       <button
                type="button"
                
                onClick={handleSignInWithGoogle}
                className=" p-3 text-xl " 
              >
                <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48" className='mx-2'>
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
                  Sign In with Google
                </div>
              </button>
              </div> */}
    </Container>
  
  );
};

export default Signin;
