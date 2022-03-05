import {React, useState} from 'react'
import styled from 'styled-components';
import { Switch } from '@material-ui/core';
import emailData  from '../data/emailData';
import SendItem from './SendItem';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';

const SendView = (props) => {
  const messeges = props.messeges.data
  let SubPassword = sessionStorage.getItem('subpassword')
  const [showSubPassword, setShowSubPassword] = useState(false)
  const [checked,setChecked] = useState(JSON.parse(sessionStorage.getItem('SubPassword')))
  const user = JSON.parse(sessionStorage.getItem('user'))
  const token = sessionStorage.getItem('token')
  const subPassword = async () =>{
    if (checked === false)
    {
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
    
  return (
    <Wrapper>
      <TopWrapper className='d-flex flex-row justify-content-start align-items-center'>
        <LockIcon onClick={() => (setShowSubPassword(showSubPassword ? false : true))} />
         { showSubPassword ? <div><Switch checked={checked} onChange={subPassword} /> 
        <input className='form-control w-50 d-inline' placeholder='Sub Password' type="password" maxLength='2' /></div> : null }
      </TopWrapper>
        <EmailsContainer>
                {
                  messeges?
                    messeges.map(({_id, to, from, subject, body, createdAt})=>(
                        <SendItem 
                            key={_id}
                            id={_id}
                            to={ checked ? to : '#'.repeat(to.length)}
                            subject={ checked ? subject : '#'.repeat(subject.length)}
                            body={ checked ? body : '#'.repeat(body.length)}
                            createdAt={createdAt}
                        />
                        
                    )):null
                }
            </EmailsContainer>
    </Wrapper>
  )
}

export default SendView

const Wrapper = styled.div`
    height:  calc( 100vh - 70px );
    display:flex;
    flex-direction:column;
    width:80vw;
    background-color:white;
    border-left:3px solid white;
    `

const TopWrapper = styled.div`
    font-size:16px;
    padding: 10px 20px;
    background-color:#e3e3e3a1;
    border-radius:0.5rem;
`

const EmailsContainer = styled.div`
margin: 0px 10px 10px 10px;
`