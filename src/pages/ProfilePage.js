import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import ProfileView from '../components/ProfileView';
import Header from '../components/Header';


function ProfilePage() {
  if( new Date().getTime() - sessionStorage.getItem('time') > 150000 ){
    sessionStorage.setItem('SubPassword', false)
  }
  return (<>
    <Header/>
    <Wrapper>
      <SidePanel/>
      <ProfileView/>
    </Wrapper>
    </>
  )
}

export default ProfilePage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

