import React from 'react'
import {useState} from 'react'
import { useNavigate , Link}  from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';


const Register = () => {
    const initial_state = {
        username:"",
        password:"",
        email:"", 
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

    const matchEmail = (email) => 
    {
        var supposedEmail = /^[0-9a-zA-Z\._]+@[0-9a-zA-Z]+.[a-z]+$/
        if(email.match(supposedEmail))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    const handleSubmit = async(e) =>
    {       
            e.preventDefault()
            const data = {
                username : values.username,
                password: values.password,
                email: values.email,
            }

            console.log(data)
            
            var empty = false
            if (data.username === '')
            {   
                empty = true;
                document.getElementById('validation-field').innerHTML = `Username Field has been left Empty.`;
                setTimeout(() => {
                        document.getElementById('validation-field').innerHTML = "";        
                    },5000);
                
            }
            
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

            if(matchEmail(data.email) === false)
            {
                empty = true;
                document.getElementById('validation-field1').innerHTML = `Email Field does not match Email Pattern.`;
                setTimeout(() => {
                        document.getElementById('validation-field1').innerHTML = "";        
                    },5000);
            }
            if (empty)
            {
                return;
            }
            
            try {
                let response = await axios.post('http://127.0.0.1:8000/mail/register',data);
                console.log(response);
                console.log(response.status);
                navigate("/");

                
            } catch (err) {

                console.log(err.response.data.message.email[0]);
                console.log(err.response.data.message.username[0]);
                console.log(err.response.status);
                // document.getElementById('errormessage').innerHTML = `This is ${err.response.data.message.email[0]}`;
                if (err.response.status === 400)
                {
                    document.getElementById('errormessage').innerHTML = "Email Field and Username Field must be unique."
                    setTimeout(() => {
                        document.getElementById('errormessage').innerHTML = "";        
                    },5000);
                    return;

                }                
            }

            
          
            
    };

    return (
    
        <div class = "register">
            
            <div class = "flex">
                    
                <form onSubmit = {handleSubmit} >
                    <div class =  "text-danger" id = "errormessage"></div>
                    <h2 class="center mb-30">Register</h2> 
                    <div class="form-group flex-item">
                        <label >Username</label>
                        <input  class="form-control"
                        name = "username"
                        value = {values.username}
                        onChange = {handleInputChange}

                        />
                    </div>
                    <div id="validation-field" class="text-danger"></div>

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
                        <button type="submit" class="btn btn-primary mb-2">Register</button>
                    </div>
                    <div class = "center">
                        <Link to = {'/'}>Login</Link>
                    </div>
            
                </form>
            
            </div>
        </div>
    )
}

export default Register
