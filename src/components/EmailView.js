import {React, useState} from 'react'
import styled from 'styled-components';
import { Switch } from '@material-ui/core';
import emailData  from '../data/emailData';
import EmailItem from './EmailItem';
import LockIcon from '@material-ui/icons/Lock';
const EmailView = () => {

  const [showSubPassword, setShowSubPassword] = useState(false)
  const [checked,setChecked] = useState(false)
  const subPassword = () =>{
    if (checked === false)
    {
      localStorage.setItem('SubPassword', true)
      setChecked(true)
    }
    else 
    {
      localStorage.setItem('SubPassword', false)
      setChecked(false)
    } 
    
    }
  return (
    <Wrapper>
      <TopWrapper className='d-flex flex-row justify-content-start align-items-center'>
        <LockIcon onClick={() => (setShowSubPassword(showSubPassword ? false : true))} /> { showSubPassword ? <div><Switch checked={checked} onChange={subPassword} /> 
        <input className='form-control w-50 d-inline' placeholder='Sub Password' type="password" maxLength='2' /></div> : null }
      </TopWrapper>
        <EmailsContainer>
                {
                    emailData.map(({id, starred, from, subject, message, received, read})=>(
                        <EmailItem 
                          key={id}
                            id={id}
                            starred={starred}
                            from={from}
                            subject={subject}
                            message={message}
                            received={received}
                            read={read}
                        />
                        
                    ))
                }
            </EmailsContainer>
    </Wrapper>
  )
}

export default EmailView

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