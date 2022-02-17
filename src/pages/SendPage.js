import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';


function SendPage() {
  return (<>
    <Header/>
    <Wrapper>
      <SidePanel/>
      <EmailView/>
    </Wrapper>
    </>
  )
}

export default SendPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

