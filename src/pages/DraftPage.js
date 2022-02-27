import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function DraftPage() {
  return (<>
    <Header/>
    <Wrapper>
      <SidePanel/>
      <EmailView/>
    </Wrapper>
    </>
  )
}

export default DraftPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

