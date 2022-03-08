import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';
import axios from 'axios';
import SendView from '../components/SendView';

function OutboxPage() {
  let timer = JSON.parse(JSON.parse(sessionStorage.getItem('user')).timmer)

  if (new Date().getTime() - sessionStorage.getItem('time') > timer * 60 * 1000) {
    sessionStorage.setItem('SubPassword', false)
  }
  const [messeges, setMesseges] = useState([]);
  useEffect(() => {
    data();
  }, [])
  const data = async () => {
    const res = JSON.parse(sessionStorage.getItem('user'))
    const token = sessionStorage.getItem('token')

    const messege = await axios.post(axios.defaults.baseURL + `api/mail/outbox/`, { "id": res.email }, {
      "headers": {
        "x-access-token": token,
      }
    })
    console.log(messege)
    setMesseges(messege)
  }


  return (<>
    <Header />
    <Wrapper>
      <SidePanel />
      <SendView messeges={messeges} />
    </Wrapper>
  </>
  )
}

export default OutboxPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

