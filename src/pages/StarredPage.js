import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';

function StarredPage() {
  let timer = JSON.parse(JSON.parse(sessionStorage.getItem('user')).timmer)

  if( new Date().getTime() - sessionStorage.getItem('time') > timer*60*1000){
    sessionStorage.setItem('SubPassword', false)
  }
  const [messeges,setMesseges] = useState([]);
  useEffect(() => {
      data();
  }, []);
  const data = async () => {
      const res = JSON.parse(sessionStorage.getItem('user'))

      const token = await sessionStorage.getItem('token') 
        const messege = await axios.post(axios.defaults.baseURL+`api/mail/user/label`,{"id": res.email, "label": "stared"}, {"headers":{ 
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

