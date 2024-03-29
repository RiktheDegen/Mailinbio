// BotModal.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { getDatabase,ref, set, get,child, update, increment } from 'firebase/database';
import Modal from 'react-modal';
import { UserContext } from '../context/UserContext'


Modal.setAppElement('#root'); // Set the root element for accessibility

const PopupModal = ({ isOpen, onRequestClose }) => {

    const customStyles = {

    content: {
        height: '250px',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    outline: "none",

    
        },


      };

        // Apply different styles for viewports below 425px
  if (window.innerWidth < 765) {
    customStyles.content.height = "50%";
    customStyles.content.width = "80%";
    // Add more style changes as needed for small viewports
  };

      const customOverlayStyles = {
        content: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            },
    
          };

  const [botName, setBotName] = useState('');
  const navigate = useNavigate();
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }    
  const context = useContext(UserContext);
  const setFilesNull = async() => {
    const db = getDatabase();
   const filesRef = ref(db, `users/${context.user.uid}/files`);   
    // Delete the document from Firebase Storage
        set(filesRef, null)
        .then(() => {
          console.log('File deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting file:', error.message);
        });
  };
  setFilesNull();
  const handleCreateBot = () => {
    // Handle creating the bot (you can add your logic here)
    function writeUserData(botName) {
      
        const db = getDatabase();
        const userRef = ref(db, 'users/' + context.user.uid);
        update(userRef, {
          botName: botName,
        });
      }

    writeUserData(botName);  
    // For example, navigate to a different component
    navigate('/Upload'); // Replace with your actual route
  };

  return (
    <div>
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} overlayClassName="overlay">
  <div className="flex flex-col p-2">
    <div className="text-2xl text-helvetica-neue font-medium">Name your bot</div>
    <hr className="w-full border border-gray-500" />
    <label className="text-helvetica-neue text-gray-700 mb-2">Bot name:</label>
    <input
      type="text"
      value={botName}
      onChange={(e) => setBotName(e.target.value)}
      className="w-full border p-2 mb-4"
    />
    <button
      onClick={handleCreateBot}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      style = {{backgroundColor: "#2D3748"}}
    >
      Create Bot
    </button>
  </div>
</Modal>
    </div>
    
  );
};

export default PopupModal;
