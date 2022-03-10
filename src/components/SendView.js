import {React, useState} from 'react'
import styled from 'styled-components';
import { Switch } from '@material-ui/core';
import emailData  from '../data/emailData';
import SendItem from './SendItem';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { green } from '@material-ui/core/colors';
import { withStyles, makeStyles } from "@material-ui/core/styles";

const SendView = (props) => {
  const messeges = props.messeges.data
  const [showSubPassword, setShowSubPassword] = useState(false)
  const [checked,setChecked] = useState(JSON.parse(sessionStorage.getItem('SubPassword')))
  const [SubPassword,setSubPassword] = useState('')
  const user = JSON.parse(sessionStorage.getItem('user'))
  const token = sessionStorage.getItem('token')
  const subPassword = async () =>{
    if (checked === false)
    {
      const user = JSON.parse(sessionStorage.getItem('user'))
      const token = sessionStorage.getItem('token')
      const data = {
        _id:user._id, 
        subpassword:SubPassword,
      }
      await axios.post(axios.defaults.baseURL+`api/auth/chkSubPassword/`, data, {"headers":{ 
        "x-access-token": token,
      }
    }).then(res=> {
        sessionStorage.setItem('SubPassword', true)
        sessionStorage.setItem('time', new Date().getTime())
        setChecked(true)}).catch(err=> console.log(err))
    }
    else 
    {
      sessionStorage.setItem('SubPassword', false)
      setChecked(false)
    } 
    }
    const useStyles = makeStyles({
      switchBase: {
        "&$checked": {
          color: green[500]
        },
        "&$checked + $track": {
          backgroundColor: green[500]
        }
      },
      checked: {},
      track: {}
    });
    const classes = useStyles();
  return (
    <Wrapper> { !checked ?<Alert className='p-2 my-0' variant={'primary'}>To Access Content, Enter Sub Password</Alert>:''}
      <TopWrapper className='d-flex flex-row justify-content-start align-items-center'>
        <LockIcon onClick={() => (setShowSubPassword(showSubPassword ? false : true))} />
         { showSubPassword ? <div> 
           <Switch
            checked={checked}
            onChange={subPassword}
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked
            }}
          />
        <input autoComplete="new-password" className='form-control w-50 d-inline' placeholder='Sub Password' 
        value={SubPassword} onChange={(e)=> setSubPassword(e.target.value)}
        type="password" name="subpassword" maxLength='2' /></div> : null }
      </TopWrapper>
        <EmailsContainer>
                {
                  messeges?
                    messeges.map(({_id, to, from, subject, body, createdAt})=>(
                        <SendItem 
                            key={_id}
                            id={_id}
                            to={ checked ? to : '#'.repeat(5)+'EE.com'}
                            subject={ checked ? subject : '#'.repeat(subject.length)}
                            body={ checked ? body : '#'.repeat(body.length)}
                            createdAt={createdAt}
                        />
                        
                    )):null
                }
            </EmailsContainer>
    </Wrapper>
  )
}

export default SendView

const Wrapper = styled.div`
    height:  calc( 100vh - 70px );
    display:flex;
    flex-direction:column;
    width:80vw;
    background-color:white;
    border-left:3px solid white;
    `

const TopWrapper = styled.div`
    font-size:16px;
    padding: 10px 20px;
    background-color:#e3e3e3a1;
    border-radius:0.5rem;
`

const EmailsContainer = styled.div`
margin: 0px 10px 10px 10px;
`