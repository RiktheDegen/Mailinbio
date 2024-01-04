import React, { useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';

function EmailVerification() {
  const { user } = useContext(UserContext);
  const Navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
       Navigate("/Onboarding")
      } else {
        console.log(false);
        console.log(`User: ${JSON.stringify(user)}`);
        console.log(`Email Verified: ${user.emailVerified}`);
        console.log(`Email Verified: ${user.emailVerified}`);
      }
    });

    // Clean up the observer on component unmount
    return () => unsubscribe();
  }, []);

  return   <div className="flex h-screen justify-center items-center">
  <div className="text-center">
    <h1 className="text-3xl font-bold mb-4">Please check your inbox for a verification link.</h1>
    <p>On verification, reload this page.</p>
  </div>
</div>;
}

export default EmailVerification;
