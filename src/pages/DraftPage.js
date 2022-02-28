import React from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DraftPage() {
  const navigate = useNavigate();
  const [user,setUser] = useState({});
  const [messeges,setMesseges] = useState([]);
  useEffect(() => {
      data();
  }, []);
  const data = async () => {
      const res = JSON.parse(sessionStorage.getItem('user'))
      setUser(res);
      if(!res){
        navigate('/')
      }
      const token = await sessionStorage.getItem('token')
      // for draft new api for {from:email, lable:'draft' }
      const messege = await axios.get(axios.defaults.baseURL+`api/mail/user/${res.email}/label/draft`, {"headers":{ 
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

export default DraftPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

