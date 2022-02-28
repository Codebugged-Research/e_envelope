import React from 'react'
import styled from 'styled-components'
import Person from '@material-ui/icons/Person'
import emailData from '../data/emailData'
import SubPassword from '../components/SubPassword';
import useState from 'react';
import { Switch } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';


function SingleEmail(props) {
    console.log(props)
    let SubPassword = sessionStorage.getItem('subpassword')
    const [showSubPassword, setShowSubPassword] = useState(false)
    const [checked,setChecked] = useState(false)
    console.log(checked)
    const subPassword = () =>{
      if (checked === false)
      {
        localStorage.setItem('SubPassword', true)
        setChecked(true)
      }
      else 
      {
        localStorage.setItem('SubPassword', false)
        setChecked(false); }}
    // emailData.map(({id, starred, from, subject, message, received, read})=>{
    //     if (id == props.id){
    //         console.log(id,props.id)
    //         return (<div>{id}</div>)
    //     }
    // })

return (
    <>
    <TopWrapper className='d-flex flex-row justify-content-start align-items-center'>
        <LockIcon onClick={() => (setShowSubPassword(showSubPassword ? false : true))} />
         { showSubPassword ? <div><Switch checked={checked} onChange={subPassword} /> 
        <input className='form-control w-50 d-inline' placeholder='Sub Password' type="password" maxLength='2' /></div> : null }
      </TopWrapper>
    {emailData.map(({id, from, subject, body, createdAt})=>{
        if (id == props.id){ 
            return(
    <Wrapper key={id} className='d-flex flex-column container '>
        <Subject className='mx-5 my-3'>{subject}</Subject>
        <ImageAddressWrapper className='d-flex flex-row mx-1'>
        <Person/>
        <AddressTimeWrapper className='d-flex flex-column mx-3'>
            <AddressID>{from}</AddressID>
            <DateTime>{createdAt}</DateTime>
        </AddressTimeWrapper>
        </ImageAddressWrapper>
        <MessegeWrapper className="d-flex flex-column mx-5 my-3">
            <Messege>{body}</Messege>
        <AttachmentWrapper></AttachmentWrapper>
        </MessegeWrapper>
    </Wrapper>)
     }
    }) }
    </>
  )
        }

export default SingleEmail

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
    padding: 10px 20px;
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