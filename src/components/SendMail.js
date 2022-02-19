import {React, useState} from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import Attachment from '@material-ui/icons/Attachment';
import Close from '@material-ui/icons/Close';
import { useForm } from "react-hook-form";

function SendMail() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const OnSubmitMail = data => console.log(data);
  return (
    <>
    <SendMailWrapper className='container d-flex flex-column p-0'>
        <SendMailHeader className='bg-dark text-white p-1 d-flex flex-row justify-content-between align-items-center'>
            <Heading className='mx-2 my-1'>New Messege</Heading>
            <div className='mx-2 my-1' > <Close/> </div>
        </SendMailHeader>
        <form onSubmit={handleSubmit(OnSubmitMail)} className='d-flex flex-column shadow justify-content-center align-items-start'>
            <ToSubjectWrapper className='w-100'>
                <input {...register('recipient', {required:true})}
                type='email' placeholder='To'
                name='recipient' className='form-control' />
                {errors.recipient && "Recipient is required"}
                <input {...register('subject', {required:true})}
                 type='text' placeholder='Subject'
                name='subject' className='form-control' />
                {errors.subject && "Subject is required"}
            </ToSubjectWrapper>
            <MessegeWrapper className='w-100'>
                <textarea {...register('messege', {required:true})}
                placeholder='Messege' name='messege'
                 className='form-control' />
                {errors.messege && "Messege is required"}

            </MessegeWrapper>

            <SendButtonWrapper>
                <input type="submit" className='me-3' value="Envelope & Send"/>
                <InsertPhoto className="text-muted me-1" />
                <Attachment className="text-muted mx-1" />
            </SendButtonWrapper>
        </form>

        
        </SendMailWrapper>


    </>

  )
}

export default SendMail

const SendMailWrapper = styled.div`
flex:auto;
background-color:white;
z-index: 1000;
position: fixed;
bottom: 0;
right: 2rem;
width:550px;
height:500px;
border-radius: 1rem 1rem 0 0;

    form{
        flex:auto;
        textarea{
        height: 100%;
        border: none;
        resize: none;
        :focus{
            outline:none;
            box-shadow:none;
        }
        }
        input{
            border:none;
            :focus{
                outline:none;
                box-shadow:none;
            }
        }
    }

`
const SendMailHeader = styled.div`
    border-radius: 0.7rem 0.7rem 0 0;
`
const Heading = styled.h6``
const MessegeWrapper = styled.div`
    flex:auto;
    textarea{       
`

const SendMailButton = styled.input`
background:linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));

:hover{
    box-shadow: rgb(26 115 232 / 40%) 0rem 0.875rem 1.625rem -0.75rem, rgb(26 115 232 / 15%) 0rem 0.25rem 1.4375rem 0rem, rgb(26 115 232 / 20%) 0rem 0.5rem 0.625rem -0.3125rem;

}

`

const SendButtonWrapper = styled.div`
padding:1rem;
`

const ToSubjectWrapper = styled.div`
input{
    border-bottom:1px solid lightgray !important;
}
`