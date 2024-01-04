import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, update } from 'firebase/database';
import { UserContext } from '../context/UserContext'

function PaymentSuccessPre() {
  const location = useLocation();
  const context = useContext(UserContext);
  const queryParams = new URLSearchParams(location.search);
  const successParam = queryParams.get('success');
  const failureParam = queryParams.get('canceled');
  const navigate = useNavigate();
  function writeUserPlanStatus(HasPaidStatus) {
      
    const db = getDatabase();
    const userRef = ref(db, 'users/' + context.user.uid);
    update(userRef, {
      HasPaidStatus: HasPaidStatus,
      PlanName: "Premium",
    });
  }

  if (successParam) {
    
    useEffect(() => {
      // Function to fetch the user's name
      const fetchPlanName = async () => {
        if (context.user) {
          writeUserPlanStatus("true");
        const db = getDatabase();
        const userRef = ref(db, 'users/' + context.user.uid);
  
        try {
          const snapshot = await get(userRef);
          const userData = snapshot.val();
          // Set the user's name in the component's state
         
          if (userData.HasPaidStatus && userData.HasBotStatus) {
            navigate('/BotDashboardWithUsers');
          }
          else if(userData.HasPaidStatus && userData.HasBotStatus === 'false'){
            navigate('/BotDashboard');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
        fetchPlanName();
      }
      };
  
      // // Call the function to fetch the user's name
      // 
      
    
      fetchPlanName();
    }, [context.user?.uid]);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl text-green-500 mb-4">&#10003;</div>
      <div className="text-2xl font-semibold mb-8">Your payment was a success</div>
      {/* You can add additional details or links here */}
      
    </div>
    )
  } else if (failureParam) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl text-red-500 mb-4">&#10008;</div>
      <div className="text-2xl font-semibold mb-8">Your payment was a failure</div>
      {/* You can add additional details or links here */}
    </div>
    )
  } 

 
}

export default PaymentSuccessPre