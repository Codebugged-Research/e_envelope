import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import ProfileView from '../components/ProfileView';
import Header from '../components/Header';


function ProfilePage() {
  let timer = JSON.parse(JSON.parse(sessionStorage.getItem('user')).timmer)

  if( new Date().getTime() - sessionStorage.getItem('time') > timer*60*1000){
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

