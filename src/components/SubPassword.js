import React from 'react'
import { Switch } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { useState } from 'react';
import styled from 'styled-components';


function SubPassword() {

    const [showSubPassword, setShowSubPassword] = useState(false)
  const [checked,setChecked] = useState(false)
  console.log(checked)
  const subPassword = () =>{
    if (checked === false)
    {
      localStorage.setItem('SubPassword', true)
      setChecked(true)
    }
    else 
    {
      localStorage.setItem('SubPassword', false)
      setChecked(false)
    } 
    
    }
  return (
    <TopWrapper className='d-flex flex-row justify-content-start align-items-center'>
        <LockIcon onClick={() => (setShowSubPassword(showSubPassword ? false : true))} />
         { showSubPassword ? <div><Switch checked={checked} onChange={subPassword} /> 
        <input className='form-control w-50 d-inline' placeholder='Sub Password' type="password" maxLength='2' /></div> : null }
      </TopWrapper>
  )
}


const TopWrapper = styled.div`
    font-size:16px;
    padding: 10px 20px;
    background-color:#e3e3e3a1;
    border-radius:0.5rem;
`

export default SubPassword