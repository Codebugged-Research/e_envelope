import {React, useState} from 'react'
import styled from 'styled-components';
import { Switch } from '@material-ui/core';
import emailData  from '../data/emailData';
import EmailItem from './EmailItem';
import LockIcon from '@material-ui/icons/Lock';

const EmailView = (props) => {
  const messeges = props.messeges.data
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
                  messeges?
                    messeges.map(({_id,  from, subject, body, createdAt})=>(
                        <EmailItem 
                            key={_id}
                            id={_id}
                            from={ from }
                            subject={subject}
                            body={body}
                            createdAt={createdAt}
                        />
                        
                    )):null
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