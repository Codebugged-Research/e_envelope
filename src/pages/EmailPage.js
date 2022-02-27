import {React} from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import Header from '../components/Header';
import SingleEmail from '../components/SingleEmail';
import {useLocation, useParams} from "react-router-dom";
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function EmailPage() {
  let params = useParams();
  return (
  <>
    <Header/>
    <Wrapper>
        <SidePanel/>
        <SingleEmail id={params.id} />
    </Wrapper>
    </>
  )
}

export default EmailPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

