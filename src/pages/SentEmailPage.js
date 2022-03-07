import {React} from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import Header from '../components/Header';
import SingleSentEmail from '../components/SingleSentEmail';
import { useParams} from "react-router-dom";

function SentEmailPage() {
  let timer = JSON.parse(JSON.parse(sessionStorage.getItem('user')).timmer)

  if( new Date().getTime() - sessionStorage.getItem('time') > timer*60*1000){
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

