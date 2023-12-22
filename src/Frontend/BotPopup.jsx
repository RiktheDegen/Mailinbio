import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getDatabase, ref, get, update, push } from 'firebase/database';
import { UserContext } from '../context/UserContext';

const BotPopup = ({ botId, onClose }) => {
  const [botFiles, setBotFiles] = useState([]);
  const [newFile, setNewFile] = useState(null);
  const context = useContext(UserContext);

  useEffect(() => {
    const fetchBotFiles = async () => {
      const db = getDatabase();
      const botFilesRef = ref(db, `users/${context.user.uid}/files`);
      try {
        const snapshot = await get(botFilesRef);
        const filesData = snapshot.val();
        console.log('filesData:', filesData); 
        // Ensure botFiles is an array
        setBotFiles(filesData || []);
      } catch (error) {
        console.error('Error fetching bot files:', error.message);
      }
    };

    fetchBotFiles();
  }, [context.user.uid]);

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleDeleteFile = (fileName) => {
    const updatedFiles = botFiles.filter((file) => file.name !== fileName);
    setBotFiles(updatedFiles);
  };

  const handleSaveChanges = async () => {
    try {
      const db = getDatabase();
      const botFilesRef = ref(db, `users/${context.user.uid}/files`);
      // Use push to add new files to the array
      await push(botFilesRef, { name: newFile.name });

      // Update the botFiles array with the new file
      setBotFiles((prevFiles) => [...prevFiles, { name: newFile.name }]);

      onClose();
    } catch (error) {
      console.error('Error saving changes:', error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const handleTestBot = () => {
    // Add logic for testing the bot
    // For example, navigate to the testing page with the botId
  };

  return (
    <div className=" p-4 bg-white shadow-md h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Bot Files</h2>
        <button className="text-sm text-gray-500" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} />
      </div>
      <ul>
        {Array.isArray(botFiles)
          ? botFiles.map((file, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <span>{file.name}</span>
                <button className="text-red-500" onClick={() => handleDeleteFile(file.name)}>
                  Delete
                </button>
              </li>
            ))
          : <p>botFiles is not an array</p>}
      </ul>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleTestBot}>
          Test My Bot
        </button>
      </div>
    </div>
  );
};

export default BotPopup;
