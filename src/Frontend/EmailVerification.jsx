import React, { useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { UserContext } from '../context/UserContext';

function EmailVerification() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        console.log(true);
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

  return <div>EmailVerification</div>;
}

export default EmailVerification;
