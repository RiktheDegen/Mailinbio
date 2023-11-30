import React, { useState } from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Link} from "react-router-dom"
import Home from './Home';
import Signin from './Signin'
import Singup from './Singup'
import NotFound from './NotFound'
import Upload from './Upload'
import Mybotbckend from './Mybotbckend'
import CurrentUploads from './currentUploads';
import BotTesting from './BotTesting';

//toast 
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from './context/UserContext';

//firbase
import firebase from "firebase/compat/app"
import 'firebase/auth'


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



import Header from './Header';
import Footer from './Footer';


function App() {
  const [user, setUser] = useState(null)

  return (
  
  
<Router>
  <ToastContainer/>
  <UserContext.Provider value={{user, setUser}}>
  <Header/>
          <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/signin" element={<Signin />}/>
          <Route exact path="/signup" element={<Singup/>}/>
          <Route exact path="/Upload" element={<Upload />}/>
          <Route exact path="/BotTesting/:AssistantId" element={<BotTesting />}/>
          <Route exact path="/MyBotBckend" element={<Mybotbckend />}/>
          <Route exact path="/currentUploads" element={<CurrentUploads />}/>
          {/* <Route exact path="/Mybot" element={<Mybot />}/> */}
          <Route exact path="*" element={<NotFound/>}/>
          </Routes>
        
          <Footer/>
          </UserContext.Provider>
    </Router>
    
  )
}

export default App
