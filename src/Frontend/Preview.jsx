import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Preview({ userId }) {
    const { AssistantId } = useParams();
    const userAssitant = AssistantId;
  
  
    return (
    <>
    <div className='h-screen'>
       <Helmet>

<script type="module" src="https://myapiembedbot-9fe68cda24da.herokuapp.com/index-MWfnQyut.js"></script>
<link rel="stylesheet" href="https://myapiembedbot-9fe68cda24da.herokuapp.com/index-9zFeCT1e.css"></link>
    </Helmet>

    <div class="Api-chat-widget" data-symbol={AssistantId} data-uid='EzqjBlenACZH9TWxd1mK1sEAEg92'
    data-theme="dark"></div>


</div>
    </>
  )
}

export default Preview