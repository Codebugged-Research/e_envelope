import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';
import axios from 'axios';


function OutboxPage() {
  if( new Date().getTime() - sessionStorage.getItem('time') > 150000 ){
    sessionStorage.setItem('SubPassword', false)
  }
  const [messeges,setMesseges] = useState([]);
  useEffect(() => {
      data();
  }, [])
  const data = async () => {
      const res = JSON.parse(sessionStorage.getItem('user'))
      const token = await sessionStorage.getItem('token')
      console.log(axios.defaults.baseURL+`api/mail/sender/${res.email}`)
        const messege = await axios.post(axios.defaults.baseURL+`api/mail/user/label`,{"id": res.email, "label": "outbox"}, {"headers":{ 
          "x-access-token": token,
        }
      })
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

export default OutboxPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

