import React, { useState, useEffect } from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from "react-router-dom"
import Home from './Home';
import Signin from './Frontend/Signin'
import Singup from './Frontend/Singup'
import NotFound from './NotFound'
import Upload from './Frontend/Upload'
import Mybotbckend from './ReusableComponents/Mybotbckend'
import CurrentUploads from './CurrentUploads';
import BotTesting from './Frontend/BotTesting';
import Pricing from './Frontend/Pricing';
import Courier from './Frontend/Courier';
import Preview from './Frontend/Preview'
//toast 
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from './context/UserContext';

//firbase
import firebase from "firebase/compat/app"
import 'firebase/auth'

import Header from './Frontend/Header';
import Footer from './Frontend/Footer';
import Onboarding from './Frontend/Onboarding';
import BotDashboard from './Frontend/BotDashboard';
import BotDashboardWithUsers from './Frontend/BotDashboardWithUsers';
import PopupModal from './Frontend/PopupModal';
import NewDocumentUpload from './Frontend/NewUpload';
import BotEmbed from './ReusableComponents/BotEmbed';
import NewHome from './Frontend/NewHome';
import EmailVerification from './Frontend/EmailVerification';
import PaymentSuccessAdv from './Frontend/PaymentSuccessAdv';

import PaymentSuccessPre from './Frontend/PaymentSuccessPre';
import PricingPopup from './Frontend/PricingPopup';
import Integration from './Frontend/Integration';


 const firebaseConfig = {
  apiKey: "AIzaSyByWWvzq0_Rqef_n8kZu58mQA6IENhL0UU",
  authDomain: "mailinbio-e8100.firebaseapp.com",
  projectId: "mailinbio-e8100",
  storageBucket: "mailinbio-e8100.appspot.com",
  messagingSenderId: "845033432043",
  appId: "1:845033432043:web:c4c3307b010a15cb0bafae",
  measurementId: "G-95Y59PQSJW",
  databaseURL: "https://mailinbio-e8100-default-rtdb.firebaseio.com/",
};

const prod = firebase.initializeApp(firebaseConfig);






function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
  
  
<Router>
  <ToastContainer/>
  <UserContext.Provider value={{user, setUser}}>
  <Header/>
          <Routes>
          <Route exact path="/" element={<NewHome />}/>
          <Route exact path="/signin" element={<Signin />}/>
          <Route exact path="/signup" element={<Singup/>}/>
          <Route exact path="/Upload" element={<Upload />}/>
          <Route exact path="/BotTesting/:AssistantId" element={<BotTesting />}/>
          <Route exact path="/MyBotBckend" element={<Mybotbckend />}/>
          <Route exact path="/currentUploads" element={<CurrentUploads />}/>
          <Route exact path="/Onboarding" element={<Onboarding />}/>
          <Route exact path="/BotDashboard" element={<BotDashboard />}/>
          <Route exact path="/BotDashboardWithUsers" element={<BotDashboardWithUsers />}/>
          <Route exact path="/PopupModal" element={<PopupModal />}/>
          <Route exact path="/NewUpload" element={<NewDocumentUpload />}/>
          <Route exact path="/NewHome" element={<NewHome />}/>
          <Route exact path="/advanced" element={<PaymentSuccessAdv />}/>
          <Route exact path="/premium" element={<PaymentSuccessPre />}/>
          <Route exact path="/EmailVerification" element={<EmailVerification />}/>
          <Route exact path="/PricingPopup" element={<PricingPopup />}/>
          <Route exact path="/Pricing" element={<Pricing />}/>
          <Route exact path="/Courier" element={<Courier />}/>
          <Route exact path="/Integration" element={<Integration />}/>
          <Route exact path="/Preview/:AssistantId" element={<Preview />}/>
          {/* <Route exact path="/Mybot" element={<Mybot />}/> */}
          <Route exact path="*" element={<NotFound/>}/>
          </Routes>
          <Footer/>
          </UserContext.Provider>
    </Router>
    
  )
}

export default App
