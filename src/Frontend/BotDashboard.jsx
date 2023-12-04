import React from 'react'
import { getDatabase, ref, get } from 'firebase/database';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'
import { useNavigate, useLocation } from 'react-router-dom'
import PopupModal from './PopupModal';
import { json } from 'body-parser';

function BotDashboard({HasBot}) {


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null); // State to store the user's name
  const [userBotName, setUserBotName] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [userHasBot, setUserHasBot] = useState(null);
  const [loading, setLoading] = useState(true); 
  const context = useContext(UserContext);
  
  useEffect(() => {
    // Function to fetch the user's name
    const fetchUserName = async () => {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + context.user.uid);

      try {
        setUserHasBot(null);
        console.log(userHasBot);
        // Retrieve the user's data
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        // Set the user's name in the component's state
        
        setUserName(userData ? userData.Name : 'No Name'); // Default to 'No Name' if the user data is not available
        setUserBotName(userData.botName ? userData.botName : 'No Name');
        setUserPlan(userData.hasPaidStatus ? 'Starter Plan' : 'No Plan selected'); // Default to 'No Name' if the user data is not available
        
        var userBotStatus = userData.HasBotStatus;
        console.log(userBotStatus);
        setUserHasBot(userBotStatus);
        console.log(userHasBot);  
   
        if (userHasBot !== null) {

          setLoading(false);
          return
        }
        

        
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
      fetchUserName();
    };

    // // Call the function to fetch the user's name
    // 
    
  
    fetchUserName();
  }, [context.user.uid]); // Dependency to re-run the effect when the user ID changes

  function goToUpload (){
   
    navigate('/Upload');
  };
  


  
  return(
    <div>
      <div>
       <div className="flex h-screen bg-gray-100">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-800 p-4 text-white">
          <div className="mb-8">
            <div className="text-2xl font-bold mb-4">My Dashboard</div>
            <div className="border-b border-gray-600 pb-2 mb-4">
              <div className="text-sm font-semibold mb-2">My Bots</div>
              <ul>
      
                {/* Add more bots as needed */}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Settings</div>
              <ul>
        <li className="flex items-center text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
    </svg>
          General
        </li>
        <li className="flex items-center text-gray-300">
          <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Plans
        </li>
        <li className="flex items-center text-gray-300">
          <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Billing
        </li>
      </ul>
            </div>
          </div>
        </div>
    
        {/* Main Content Area */}
        <div className="flex-1 p-4">
          <div className="flex items-center border-b border-gray-300 pb-4 mb-4">
            <div className="text-2xl font-bold mr-4">{userName}'s Workspace</div>
            <div className="bg-blue-500 text-white px-2 py-1 rounded">{userPlan}</div>
          </div>
    
          <div className="bg-gray-100 p-4 rounded text-center">
            <div className="text-xl font-bold mb-2">Start building your bot today</div>
            <p className="text-gray-600 mb-4">
              Bring your API Docs to life — we can’t wait to see what you’ve got!
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={openModal}>+ New Bot</button>
            <PopupModal isOpen={modalIsOpen} onRequestClose={closeModal} />
          </div>
        </div>
      </div>
      </div>
  </div>
  );
  
  
};

export default BotDashboard


