import React from 'react'
import styled from 'styled-components'
import Person from '@material-ui/icons/Person'
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
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import CancelIcon from '@material-ui/icons/Cancel';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import { Button, Modal, ProgressBar } from 'react-bootstrap';
const fileTypes = ["JPG", "PNG", "GIF", "PDF", "MP3", "MP4", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "TXT", "ZIP", "RAR"];

const SingleEmail = (props) => 
{
    const navigate = useNavigate();
    const [showReply, setShowReply] = useState(false)
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
    const [lgShow, setLgShow] = useState(false);
    const [attachments, setAttachmeny] = useState([]);
    const [mail, setMail] = useState({
        recipient: '',
        subject: '',
        messege: '',
    })
    const ShowReply = () => {
        setShowReply(true);
        setMail({
            recipient: messeges.from,
            subject: messeges.subject,
            messege: '',
        })
    }
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setMail({ ...mail, [name]: value })
    }
    const sendMail = async (e) => {
        e.preventDefault();
        let newReply = {
            reply: mail.messege,
            from: user.email,
            attachments: attachments,
        }
        console.log(newReply.reply, newReply.attachments)
        if(newReply.reply !=='' || newReply.attachments.length > 0)
            {
        let newMail = messeges
        newMail.reply.push(newReply);
        setMesseges(newMail);
        await axios.put(axios.defaults.baseURL + `api/mail/${props.id}`, newMail, {
            "headers": {
                "x-access-token": token
            }
        }).then(res => {
            console.log(res)
            setMail({
                recipient: '',
                subject: '',
                messege: '',
                attachments: []
            })
            window.location.reload();
        }).catch(err => console.log(err))
            }
        
    }
    const [progress, setProgress] = useState();
    const uploadUrl = axios.defaults.baseURL + 'api/upload/uploadfile';
    const getdataType = (file) => {
        switch (file.type) {
            case 'image/jpeg':
                return 'image';
            case 'image/png':
                return 'image';
            case 'video/mp4':
                return 'video';
            case 'audio/mp3':
                return 'audio';
            case 'application/pdf':
                return 'file';
            default:
                return 'file';
        }
    }
    const handleChange = async (file) => {
        let formData = new FormData();
        formData.append("upload", file);
        var res2 = await axios.post(uploadUrl, formData, {
            headers: {
                "x-access-token": token,
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: data => {
                setProgress(Math.round((100 * data.loaded) / data.total))
            },
        });
        setProgress(0);
        setAttachmeny([...attachments, { fileType: getdataType(file), fileUrl: res2.data }]);
        setLgShow(false);
    };
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
        <button className='btn-sm btn-dark' onClick={ShowReply}>Reply</button>
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
        <MessegeReplyWrapper>
            <h4>REPLIES:</h4>
        {
                  messeges.reply?
                    messeges.reply.map(({reply, from, attachments})=>(
                        <ReplyBox><b>From: {from}</b>
                                <p> Messege: {reply} </p>
                                <div className='d-flex flex-row justify-content-start-start align-items-center'>
                        <span className='my-1'>Attachments:</span><span className='mx-1 my-1'>{attachments.length}</span>
                    </div>
                    {/* attachments grid */}
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        {attachments.map((item, index) => (
                            <div key={index} className='d-flex flex-column align-items-center'>
                                <div className='d-flex flex-row align-items-center'>
                                    <Card variant="outlined"><a target={checked ?"_blank":''} href={checked ? item.fileUrl:'#'}  className="p-3"> {getAttachmentIcon(item.fileType)} </a></Card>
                                </div>
                            </div>
                        ))}
                    </div>
                                </ReplyBox>
                    )):''
                }
        
        </MessegeReplyWrapper>
        {showReply? <div className='d-flex flex-column w-100 '>
    <ReplyWrapper className='d-flex flex-column container w-100 my-3'>
    <ReplySendMailWrapper className='send-mail-wrapper d-flex w-100 flex-column p-0'>
                <ReplySendMailHeader className='bg-dark text-white p-1 d-flex flex-row justify-content-between align-items-center'>
                    <ReplyHeading className='mx-2 my-1'>Reply</ReplyHeading>
                    <CancelIcon onClick={()=> setShowReply(false)} />
                </ReplySendMailHeader>
                <form onSubmit={sendMail} className='d-flex flex-column shadow justify-content-center align-items-start'>
                    <ReplyToSubjectWrapper className='w-100'>
                        <input type='text' onChange={handleInput} disabled value={'To: '+ mail.recipient} placeholder='To' name='recipient' className='form-control' />
                        <input type='text' onChange={handleInput} disabled value={'Subject: '+ mail.subject} placeholder='Subject' name='subject' className='form-control' />
                    </ReplyToSubjectWrapper>
                    <ReplyMessegeWrapper className='w-100'>
                        <textarea onChange={handleInput} value={mail.messege} placeholder='Reply Messege' name='messege' className='form-control' />
                    </ReplyMessegeWrapper>
                    {/*show attachments  */}
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <span className='mx-2 my-1'>Attachments</span>
                        <span className='mx-2 my-1'>{attachments.length}</span>
                    </div>
                    {/* attachments grid */}
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        {attachments.map((item, index) => (
                            <div key={index} className='d-flex flex-column align-items-center'>
                                <div className='d-flex flex-row align-items-center'>
                                    <Card variant="outlined"><a target="_blank" href={
                                        item.fileUrl} className="p-3"> {getAttachmentIcon(item.fileType)} </a></Card>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ReplySendButtonWrapper>
                        <ReplySendMailButton type="submit" className='btn-primary me-3'>Envelope &amp; Send</ReplySendMailButton>
                        <InsertPhoto className="text-muted me-1" onClick={() => setLgShow(true)} />
                        <Attachment className="text-muted mx-1" onClick={() => setLgShow(true)} />
                    </ReplySendButtonWrapper>
                </form>
            </ReplySendMailWrapper>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={lgShow}
                onHide={() => setLgShow(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Attachments
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} /><br></br>
                    {progress > 0.0 ? <ProgressBar animated now={progress} label={`${progress}%`} variant="success" /> : null}<br></br>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setLgShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
    </ReplyWrapper>
    </div> : ''}
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

const ReplyWrapper = styled.div`
    height: 50vh;
    width:80%;
    @media (max-width: 767.98px) {
        width:100%;
    }
        background-color:white;
    align-content: center;
    justify-content: flex-start;
    align-items: flex-start;
    `
    const ReplyTopWrapper = styled.div`
    font-size:16px;
    padding: 20px;
    background-color:#e3e3e3a1;
    border-radius:0.5rem;
`
const ReplySendMailWrapper = styled.div`
flex:auto;
background-color:white;

@media (max-width: 767.98px) {
    border-radius: 0;
    width:100vw !important;
    height:100vh !important;
    max-width:100% !important;
    right: 0;

  }
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
const ReplySendMailHeader = styled.div`
    border-radius: 0.7rem 0.7rem 0 0;
@media (max-width: 767.98px) {
    border-radius: 0;

}
    div{
        cursor:pointer;
    }
`
const ReplyHeading = styled.h6``
const ReplyMessegeWrapper = styled.div`
    flex:auto;   
`

const ReplySendMailButton = styled(Button)`
background:linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));

:hover{
    box-shadow: rgb(26 115 232 / 40%) 0rem 0.875rem 1.625rem -0.75rem, rgb(26 115 232 / 15%) 0rem 0.25rem 1.4375rem 0rem, rgb(26 115 232 / 20%) 0rem 0.5rem 0.625rem -0.3125rem;

}

`

const ReplySendButtonWrapper = styled.div`
padding:1rem;
`

const ReplyToSubjectWrapper = styled.div`
input{
    border-bottom:1px solid lightgray !important;
}
`

const MessegeReplyWrapper = styled.div`
    width:90%;
    `
const ReplyBox = styled.div`
    width:100%;
    background:#e6e6e6;
    padding:0.5rem;
    margin:0.25rem;
    `
