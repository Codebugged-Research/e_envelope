import React from 'react'
import styled from 'styled-components'
import Person from '@material-ui/icons/Person'
import emailData from '../data/emailData'
import SubPassword from '../components/SubPassword';
import { Switch } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import { useEffect,useState } from 'react';
import ImageIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ArticleIcon from '@material-ui/icons/FileCopy';
import AudioFileIcon from '@material-ui/icons/Audiotrack';
import Attachment from '@material-ui/icons/Attachment';
import { Alert, Card } from 'react-bootstrap';
import { green } from '@material-ui/core/colors';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

const SingleEmail = (props) => 
{
    const [showSubPassword, setShowSubPassword] = useState(false)
    const [checked,setChecked] = useState(JSON.parse(sessionStorage.getItem('SubPassword')))
    const [SubPassword,setSubPassword] = useState('')
    const [messeges,setMesseges] = useState({
        from:'',
        subject:'',
        body:'',
        attachments:[],
    })
    const user = JSON.parse(sessionStorage.getItem('user'))
    const token = sessionStorage.getItem('token')
    const getAttachmentIcon = (type) => {
        switch (type) {
            case 'image':
                return <ImageIcon />;
            case 'video':
                return <VideoLibraryIcon />;
            case 'audio':
                return <AudioFileIcon />;
            case 'file':
                return <ArticleIcon />;
            default:
                return <ArticleIcon />;
        }
    }
    const subPassword = async () =>{
    if (checked === false)
    {
    console.log(user._id ,token)
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
    useEffect(() => {
        data();
    }, [])
    const data = async () => {
        const res = JSON.parse(sessionStorage.getItem('user'))
        await axios.get(axios.defaults.baseURL+`api/mail/${props.id}`, {"headers":{ 
            "x-access-token": token,
          }
        }).then(res=>{console.log(res); setMesseges(res.data);
        })
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
    <>
    <div className='d-flex flex-column w-80'>
        { !checked?<Alert className='p-2 my-0' variant={'primary'}>To Access Content, Enter Sub Password</Alert>:''}
    <TopWrapper className='d-flex flex-row justify-content-start align-items-center '>
        <LockIcon onClick={() => (setShowSubPassword(showSubPassword ? false : true))} />
         { showSubPassword ? <div className='p-0' >
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
        type="password" maxLength='2' /></div> : null }
      </TopWrapper>
    <Wrapper key={messeges._id} className='d-flex flex-column mx-3 rounded my-3'>
        <div>
        <Link to='/inbox'><ArrowBackIcon color="action" /></Link>
        <Subject className='mx-5 my-3'>{ checked ? messeges.subject : '#'.repeat(messeges.subject.length) }</Subject>
        </div>
        <ImageAddressWrapper className='d-flex flex-row mx-1'>
        <Person/>
        <AddressTimeWrapper className='d-flex flex-column mx-3'>
            <AddressID>{ checked ? messeges.from : '#'.repeat(5)+'EE.com' }</AddressID>
            <DateTime>{new Date(messeges.createdAt).toLocaleString()}</DateTime>
        </AddressTimeWrapper>
        </ImageAddressWrapper>
        <MessegeWrapper className="d-flex flex-column mx-5 my-3">
            <Messege className='line-break-anywhere' >{ checked ? messeges.body : '#'.repeat(messeges.body.length) }</Messege>
            <hr/>
         {/*show attachments  */}
         <div className='d-flex flex-row justify-content-start-start align-items-center'>
                        <span className='mx-2 my-1'>Attachments</span>
                        <span className='mx-2 my-1'>{messeges.attachments.length}</span>
                    </div>
                    {/* attachments grid */}
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        {messeges.attachments.map((item, index) => (
                            <div key={index} className='d-flex flex-column align-items-center'>
                                <div className='d-flex flex-row align-items-center'>
                                    <Card variant="outlined"><a target={checked ?"_blank":''} href={checked ? item.fileUrl:'#'}  className="p-3"> {getAttachmentIcon(item.fileType)} </a></Card>
                                </div>
                            </div>
                        ))}
                    </div>
        </MessegeWrapper>
    </Wrapper>
    </div>
    </>
  )
}

export default SingleEmail

const Wrapper = styled.div`
    height:  calc( 100vh - 70px );
    width:80%;
    background-color:white;
    align-content: center;
    justify-content: flex-start;
    align-items: flex-start;
    `
    const TopWrapper = styled.div`
    font-size:16px;
    padding: 20px;
    background-color:#e3e3e3a1;
    border-radius:0.5rem;
`
const Subject = styled.h2`
// padding: 15px 30px;
`
const ImageAddressWrapper = styled.div``

const AddressTimeWrapper = styled.div``

const AddressID = styled.div`
font-size:18px;
font-weight:600;`

const DateTime = styled.i`
font-size:12px;
color:gray;`

const MessegeWrapper = styled.div``

const Messege = styled.p`
    text-align:left;
`


const AttachmentWrapper = styled.div``