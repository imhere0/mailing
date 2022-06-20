import React from 'react'

const Mail1 = ({emails}) => {
  return (
    <div>
        {
          emails.map(email =>(
            
            <div className='mail'>
                
                <div id = "recipients " >
                    <ul>
                    {
                        email.recipients.map(recipient =>(
                                <li>{recipient}</li>
                        )
                        )
                    }
                    </ul>    
                </div> 
              <div id = "subject"> {email.subject}</div>
              <div id = "time" > {email.timestamp}</div>
            </div>  
          ))
        }

    </div>
  )
}

export default Mail1