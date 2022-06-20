import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from './Nav';
import Singleview from './Singleview';

const Emaildetail = () => {

    const [email,setEmail] = useState({})
    const token = localStorage.getItem('token').toString('base64')
    // const { id } = useParams();
    // const email_id = id
    // console.log(email_id)
    useEffect(() => {

        const fetchemail = async() => {
             
            const response = await axios.get(`http://127.0.0.1:8000/mail/emailview/20`, 
            {
                headers: {'Authorization' : `Token ${token}`}
            })
            
            setEmail(response.data)
            console.log(response.data)
            
        }

        fetchemail()
    },[])
  return (

    <div>
        <Nav/>
        <Singleview email = {email} />
    </div>
  )
}

export default Emaildetail