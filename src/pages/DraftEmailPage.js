import {React} from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import Header from '../components/Header';
import DraftSinglePage from '../components/DraftSinglePage';
import { useParams} from "react-router-dom";

function DraftEmailPage() {
  if( new Date().getTime() - sessionStorage.getItem('time') > 150000 ){
    sessionStorage.setItem('SubPassword', false)
  }
  let params = useParams();
  return (
  <>
    <Header/>
    <Wrapper>
        <SidePanel/>
        <DraftSinglePage id={params.id} />
    </Wrapper>
    </>
  )
}

export default DraftEmailPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

