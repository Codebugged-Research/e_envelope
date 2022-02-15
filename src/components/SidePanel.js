import {React, useState} from 'react'
import styled from 'styled-components'
import sidebarItems from '../data/sidebarItems'
import CreateIcon from '@material-ui/icons/Create';
// import SendMail from './SendMail';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import Attachment from '@material-ui/icons/Attachment';
import Close from '@material-ui/icons/Close';
import { Button } from 'react-bootstrap';



function SidePanel() {

const [showCompose, setShowCompose] = useState(false);
    function showComposeOnClick () {
        if (showCompose === true)
        setShowCompose(false);
        else
        setShowCompose(true);
    }
    
    return (
    <>
    <Wrapper className='text-white'>
    <MainWrapper>
        <ComposeLetter onClick={showComposeOnClick}>
            <CreateIcon/>
            Compose 
        </ComposeLetter>
        <SidebarButtonWrapper>
            {sidebarItems.map(item => (
                <SidebarButtonItem>
                    <div className='sideBarIcon'>{item.icon}</div>
                    <div className='sideBarText'>{item.text}</div>
                </SidebarButtonItem>
            ))}
        </SidebarButtonWrapper>
    </MainWrapper>
    </Wrapper>
    {showCompose ? <SendMailWrapper className='container d-flex flex-column p-0'>
        <SendMailHeader className='bg-dark text-white p-1 d-flex flex-row justify-content-between align-items-center'>
            <Heading className='mx-2 my-1'>New Messege</Heading>
            <div className='mx-2 my-1' onClick={showComposeOnClick}> <Close /> </div>
        </SendMailHeader>
        <form className='d-flex flex-column shadow justify-content-center align-items-start'>
            <ToSubjectWrapper className='w-100'>
                <input type='email' placeholder='To' name='recipient' className='form-control' />
                <input type='text' placeholder='Subject' name='subject' className='form-control' />
            </ToSubjectWrapper>
            <MessegeWrapper className='w-100'>
                <textarea  placeholder='Messege' name='messege' className='form-control' />
            </MessegeWrapper>

            <SendButtonWrapper>
                <SendMailButton className='btn-primary me-3'>Envelope & Send</SendMailButton>
                <InsertPhoto className="text-muted me-1" />
                <Attachment className="text-muted mx-1" />
            </SendButtonWrapper>
        </form>
    </SendMailWrapper> : null}
    </>
  )
}


export default SidePanel 

const Wrapper = styled.div`
    height:  calc( 100vh - 70px );
    display:flex;
    flex-direction:column;
    width:20%;
    border-left:1px solid darkgray;
    `

const ComposeLetter = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin:10px 10px;
    font-size:18px;
    padding:10px 10px;
    background:linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));
    border-radius:0.5rem;
    color:white;
    font-size:900;
    cursor:pointer;
    transition: all 150ms ease-in 0s;
    .MuiSvgIcon-root{
        margin:0px 10px;
    }

    :hover{
        font-size:18px;
        background-color:white;
        border-radius:0.5rem;
        color:white;
    box-shadow: rgb(26 115 232 / 40%) 0rem 0.875rem 1.625rem -0.75rem, rgb(26 115 232 / 15%) 0rem 0.25rem 1.4375rem 0rem, rgb(26 115 232 / 20%) 0rem 0.5rem 0.625rem -0.3125rem;

    }
`

const SidebarButtonWrapper = styled.div`
display:flex;
    flex-direction:column;
    justify-content:center;
`

const SidebarButtonItem = styled.div`
cursor:pointer;
    display:flex;
    flex-direction:row;
    margin:10px 10px;
    font-size:18px;
    border-radius:0.5rem;
    padding:5px 10px;
    transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    .MuiSvgIcon-root{
        margin:0px 10px;
    }
    :hover{
        background-color: rgba(255, 255, 255, 0.2);
        color:white;
        padding:7px 0px;
        border-radius: 0.5rem;
        box-shadow: 0 0.5rem 3rem rgba(255,255,255,.175)!important;
    }
`

const MainWrapper = styled.div`
background:linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
    height:100%;
    border-radius:1rem;
    margin:0.5rem;
// background-color:white;
`

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
    div{
        cursor:pointer;
    }
`
const Heading = styled.h6``
const MessegeWrapper = styled.div`
    flex:auto;
    textarea{       
`

const SendMailButton = styled(Button)`
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