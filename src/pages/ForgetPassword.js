import {React,useState} from 'react'
import styled from 'styled-components'
import SignUpImage from './signup.jpeg'
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate  } from "react-router-dom";
import axios from "axios";

function ForgetPassword() { 
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);
    const [input, setInput] = useState({
        email:'',
        subpassword:'',
        password1:'',
        password2:''
    })
    const handleInput = (e) => {setInput({...input, [e.target.name]:e.target.value}); console.log(input)} 
    const handleRequest = async (e) => {
        e.preventDefault();
        await axios.post(axios.defaults.baseURL+'api/auth/forgotPassword',
        {email:input.email, subpassword:input.subpassword})
        .then(res => {
            console.log(res)
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('user', JSON.stringify(res.data.user));
            setVerified(true);
        }).catch(err=>{
            console.log(err)
        })
    }
    const changePassword = async (e) => {
        e.preventDefault();
        var user = JSON.parse(sessionStorage.getItem('user'))
        var token = sessionStorage.getItem('token')
        if(input.password1 === input.password2){
            await axios.put(axios.defaults.baseURL+`api/user/update/${user._id}`,
            {password:input.password1}, {"headers":{
                'x-access-token':token
            }})
            .then(res => {
                console.log(res)
                navigate('/inbox');
            }).catch(err=>{
                console.log(err)
            })

        }
        
    }
  return (
  <>
    <div className='container w-50 shadow p-5 my-5 rounded'>
        <div>
            <h4>Forgot Password</h4>
            <h6>Enter Credentials to reset your password</h6>
        </div>
        <div>
            {!verified?
            <form className='py-2' onSubmit={handleRequest}>
                <input type="text" onChange={handleInput} className='form-control my-2' name="email" placeholder='Email ID' />
                <input type="password" onChange={handleInput} className='form-control my-2' name='subpassword' placeholder='Sub Password' maxLength='2' />
                <input type="submit" className="btn btn-primary my-2" value="Create New Password"/>
            </form>
            :
            <form className='py-2' onSubmit={changePassword}>
            <input type="password" onChange={handleInput} className='form-control my-2' name='password1' placeholder='New Password' />
            <input type="password" onChange={handleInput} className='form-control my-2' name='password2' placeholder='Repeat Password' />
            <input type="submit" className="btn btn-primary my-2" value="Reset Password"/>
            </form>}
            <Link to="/">Login</Link>
        </div>
    </div>
  </>
  )
}

export default ForgetPassword

