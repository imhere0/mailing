
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from "./Nav";

const Singleview = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const email = id
    console.log(email)
    const token = localStorage.getItem('token')
    const [emails, setEmails] = useState({})
    const checkspam = async() =>
    {
      const response = await axios.get(`http://127.0.0.1:8000/mail/predict/`, {
        params: { mail: String(emails.body) }
      });
      
      console.log(response.data.SpamorNot)
      if (response.data.SpamorNot === 0)
      {
        document.getElementById('spammessage').innerHTML = `This is Not a Spam Mail`;
        document.getElementById('body').style.backgroundColor = 'lightgreen';
      }
      else
      {
        document.getElementById('spammessage').innerHTML = `This is a Spam Mail`;
        document.getElementById('body').style.backgroundColor = 'red';

      }
    }
    const compose = () => {
      navigate("/compose");
    }

    useEffect(() => {

        const fetchemails = async() => {
            
            const response = await axios.get(`http://127.0.0.1:8000/mail/emailview/${email}`, 
            {
                headers: {'Authorization' : `Token ${token}`}
            })
            
            
            setEmails(response.data)

            
        }

        fetchemails()
    }, [])

  return (
    <div>
      <Nav/>
      <div className="register">
        <div class = "flexbox">
          <div class = "singleView">
            <div className="center">
              <h3> Email Details</h3>
            </div>
            <table>
            <br/>
              <tr>
                <td className="textRight">
                    <h5>Subject: &nbsp;</h5>
                </td>
                <td className="textLeft">
                    {emails.subject}
                </td>
              </tr>
              <tr>
                <td className="textRight">
                    <h5>Date And Time: &nbsp;</h5>
                </td>
                <td className="textLeft">
                    {emails.timestamp}
                </td>
              </tr>
              <tr>
                <td className="textRight">
                    <h5>Sender: &nbsp;</h5>
                </td>
                <td className="textLeft">
                    {emails.sender}
                </td>
              </tr>
              <tr>
                <td className="textRight">
                    <h5>Recipients: &nbsp;</h5>
                </td>
                <td className="textLeft">
                  <ul>
                      {
                          emails.recipients.map(recipient =>(
                                  <li>{recipient}</li>
                          )
                          )
                      }
                      </ul>
                </td>
              </tr>
              <tr>
                <td className="textRight" >
                    <h5>Body: &nbsp;</h5>
                </td>
                <td className="textLeft" id = "body">
                    {emails.body}
                </td>
              </tr>
              <tr>
                <td className="textRight">
                  <button class="btn btn-primary mb-2" onClick={checkspam}>Check Spam</button>
                </td>
                <td className="textLeft">
                  <button class="btn btn-primary mb-2" onClick={compose}>Reply</button>
                </td>
              </tr>
          </table>
          <h3 class = "center" id = "spammessage">

          </h3>
          </div>
        </div>
      </div>
                  
    </div>
      
    
  )
}

export default Singleview