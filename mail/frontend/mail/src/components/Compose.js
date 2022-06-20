import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const Compose = () => {
    const initial_state = {
        "recipients": [],
        "body":"",
        "subject":"", 
    };
    const [values, setValues] = useState(initial_state);
    const navigate = useNavigate();
    const handleInputChange =  (event) => {
        const { name, value } = event.target;
        setValues({
          ...values,
          [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        const token = localStorage.getItem('token').toString('base64')
        var str = values.recipients
        var list = str.split(",")
        var listrecipient = []
        for(let i  = 0; i < list.length; i++)
        {
            listrecipient.push(list[i].trim())
        }
        const data = {
            body : values.body,
            recipients: listrecipient,
            subject : values.subject
        }
        try {

            console.log(data.recipients)
            let response = await axios.post('http://127.0.0.1:8000/mail/compose',data,{ headers: {'Authorization' : `Token ${token}`}});
            
            navigate("/sent");
            
        } catch (err) { 
            console.log(err.response.data.message.non_field_errors);
            console.log(err.response) 
            console.log(data.recipients)
            document.getElementById('errormessage').innerHTML = `${err.response.data.message.non_field_errors[0]}`
                setTimeout(() => {
                        document.getElementById('validation-field1').innerHTML = "";        
                    },5000);                
        }
    }
  return (
    
    <div className = "register">
                <Nav/>
        <div className = "flexbox">
        
                
            <form onSubmit = {handleSubmit} >
                <div class =  "text-danger" id = "errormessage"></div>
                <h2 className="center mb-30">Compose</h2> 
                <div className="form-group flex-item">
                    <label >To</label>
                    <input  className="form-control"
                    name = "recipients"
                    value = {values.recipients}
                    onChange = {handleInputChange}
                    
                    />
                </div>
                <small id="emailHelp" className="form-text text-muted">Enclose the recipients' email in quotation mark and separate them with comma</small>

                <div className="form-group flex-item">
                    <label >Subject</label>
                    <input className = "form-control"
                    value = {values.subject}
                    name = "subject"
                    onChange = {handleInputChange}
                    />
                </div>
                <div className = "form-group flex-item">
                    <label >Body</label>
                    <textarea
                    className = "form-control"
                    value = {values.body}
                    name = "body"
                    rows= "5"
                    resize = "none"
                    onChange={handleInputChange}>
                    </textarea>
                </div>
                            
                <div className = "flex-item">
                    <button type="submit" className="btn btn-primary mb-2">Send</button>
                </div>
                

            </form>

        </div>
    </div>
  )
}

export default Compose