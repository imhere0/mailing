import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Mail from './Mail'
import Nav from './Nav';

const Inbox = () => {

    const [emails, setEmails] = useState([])
    const token = localStorage.getItem('token').toString('base64')
    console.log(token)
    
    useEffect(() => {

        const fetchemails = async() => {
            
            const response = await axios.get('http://127.0.0.1:8000/mail/mailbox/inbox', 
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
        <h2 className="center mb-30">Inbox</h2>

        <div class = "container">
            <div className='mail'>
                <div className = "recipients">
                    Sender
                </div>
                <div className='subject'>
                    Subjects
                </div>
                <div className = "timestamp">
                    TimeStamp
                </div>
            </div>
        </div>    
            <Mail emails = {emails} />
            
        </div>

  )
}

export default Inbox