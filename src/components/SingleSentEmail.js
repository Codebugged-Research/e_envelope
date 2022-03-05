import React from 'react'
import styled from 'styled-components'
import Person from '@material-ui/icons/Person'
import emailData from '../data/emailData'
import SubPassword from '../components/SubPassword';
import { Switch } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { useEffect,useState } from 'react';

const SingleSentEmail = (props) => 
{
    const [showSubPassword, setShowSubPassword] = useState(false)
    const [checked,setChecked] = useState(JSON.parse(sessionStorage.getItem('SubPassword')))
    const [SubPassword,setSubPassword] = useState('')
    const [messeges,setMesseges] = useState({
        to:'',
        subject:'',
        body:''
    })
    const user = JSON.parse(sessionStorage.getItem('user'))
    const token = sessionStorage.getItem('token')
    console.log(checked)
    const subPassword = async () =>{
    if (checked === false)
    {
    console.log(user._id ,token)
    const data = {
    _id:user._id, 
    subpassword:SubPassword,
    }
    await axios.post(axios.defaults.baseURL+`api/auth/chkSubPassword/`, data, {"headers":{ 
    "x-access-token": token,
    }
    }).then(res=> {
    sessionStorage.setItem('SubPassword', true)
    sessionStorage.setItem('time', new Date().getTime())
    setChecked(true)}).catch(err=> console.log(err))
    }
    else 
    {
    sessionStorage.setItem('SubPassword', false)
    setChecked(false)
    } 
    }
    useEffect(() => {
        data();
    }, [])
    const data = async () => {
        const res = JSON.parse(sessionStorage.getItem('user'))
        await axios.get(axios.defaults.baseURL+`api/mail/${props.id}`, {"headers":{ 
            "x-access-token": token,
          }
        }).then(res=>{console.log(res); setMesseges(res.data);})
        }
return (
    <>
    <div className='d-flex flex-column w-80'>
    <TopWrapper className='d-flex flex-row justify-content-start align-items-center '>
        <LockIcon onClick={() => (setShowSubPassword(showSubPassword ? false : true))} />
         { showSubPassword ? <div className='p-0' ><Switch checked={checked} onChange={subPassword} /> 
        <input className='form-control w-50 d-inline' placeholder='Sub Password' 
        value={SubPassword} onChange={(e)=> setSubPassword(e.target.value)}
        type="password" maxLength='2' /></div> : null }
      </TopWrapper>
    <Wrapper key={messeges._id} className='d-flex flex-column container rounded shadow my-3'>
        <Subject className='mx-5 my-3'>{ checked ? messeges.subject : '#'.repeat(messeges.subject.length) }</Subject>
        <ImageAddressWrapper className='d-flex flex-row mx-1'>
        <Person/>
        <AddressTimeWrapper className='d-flex flex-column mx-3'>
            <AddressID>{ checked ? messeges.to : '#'.repeat(messeges.to.length) }</AddressID>
            <DateTime>{messeges.createdAt}</DateTime>
        </AddressTimeWrapper>
        </ImageAddressWrapper>
        <MessegeWrapper className="d-flex flex-column mx-5 my-3">
            <Messege>{ checked ? messeges.body : '#'.repeat(messeges.body.length) }</Messege>
        <AttachmentWrapper></AttachmentWrapper>
        </MessegeWrapper>
    </Wrapper>
    </div>
    </>
  )
}

export default SingleSentEmail

const Wrapper = styled.div`
    height:  calc( 100vh - 70px );
    width:80%;
    background-color:white;
    align-content: center;
    justify-content: flex-start;
    align-items: flex-start;
    `
    const TopWrapper = styled.div`
    font-size:16px;
    padding: 20px;
    background-color:#e3e3e3a1;
    border-radius:0.5rem;
`
const Subject = styled.h2`
// padding: 15px 30px;
`
const ImageAddressWrapper = styled.div``

const AddressTimeWrapper = styled.div``

const AddressID = styled.div`
font-size:18px;
font-weight:600;`

const DateTime = styled.i`
font-size:12px;
color:gray;`

const MessegeWrapper = styled.div``

const Messege = styled.p`
    text-align:left;
`


const AttachmentWrapper = styled.div``