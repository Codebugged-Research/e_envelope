import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';
import axios from 'axios';
import SubPassword from '../components/SubPassword';


function InboxPage() {
  if (new Date().getTime() - sessionStorage.getItem('time') > 150000) {
    sessionStorage.setItem('SubPassword', false)
  }
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [messeges, setMesseges] = useState([]);
  useEffect(() => {
    data();
  }, [])
  const data = async () => {
    const res = JSON.parse(sessionStorage.getItem('user'))
    setUser(res);
    const token = await sessionStorage.getItem('token')
    const messege = await axios.post(axios.defaults.baseURL + `api/mail/user/label`, { "id": res.email, "label": "inbox" }, {
      "headers": {
        "x-access-token": token,
      }
    })
    // const messege = [{'to':'ashuxldr'}]
    console.log(messege)
    setMesseges(messege)
  }


  return (<>
    <Header />
    <Wrapper>
      <SidePanel />
      <EmailView messeges={messeges} />
    </Wrapper>
  </>
  )
}

export default InboxPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

