import {React, useState} from 'react'
import styled from 'styled-components';
import DraftItem from './DraftItem';
import SubPassword from './SubPassword';
import { Switch } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { createGlobalStyle } from 'styled-components';
import sidebarItems from '../data/sidebarItems'
import CreateIcon from '@material-ui/icons/Create';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import ImageIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ArticleIcon from '@material-ui/icons/FileCopy';
import AudioFileIcon from '@material-ui/icons/Audiotrack';
import Attachment from '@material-ui/icons/Attachment';
import Close from '@material-ui/icons/Close';
import { Button, Modal, ProgressBar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SendMail from './SendMail';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF", "PDF", "MP3", "MP4", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "TXT", "ZIP", "RAR"];

const DraftView = (props) => {
  if( new Date().getTime() - sessionStorage.getItem('time') > 150000 ){
    sessionStorage.setItem('SubPassword', false)
  }
  const [showCompose, setShowCompose] = useState(false);
  const navigate = useNavigate();
  const [showSubPassword, setShowSubPassword] = useState(false)
  const [checked,setChecked] = useState(JSON.parse(sessionStorage.getItem('SubPassword')))
  const [SubPassword,setSubPassword] = useState('')
  const [progress, setProgress] = useState();
  const [lgShow, setLgShow] = useState(false);
  const [attachments, setAttachmeny] = useState([]);
  const messeges = props.messeges.data
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('token');
    function showComposeOnClick() {
        if (showCompose === true) {
            setShowCompose(false);
        }
        else
            setShowCompose(true);

    }

    const [mail, setMail] = useState({
        recipient: '',
        subject: '',
        messege: '',
    })

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setMail({ ...mail, [name]: value })
    }
    const sendMail = async (e) => {
        e.preventDefault();
        let newMail = {
            id:mail.id,
            to: mail.recipient,
            from: user.email,
            subject: mail.subject,
            body: mail.messege,
            attachments: attachments,
            lable: 'inbox',
            isSent: true
        }
        await axios.post(axios.defaults.baseURL + 'api/mail/', newMail, {
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
        }).catch(err => console.log(err))
    }


  const uploadUrl = axios.defaults.baseURL + 'api/upload/uploadfile';
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
  const subPassword = async () =>{
    if (checked === false)
    {
      const user = JSON.parse(sessionStorage.getItem('user'))
      const token = sessionStorage.getItem('token')
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
    const handleClick = (event, {_id,to,subject,body})=>{
        console.log(_id,to,subject,body)
        setShowCompose(true);
        setMail({
            id:_id,
          recipient: to,
          subject: subject,
          messege: body,
      })
    }
  return (

    <Wrapper>
      <TopWrapper className='d-flex flex-row justify-content-start align-items-center'>
        <LockIcon onClick={() => (setShowSubPassword(showSubPassword ? false : true))} />
         { showSubPassword ? <div><Switch checked={checked} onChange={subPassword} /> 
        <input className='form-control w-50 d-inline' placeholder='Sub Password' 
        value={SubPassword} onChange={(e)=> setSubPassword(e.target.value)}
        type="password" maxLength='2' /></div> : null }
      </TopWrapper>
        <EmailsContainer>
                {
                  messeges?
                    messeges.map(({_id,  to, subject, body, createdAt})=>(
                        <DraftItem
                            onClick={event => { handleClick(event, {_id,to,subject,body})} }
                            key={_id}
                            id={_id}
                            to={ checked ? to : '#'.repeat(to.length) }
                            subject={ checked ? subject : '#'.repeat(subject.length)}
                            body={ checked ? body : '#'.repeat(body.length)}
                            createdAt={createdAt}
                        />
                    )):null
                }
                {showCompose ? <SendMailWrapper className='send-mail-wrapper container d-flex flex-column p-0'>
                <SendMailHeader className='bg-dark text-white p-1 d-flex flex-row justify-content-between align-items-center'>
                    <Heading className='mx-2 my-1'>Confidential</Heading>
                    <div className='mx-2 my-1' onClick={showComposeOnClick}> <Close /> </div>
                </SendMailHeader>
                <form onSubmit={sendMail} className='d-flex flex-column shadow justify-content-center align-items-start'>
                    <ToSubjectWrapper className='w-100'>
                        <input type='text' onChange={handleInput} value={mail.recipient} placeholder='To' name='recipient' className='form-control' />
                        <input type='text' onChange={handleInput} value={mail.subject} placeholder='Subject' name='subject' className='form-control' />
                    </ToSubjectWrapper>
                    <MessegeWrapper className='w-100'>
                        <textarea onChange={handleInput} value={mail.messege} placeholder='Messege' name='messege' className='form-control' />
                    </MessegeWrapper>
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
                                    <Card variant="outlined"><a target="_blank" href={item.fileUrl} className="p-3"> {getAttachmentIcon(item.fileType)} </a></Card>
                                </div>
                            </div>
                        ))}
                    </div>
                    <SendButtonWrapper>
                        <SendMailButton type="submit" className='btn-primary me-3'>Envelope &amp; Send</SendMailButton>
                        <InsertPhoto className="text-muted me-1" onClick={() => setLgShow(true)} />
                        <Attachment className="text-muted mx-1" onClick={() => setLgShow(true)} />
                    </SendButtonWrapper>
                </form>
            </SendMailWrapper> : null}
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
            </EmailsContainer>
    </Wrapper>
  )
}

export default DraftView

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
const SendMailHeader = styled.div`
    border-radius: 0.7rem 0.7rem 0 0;
@media (max-width: 767.98px) {
    border-radius: 0;

}
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