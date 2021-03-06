import { React, useState } from 'react'
import styled from 'styled-components';
import EmailItem from './EmailItem';
import SubPassword from './SubPassword';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { Switch } from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import { withStyles, makeStyles } from "@material-ui/core/styles";

const EmailView = (props) => {
  const messeges = props.messeges.data
  const [showSubPassword, setShowSubPassword] = useState(false)
  const [checked, setChecked] = useState(JSON.parse(sessionStorage.getItem('SubPassword')))
  const [SubPassword, setSubPassword] = useState('')

  const subPassword = async () => {
    if (checked === false) {
      const user = JSON.parse(sessionStorage.getItem('user'))
      const token = sessionStorage.getItem('token')
      console.log(user._id, token)
      const data = {
        _id: user._id,
        subpassword: SubPassword,
      }
      await axios.post(axios.defaults.baseURL + `api/auth/chkSubPassword/`, data, {
        "headers": {
          "x-access-token": token,
        }
      }).then(res => {
        sessionStorage.setItem('SubPassword', true)
        sessionStorage.setItem('time', new Date().getTime())
        setChecked(true)
      }).catch(err => console.log(err))
    }
    else {
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
    <Wrapper>
      {!checked ? 
      <Alert className='p-2 my-0 sticky-alert' variant={'primary'}>To Access Content, Enter Sub Password</Alert> :
       <Alert className='p-2 my-0 sticky-alert' variant={'success'}>Sub Password Activated!</Alert>}
      <TopWrapper className='d-flex flex-row justify-content-start align-items-center sticky-sub'>
        <LockIcon onClick={() => (setShowSubPassword(showSubPassword ? false : true))} />
        {showSubPassword ? <div>
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
          <input className='form-control w-50 d-inline' autoComplete="new-password" placeholder='Sub Password'
            value={SubPassword} onChange={(e) => setSubPassword(e.target.value)}
            type="password" name="subpassword" maxLength='2' /></div> : null}
      </TopWrapper>
      <EmailsContainer>
        {
          messeges ?
            messeges.map(({ _id, from, subject, body, createdAt }) => (
              <EmailItem
                key={_id}
                id={_id}
                from={checked ? from : '#'.repeat(5) + 'EE.com'}
                subject={checked ? subject : '#'.repeat(subject.length)}
                body={checked ? body : '#'.repeat(body.length)}
                createdAt={createdAt}

              />
            )) : null
        }
      </EmailsContainer>
    </Wrapper>
  )
}

export default EmailView

const Wrapper = styled.div`
    height:  calc( 100vh - 70px );
    display:flex;
    flex-direction:column;
    width:85vw;
    background-color:white;
    border-left:3px solid white;
    `
const TopWrapper = styled.div`
    font-size:16px;
    padding: 10px 20px;
    border-radius:0.5rem;
`

const EmailsContainer = styled.div`
margin: 0px 10px 10px 10px;
`