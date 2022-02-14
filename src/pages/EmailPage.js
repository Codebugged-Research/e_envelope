import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import Header from '../components/Header';
import SingleEmail from '../components/SingleEmail';

function InboxPage() {
  return (
  <>
    <Header/>
    <Wrapper>
        <SidePanel/>
        <SingleEmail/>
    </Wrapper>
    </>
  )
}

export default InboxPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

