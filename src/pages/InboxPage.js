import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SidePanel from '../components/SidePanel';
import EmailView from '../components/EmailView';
import Header from '../components/Header';
import axios from 'axios';


function InboxPage() {
  const navigate = useNavigate();
  const [user,setUser] = useState({});
  const [messeges,setMesseges] = useState([]);
  useEffect(() => {
      data();
  }, [])
  const data = async () => {
      const res = JSON.parse(sessionStorage.getItem('user'))
      setUser(res);
      if(!res){
        navigate('/')
      }
      const token = await sessionStorage.getItem('token')
      console.log(axios.defaults.baseURL+`api/mail/sender/${res._id}`)
        const messege = await axios.get(axios.defaults.baseURL+`api/mail/sender/${res._id}`, {"headers":{ 
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

export default InboxPage

const Wrapper = styled.div`
display:flex;
flex-direction:row;`

