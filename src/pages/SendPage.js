import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import SendView from '../components/SendView';
import Header from '../components/Header';
import axios from 'axios';


function SendPage() {
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
        const messege = await axios.post(axios.defaults.baseURL+`api/mail/receiver/`, {"from": res.email}, {"headers":{ 
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
      <SendView messeges={messeges} />
    </Wrapper>
    </>
  )
}

export default SendPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

