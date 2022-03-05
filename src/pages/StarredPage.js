import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';

function StarredPage() {
  if( new Date().getTime() - sessionStorage.getItem('time') > 150000 ){
    sessionStorage.setItem('SubPassword', false)
  }
  const [messeges,setMesseges] = useState([]);
  useEffect(() => {
      data();
  }, []);
  const data = async () => {
      const res = JSON.parse(sessionStorage.getItem('user'))

      const token = await sessionStorage.getItem('token') 
        const messege = await axios.get(axios.defaults.baseURL+`api/mail/user/${res.email}/label/stared`, {"headers":{ 
          "x-access-token": token,
        }
      })
        // const messege = [{'to':'ashuxldr'}]
        console.log(messege)
        setMesseges(messege)
      }
  return (<>
    <Header/>
    <Wrapper>
      <SidePanel/>
      <EmailView messeges={messeges} />
    </Wrapper>
    </>
  )
}

export default StarredPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

