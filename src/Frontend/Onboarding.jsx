import React from 'react'
import { useState, useContext } from 'react';
import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import { getDatabase,ref, set, get, update } from 'firebase/database';
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';


  


function Onboarding({ userId }) {
    
    const navigate = useNavigate();
    let success; 
    const [name, setName] = useState('');
    const [organization, setOrganization] = useState('');
    const context = useContext(UserContext);



    if (!context.user?.uid){
        navigate('/')
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const db = getDatabase();
          const userRef = ref(db, 'users/' + context.user.uid);
          const snapshot = await get(userRef);
          const userValues = snapshot.val();
          
          if (userValues && userValues.Name !== '') {
            navigate('/BotDashboard');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      if (context.user?.uid) {
        fetchData();
      }
    }, [context.user?.uid, navigate]);
    

    //update values in Firebase
    function writeUserData(name, organization) {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + context.user.uid);
      
        update(userRef, {
          Name: name,
          Organisation: organization,
          HasBotStatus: 'false',
          HasPaidStatus: 'false',
          HasUploads: 'false',
          UploadCount: 0
        });
      }
      

    const handleFormSubmit = async (e) => {
        e.preventDefault(); 
      try {
        
        // Store additional information
        if (name !== '' && organization !== '') {

            writeUserData(name, organization)
            success = 'true';
            console.log("succesfully update user variables");
        }
            
              
        console.log('Additional information stored in the database');
        if (success === 'true') {
            
            console.log(success);
            navigate('/BotDashboard');
           }
        // You can redirect the user to another page or perform other actions here
      } catch (error) {
        console.error('Error storing information:', error.message);
      }
    };
    
   
    return (
        <div className="mt-8" style={{ minHeight: '60vh' }}>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md" >
        <h2 className="text-2xl font-semibold mb-4">Welcome to Api Chat</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className=" text-helvetica-neue block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="organization" className="text-helvetica-neue block text-sm font-medium text-gray-600">
              Organization:
            </label>
            <input
              type="text"
              id="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="text-helvetica-neue text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            style={{ backgroundColor: '#2D3748' }}
          >
            Submit
          </button>
        </form>
      </div>
      </div>
    );
}

export default Onboarding