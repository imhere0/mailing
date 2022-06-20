import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import {Link}  from 'react-router-dom';
import Singleview from './Singleview';

const Mail = ({emails}) => {




  return(
    <div>
        {
          emails.map(email =>(
            <div class = "container">  
            <div className='mail'>

                
                <div id = "sender " >
                  <Link to = {`/singleview/${email.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  {email.sender}
                  </Link>
                </div> 
                <div id = "subject">
                <Link to = {`/singleview/${email.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  {email.subject}
                  </Link>
                </div>
                <div id = "time" > 
                <Link to = {`/singleview/${email.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  {email.timestamp}
                  </Link>
                </div>
            </div>
            {/* <div className = "flex-item">
              <button type="submit" className="btn btn-primary mb-2" onclick = {checkspam(email.body)}>Check Spam</button>
            </div>
            <div id = "errormessage1">    
            </div>  */}
            </div>
            
           
          ))
        }

    </div>
  )    
}

export default Mail