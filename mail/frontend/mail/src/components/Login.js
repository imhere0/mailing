import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import Nav from './Nav';
import {Link, useNavigate}  from 'react-router-dom';

const Login = () => {
    const initial_state = {
        password:"",
        email:"", 
    };
    const [values, setValues] = useState(initial_state);
    
    const initial_message = ""

    const [errormessage, setmessage] = useState(initial_message)
    const navigate = useNavigate();

    const handleInputChange =  (event) => {
        const { name, value } = event.target;

        setValues({
          ...values,
          [name]: value,
        });
    };

    const handleSubmit = async(e) =>
    {       
            e.preventDefault()
            const data = {
                password: values.password,
                email: values.email,
            }

            console.log(data)
            
            var empty = false
            
            
            if (data.email === '')
            {   
                empty = true;
                document.getElementById('validation-field1').innerHTML = `Email Field has been left Empty.`;
                setTimeout(() => {
                        document.getElementById('validation-field1').innerHTML = "";        
                    },5000);
                
            }
            if (data.password === '')
            {   
                empty = true;
                document.getElementById('validation-field2').innerHTML = `Password Field has been left Empty.`;
                setTimeout(() => {
                        document.getElementById('validation-field2').innerHTML = "";        
                    },5000);
                
            }
            if (empty)
            {
                return;
            }
            
            try {
                let response = await axios.post('http://127.0.0.1:8000/mail/login',data);
                console.log(response.status);
                console.log(response.data);
                const Token = response.data.Token
                const username = response.data.username
                localStorage.setItem('token', Token)
                localStorage.setItem('name', username)
                console.log(localStorage.getItem('token'))

                navigate("/inbox");
                
            } catch (err) { 
                console.log(err.response.data.message.non_field_errors[0]); 
                document.getElementById('errormessage').innerHTML = `${err.response.data.message.non_field_errors[0]}`
                setTimeout(() => {
                        document.getElementById('validation-field1').innerHTML = "";        
                    },5000);               
            }

    };

    return (
        
        <div class = "register">
                
            <div class = "flex">
                    
                <form onSubmit = {handleSubmit} >
                    <div class =  "text-danger" id = "errormessage"></div>
                    <h2 class="center mb-30">Login</h2> 
                    <div class="form-group flex-item">
                        <label >Email</label>
                        <input  class="form-control"
                        name = "email"
                        value = {values.email}
                        onChange = {handleInputChange}
                        
                        />
                    </div>
                    <div id="validation-field1" class="text-danger"></div>

                    <div class="form-group flex-item">
                        <label >Password</label>
                        <input class = "form-control"
                        value = {values.password}
                        name = "password"
                        type = "password"
                        onChange = {handleInputChange}
                        />
                    </div>
                    <div id="validation-field2" class="text-danger"></div>
                    <div class = "flex-item">
                        <button type="submit" class="btn btn-primary mb-2">Login</button>
                    </div>


                    <div class = "center">
                        <Link to = {'/register'}>Register</Link>
                    </div>
                    
                    
            
                </form>
            
            </div>
        </div>
    )
}

export default Login
