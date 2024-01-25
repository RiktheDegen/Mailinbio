import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col, FormGroup, Label, Input, Card, CardBody, CardFooter } from 'reactstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignupBG from '../static/signup.png'



// const Signup = () => {
//   const context = useContext(UserContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');



//   const handleSignup = async () => {
//     try {
//       const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
//       console.log(res);

//       // Send email verification
//       await res.user.sendEmailVerification();

//       context.setUser({ email: res.user.email, uid: res.user.uid });

//       try {
//         writeUserData(res.user.uid, res.user.email);
//       } catch (error) {
//         console.log(error);
//       }

//       toast('Verification email sent. Please verify your email address.', {
//         type: 'success',
//       });
//     } catch (error) {
//       console.log(error);
//       toast(error.message, {
//         type: 'error',
//       });
//     }
//   };


//   const handleSignupWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
  
//     firebase
//       .auth()
//       .signInWithPopup(provider)
//       .then((result) => {
//         const user = result.user;
//         console.log(user);
  
//         // Check if the user is new (just signed up)
//         if (result.additionalUserInfo.isNewUser) {
//           // If you are using the Realtime Database, you can write user data here
//           // Example: writeUserData(user.uid, user.email);
  
//           // Update your context or state with user information
//           context.setUser({ email: user.email, uid: user.uid });
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         toast(error.message, {
//           type: 'error',
//         });
//       });
//   };

  


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSignup();
//   };



//   if (context.user?.uid ) {
//     return <Navigate to="/EmailVerification" />;
//   }

//   return (
//     <Container className="mt-4 mb-4 px-2" >
      
//     <Card className='max-w-[550px] justify-center mx-auto '>
//       <Form onSubmit={handleSubmit}>
//         <CardBody>
//         <h2 className="p-3 text-helvetica-neue text-3xl font-medium mb-4">Sign Up Today</h2>
//     <div className="my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px"></div>
//           <FormGroup className='pl-3' >
//             <Label for="email" sm={3}>
//               Email
//             </Label>
//             <Col >
//               <Input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder="provide your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Col>
//           </FormGroup>
//           <FormGroup className='pl-3'>
//             <Label for="password" sm={3}>
//               Password
//             </Label>
           
//             <Col >
//               <Input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="your password here"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </Col>
//           </FormGroup>
//         </CardBody>
//         <div className='p-8'>
//           <Button type="submit" block className="p-3 text-xl" style={{ backgroundColor: '#2D3748' }}>
//             Sign up
//           </Button>
//           </div>
//       </Form>
//     </Card>
   
// </Container>
          
          

      

//   );
// };


function Signup() {

  const context = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
    const handleSignup = async () => {
      try {

        if (password !== passwordConfirmation) {
          // Handle password mismatch, e.g., show an error message
          toast("Passwords don't match");
          return;
        }

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

      const handleSubmit = (e) => {
       
    e.preventDefault();
    handleSignup();
  };



  if (context.user?.uid ) {
    return <Navigate to="/EmailVerification" />;
  }

  return (
    <>
    <section className="bg-white text-helvetica-neue">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt="Pattern"
        src={SignupBG}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <a className="block text-blue-600" href="/">
          <span className="sr-only">Home</span>
        
        </a>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to DocMonster 
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
         Signup for to get started today
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
        

          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
           />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              name="password"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 border"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2 border"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="MarketingAccept" className="flex gap-4 ">
              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
              />

              <span className="text-sm text-gray-700">
                I want to receive emails about events, product updates and company announcements.
              </span>
            </label>
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our <></>
              <a href="#" className="text-gray-700 underline"> terms and conditions </a>
              <></>and <></>
              <a href="#" className="text-gray-700 underline"> privacy policy</a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button type="submit"
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"  style = {{backgroundColor: "#5F50F3"}}
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account? <></>
              <a href="/Signin" className="text-gray-700 underline">Log in</a>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>

    </>
  )
}


export default Signup;

