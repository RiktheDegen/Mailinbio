import React from 'react'

function NotFound() {
  return (
    <div style={styles.container}>

    <h1 style={styles.heading}>404 Not Found</h1>
    <p style={styles.message}>Sorry, the page you are looking for might be in another castle.</p>
</div>
  )
}
const styles = {
  container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: 0,
      backgroundColor: '#f0f0f0',
      flexDirection: 'column',
  },
  graphic: {
      maxWidth: '100%',
      height: 'auto',
      marginBottom: '20px',
  },
  heading: {
      color: '#333',
  },
  message: {
      color: '#555',
  },
};


export default NotFound