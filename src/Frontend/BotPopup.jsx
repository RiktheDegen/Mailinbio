import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getDatabase, ref, get, update, push, set } from 'firebase/database';
import { UserContext } from '../context/UserContext';
import { BarLoader } from 'react-spinners';
import { useNavigate } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';
import PricingPopup from './PricingPopup';




const BotPopup = ({ botId, onClose }) => {
  const [botFiles, setBotFiles] = useState([]);
  const [newFile, setNewFile] = useState(null);
  const context = useContext(UserContext);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [docURL, setDocURL] = useState([]);
  const [docType, setDocType] = useState('');
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [embedCode, setEmbedCode] = useState(null);
  const [userAssitant, setUserAssitant] = useState('');
  const [Botloading, setBotLoading] = useState(false);
  const [createBotLoading, setCreateBotLoading] = useState(false);
  const [upgradeAlert, setUpgradeAlert] = useState(null);
  const [hasPaidStatus, setHasPaidStatus] = useState(null);
  const [msgCount, setMsgCount] = useState(0); // New state for message count
  const [totalMessages, setTotalMessages] = useState(null); // Set your threshold here


  const [PricingModalIsOpen, setPricingModalIsOpen] = useState(false);
  const PricingOpenModal = () => setPricingModalIsOpen(true);
  const PricingCloseModal = () => setPricingModalIsOpen(false);
  const Navigate = useNavigate();
 
  useEffect(() => {
    const fetchBotFiles = async () => {
      const db = getDatabase();
      const botFilesRef = ref(db, `users/${context.user.uid}/files`);
      const UserFilesRef = ref(db, `users/${context.user.uid}`);
      
        const snapshotUser = await get(UserFilesRef);
        const UserfilesData = snapshotUser.val();
      try {
        const snapshot = await get(botFilesRef);
        const filesData = snapshot.val();
        
        // console.log('filesData:', filesData); 
        // console.log(UserfilesData);
        setUserAssitant(UserfilesData.AssitantId)
        console.log(UserfilesData);
        const UserMsgCountRef = ref(db, `users/${context.user.uid}/${userAssitant}`);
        if (UserfilesData.PlanName == 'Premium') {
          setTotalMessages(1000)
        } else if(UserfilesData.PlanName == 'Advance'){
          setTotalMessages(2500)
        }


        const snapshotMsgCount = await get(UserMsgCountRef);
        const msgData = snapshotMsgCount.val();
        console.log(msgData?.msgCount);
        setMsgCount(msgData?.msgCount || 0); 
        const hasPaidStatusValue = UserfilesData.HasPaidStatus;

        
  if (hasPaidStatusValue !==  undefined) {
    setHasPaidStatus(hasPaidStatusValue);
  };
        
        const filesDataArray = Object.values(filesData).map(entry => ({
          filename: entry.fileName,
        }));
        console.log(filesDataArray);
        // Ensure botFiles is an array
        setBotFiles(filesDataArray || []);

        
      } catch (error) {
        console.error('Error fetching bot files:', error.message);
      }
    };

    fetchBotFiles();

    // Set up periodic fetch every 5 seconds (adjust the interval as needed)
  const intervalId = setInterval(fetchBotFiles, 1000);

  // Clean up the interval when the component unmounts
  return () => clearInterval(intervalId);
  }, [context.user, context.user?.uid, hasPaidStatus, msgCount, totalMessages, botFiles]);

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
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

 
  const generateEmbedCode = () => {
    
    return `//Insert this div in whichever pages you want your bot on

    <div class="Api-chat-widget" data-symbol="${userAssitant}" data-uid="${context.user.uid}"></div>
    
    //Insert this CSS file above any existing stylesheets in the head tag
    
    <link rel="stylesheet" href="https://myapiembedbot-9fe68cda24da.herokuapp.com/index-5zgJYuOQ.css">
    
    //Insert this in the bottom of any html page 
    
    <script type="module" src="https://myapiembedbot-9fe68cda24da.herokuapp.com/index-MeHTexxv.js"></script>`;
  };

  const handleGenerateEmbedClick = () => {
    
    console.log('1');
    const code = generateEmbedCode();
    console.log('2');
    console.log(hasPaidStatus);
    if (hasPaidStatus === 'true') {
      console.log(context.user);
      setEmbedCode(code);
    }
    else {
     
      setUpgradeAlert(`Please choose a plan to view your embed` )
      console.log(upgradeAlert);
    }
    
  };

  function writeUserData(HasUploads, UploadCount) {
      
    const db = getDatabase();
    const userRef = ref(db, 'users/' + context.user.uid);
    update(userRef, {
      HasUploads: HasUploads,
      UploadCount: UploadCount,
    });
  }

  const deleteBot = async() => {
    const db = getDatabase();
    const response = await axios.post('https://lorem-ipsum-demo-3115728536ba.herokuapp.com/api/deleteBot', {
      assistantId: userAssitant,
      });
      
      console.log(response.data.outcome);

    const userRef = ref(db, 'users/' + context.user.uid);
    

    update(userRef, {
      AssitantId: '',
      HasBotStatus: 'False',
      HasUploads: 'False',
      UploadCount: 0,
      botName: ''
    });
    Navigate('/BotDashboard')
  }
  
        
  const handleUpload = async () => {
          // Ensure a document is selected
          if (!document || loading) return;
          setLoading(true);
          setDocType('');
            // Specify the allowed file types
          
            if (uploadedDocuments.length >= 20) {
              alert('You can only upload up to 20 files.');
              return;
            }

          const allowedFileTypes = ['.c', '.cpp', '.csv', '.docx', '.html', '.java', '.json', '.md', '.pdf', '.php', '.pptx', '.py', '.rb', '.tex', '.txt', '.css'];
          
          const fileExtension = document.name.slice(((document.name.lastIndexOf(".") - 1) >>> 0) + 2);
          const isValidFileType = allowedFileTypes.includes(`.${fileExtension.toLowerCase()}`);

          if (!isValidFileType) {
            setDocType('Invalid file type. Please select a supported file type.');
            
            return;
          }

          // Reference to Firebase Storage
          const storageRef = firebase.storage().ref(`${context.user.uid}/${document.name}`);
      
          // Upload document
          const uploadTask = storageRef.put(document);
      
          // Handle successful upload
          uploadTask.on('state_changed',
            null,
            error => {
              console.error(error);
              setLoading(false);
            },
            async () => {
              // Document uploaded successfully
              console.log('Document uploaded successfully!');
              const db = getDatabase();
              const userRef = ref(db, 'users/' + context.user.uid + '/files');
              const sanitizedFileName = encodeURIComponent(document.name).replace(/\./g, '_');
              // const updatedFiles = [...uploadedDocuments, { fileName: document.name }];
              const updatedFiles = {
                ...uploadedDocuments.name,
                [sanitizedFileName]: { fileName: document.name },
              };

              update(userRef, updatedFiles )
              .then(() => {
              console.log('File added successfully!');
              })
               .catch((error) => {
                  console.error('Error adding file:', error.message);
              });
              const downloadURL = await storageRef.getDownloadURL(); // Await the promise
              const newDocument = { name: document.name, url: downloadURL };
              
              setUploadedDocuments((prevDocuments) => [...prevDocuments, newDocument]);
              console.log(uploadedDocuments.length);
              var incrementUploadCount = uploadedDocuments.length + 1;
             
              writeUserData('true', incrementUploadCount);
              console.log('performed writeUserData');
              
              setDocument(null); // Reset the document state after upload
              setLoading(false);
            }
          );
        };


  const handleDeleteFile = async (fileName) => {
    const documentToDelete = fileName;
    
    try {
      // Reference to Firebase Storage
      const updatedFiles = botFiles.filter((file) => file.filename !== fileName);
      setBotFiles(updatedFiles);
      const db = getDatabase();
      const storageRef = firebase.storage().ref(`${context.user.uid}/${documentToDelete}`);
      const sanitizedFileName = encodeURIComponent(documentToDelete).replace(/\./g, '_');
      const filesRef = ref(db, `users/${context.user.uid}/files/${sanitizedFileName}`);
      console.log(filesRef);

      // Delete the document from Firebase Storage
      await storageRef.delete();
      //Delete from RTDB
      set(filesRef, null)
      .then(() => {
        console.log('File deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting file:', error.message);
      });
      
      
      console.log('Document deleted successfully:', documentToDelete);
      console.log(botFiles.length);
      writeUserData(botFiles.length > 1 ? 'true' : 'false', botFiles.length - 1);

    } catch (error) {
      console.error('Error deleting document:', error.message);
      // Handle error if necessary
    }
  };

  function writeUserBot(AssitantId, HasBotStatus) {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + context.user.uid);
    update(userRef, {
      AssitantId: AssitantId,
      HasBotStatus: HasBotStatus,
    });
  };



  const createBot = async () => {
    setCreateBotLoading(true);
  
    const db = getDatabase();
    const botFilesRef = ref(db, `users/${context.user.uid}/files`);
    const snapshot = await get(botFilesRef);
    const filesData = snapshot.val();
  
    if (!filesData || Object.keys(filesData).length < 1) {
      setCreateBotLoading(false);
      return alert('Please upload files to continue');
    }
  
    const filesDataArray = Object.values(filesData).map(entry => ({
      filename: entry.fileName,
    }));
  
    const uploadedDocuments = [];
  
    for (const item of filesDataArray) {
      const fileName = item.filename;
  
      try {
        const storageRef = firebase.storage().ref(`${context.user.uid}/${fileName}`);
        const downloadURL = await storageRef.getDownloadURL();
        const newDocument = { name: fileName, url: downloadURL };
        uploadedDocuments.push(newDocument);
      } catch (error) {
        console.error(`Error uploading file "${fileName}":`, error);
        // Handle the error as needed
      }
    }
  
    // Now, uploadedDocuments contains an array of objects with 'name' and 'url' properties
  
    if (uploadedDocuments.length < 1) {
      setBotLoading(false);
      return alert('Error uploading files');
    }
  
    setUploadedDocuments((prevDocuments) => [...prevDocuments, ...uploadedDocuments]);
    console.log(uploadedDocuments);
    try {
      const response = await axios.post('https://lorem-ipsum-demo-3115728536ba.herokuapp.com/api/createBot', {
        dataArray: uploadedDocuments,
      });
  
      const botId = response.data.botResponse;
      console.log('Bot successfully made ' + botId);
      writeUserBot(botId, 'true');
      const charSet = 'asst';
      const hasAsst = charSet.split('').every(char => botId.includes(char));
  
      setBotLoading(false);
  
      if (hasAsst) {
      return  Navigate(`/BotTesting/${botId}`);
      }
    } catch (error) {
      console.error('Error creating bot:', error);
      setBotLoading(false);
      // Handle the error as needed
    }
  };

  const progressBarStyle = {
    container: {
      width: '100%',
      height: '100%',
      border: '1px solid black', // Adjust the border color as needed
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
    },
    progressBar: {
      width: `${(msgCount / totalMessages) * 100}%`,
      height: '100%',
      Color: 'green', // Adjust the color as needed
      borderRadius: '0.25rem',
    },
    label: {
      marginLeft: '8px',
      color: '#333', // Adjust the text color as needed
      fontWeight: 'bold',
    },
  };
  
  return (
    <div className=" p-4 bg-white h-full overflow-y-auto max-w-[700px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-helvetica-neue font-medium ">Bot Files</h2>
        <button className="text-sm text-gray-500" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="mb-4">
     
      <PricingPopup isOpen={PricingModalIsOpen} onRequestClose={PricingCloseModal} />

      <div className="flex ">
        <label htmlFor="fileInput" className="cursor-pointer mt-3">
          <div className="w-16 h-16 border border-gray-300 flex justify-center items-center">
            <span className="text-4xl">+</span>
          </div>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={(e) => setDocument(e.target.files[0])}
          />
        </label>
       
        {document && (
            <div className="ml-4 mt-3">
              
              <p className="font-semibold">{document.name}</p>
              <p className="font-semibold">{docType}</p>
              {/* You can also display other information like size, type, etc. */}
              {/* <p>{`Type: ${document.type}`}</p> */}
              {/* <p>{`Size: ${document.size} bytes`}</p> */}
             
            </div>
          )}
      </div>
      <button
  className="text-helvetica-neue mt-8 mb-8 bg-transparent hover:bg-blue-500 text-grey-500 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
  onClick={handleUpload}
  disabled={loading} // Disable the button when loading
>


  {loading ? (
        <div className="flex items-center justify-center mt-4">
          <BarLoader color="#4A90E2" loading={loading} />
        </div>
      ) : 'Upload Document'}

</button>
        <p className='text-helvetica-neue font-semibold'> Current message count:</p>
            <div style={progressBarStyle.container}>
  <div style={progressBarStyle.progressBar}></div>
  <div style={progressBarStyle.label}>{`${msgCount}/${totalMessages}`}</div>
</div>
      </div>
  

      <li>
      {Array.isArray(botFiles) && botFiles.length > 0 ? (
  <div className="flex flex-col gap-2">
    {botFiles.map((file, index) => (
      <div key={index} className="flex items-center border p-2">
        {/* Add your icon (replace the placeholder below) */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

        <span className="text-ellipsis">{file.filename.slice(0, 30) + file.filename.slice(file.filename.lastIndexOf('.'))}</span>
        <button
          className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-800 font-bold uppercase text-xs px-2 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => handleDeleteFile(file.filename)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

        </button>
      </div>
    ))}
  </div>
) : (
  <p>This bot has no files</p>
)}
      </li>
      <div>
      {embedCode && (
        
        <div className='mx-4 mt-8'>
          <h3>Embed Code:</h3>
          <SyntaxHighlighter language="javascript" style={dracula}>
          {embedCode}
      </SyntaxHighlighter>
          
          
        </div>
        
      )}
      </div>
      {upgradeAlert && (
      <div className="text-center justify-center ml-2 mt-4 text-helvetica-neue text-gray-600 mb-4">
        {upgradeAlert}
        <button  className="ml-2 py-2 px-4 rounded" style={{ backgroundColor: "#2D3748", color: "#FFFFFF" }} onClick={PricingOpenModal}>
          Upgrade now
        </button>
      </div>
    )}
   
   

      <div className="mt-16 ">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={createBot}  disabled={createBotLoading} >
          
      

        {createBotLoading ? (
        <div className="flex items-center justify-center mt-4">
          <BarLoader color="#4A90E2" loading={createBotLoading}/>
        </div>
      ) : 'Save Changes/Test'}
  </button>


        <button className='mx-4 mt-8 mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={handleGenerateEmbedClick} style = {{backgroundColor: "#2D3748"}}>View Current embed</button>
      </div>

      <button block className="mt-2 bg-red-500 text-white px-8 py-2 rounded justify-center items-center" onClick={deleteBot} >
         Delete My bot
        </button>
    </div>
  );
};

export default BotPopup;
