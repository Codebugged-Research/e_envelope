import React from 'react'
import styled from 'styled-components';
import { Switch } from '@material-ui/core';
import emailData  from '../data/emailData';
import EmailItem from './EmailItem';

const EmailView = () => {
  return (
    <Wrapper>
      <TopWrapper>
        <Switch /> SUB PASSWORD FIELD 
        </TopWrapper>
        <EmailsContainer>
                {
                    emailData.map(({starred, from, subject, message, received, read})=>(
                        <EmailItem
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
    background-color:lightgray;
`

const EmailsContainer = styled.div`
margin: 0px 10px 10px 10px;
`