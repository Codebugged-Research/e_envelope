import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';


function ImportantPage() {
  return (<>
    <Header/>
    <Wrapper>
      <SidePanel/>
      <EmailView/>
    </Wrapper>
    </>
  )
}

export default ImportantPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

