import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Mail from './Mail'
import Mail1 from './Mail1'
import Nav from './Nav'

const Sent = () => {

    const [emails, setEmails] = useState([])
    const token = localStorage.getItem('token').toString('base64')
    
    useEffect(() => {

        const fetchemails = async() => {
            const response = await axios.get('http://127.0.0.1:8000/mail/mailbox/sent', 
            {
                headers: {'Authorization' : `Token ${token}`}
            })
            const emaildiv =  document.querySelector('#inboxid');
            
            setEmails(response.data)
            
        }

        fetchemails()
    }, [])
  return (
    <div>
     <Nav/>   
    <h2 className="center mb-30">Sent</h2>
    <div class = "container">
        <div className='mail'>
            <div className = "recipients">
                Recipients
            </div>
            <div className='subject'>
                Subjects
            </div>
            <div className = "timestamp">
                TimeStamp
            </div>
        </div>
        <Mail1 emails = {emails} />
        
    </div>
</div>
  )
}

export default Sent