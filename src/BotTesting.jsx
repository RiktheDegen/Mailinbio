import React, { useContext } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../src/context/UserContext'

function BotTesting({ userId }) {
    const context = useContext(UserContext)
    if ( !context.user?.uid )  {
        return <Navigate to = "/"/>
       }
  return (
    <div>BotTesting</div>
  )
}

export default BotTesting