import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import DraftView from '../components/DraftView';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DraftPage() {
  if( new Date().getTime() - sessionStorage.getItem('time') > 150000 ){
    sessionStorage.setItem('SubPassword', false)
  }
  const navigate = useNavigate();
  const [user,setUser] = useState({});
  const [messeges,setMesseges] = useState([]);
  useEffect(() => {
      data();
  }, []);
  const data = async () => {
      const res = JSON.parse(sessionStorage.getItem('user'))
      setUser(res);
      const token = await sessionStorage.getItem('token')
      // for draft new api for {from:email, lable:'draft' }  
      const messege = await axios.post(axios.defaults.baseURL+`api/mail/drafts/`, {'from':res.email} ,{"headers":{ 
        "x-access-token": token,
      }
    })
        setMesseges(messege)
      }
  return (
  <>
    <Header/>
    <Wrapper>
      <SidePanel/>
      <DraftView messeges={messeges} />
    </Wrapper>
  </>
  )
}

export default DraftPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

