import {React} from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import Header from '../components/Header';
import SingleSentEmail from '../components/SingleSentEmail';
import { useParams} from "react-router-dom";

function SentEmailPage() {
  if( new Date().getTime() - sessionStorage.getItem('time') > 150000 ){
    sessionStorage.setItem('SubPassword', false)
  }
  let params = useParams();
  return (
  <>
    <Header/>
    <Wrapper>
        <SidePanel/>
        <SingleSentEmail id={params.id} />
    </Wrapper>
    </>
  )
}

export default SentEmailPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

