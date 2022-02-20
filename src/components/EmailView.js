import {React} from 'react'
import styled from 'styled-components';
import { Switch } from '@material-ui/core';
import emailData  from '../data/emailData';
import EmailItem from './EmailItem';

const EmailView = () => {

  const subPassword = () =>{
    let currValue = localStorage.getItem('SubPassword');
    console.log(currValue)
    if (currValue === 'false' || currValue === 'null'){
      localStorage.setItem('SubPassword', true)
    }
    else{
      localStorage.setItem('SubPassword', false) 
    }

  }
  return (
    <Wrapper>
      <TopWrapper>
        <Switch onClick={subPassword} /> SUB PASSWORD FIELD 
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
    width:80%;
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