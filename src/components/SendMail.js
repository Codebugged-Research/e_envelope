import { React, useState } from 'react'
import styled from 'styled-components'
import { Button, Modal, ProgressBar, Card } from 'react-bootstrap';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import ImageIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ArticleIcon from '@material-ui/icons/FileCopy';
import AudioFileIcon from '@material-ui/icons/Audiotrack';
import Attachment from '@material-ui/icons/Attachment';
import Close from '@material-ui/icons/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "GIF", "PDF", "MP3", "MP4", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "TXT", "ZIP", "RAR"];

function SendMail() {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');
    if (!user && !token) {
        navigate('/');
    }

    const [lgShow, setLgShow] = useState(false);

    const [mail, setMail] = useState({
        recipient: '',
        subject: '',
        messege: '',
    })

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setMail({ ...mail, [name]: value })
        console.log(mail)
    }
    const [attachments, setAttachmeny] = useState([]);
    const [progress, setProgress] = useState();
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
        console.log(file);
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
        console.log(res2.data);
        setAttachmeny([...attachments, { fileType: getdataType(file), fileUrl: res2.data }]);
        setLgShow(false);
    };

    return (
        <>
            <SendMailWrapper className='send-mail-wrapper container d-flex flex-column p-0'>
                <SendMailHeader className='bg-dark text-white p-1 d-flex flex-row justify-content-between align-items-center'>
                    <Heading className='mx-2 my-1'>New Messege</Heading>
                    <div className='mx-2 my-1'> <Close /> </div>
                </SendMailHeader>
                <form className='d-flex flex-column shadow justify-content-center align-items-start'>
                    <ToSubjectWrapper className='w-100'>
                        <input onChange={handleInput} type='email' placeholder='To' name='recipient' className='form-control' />
                        <input type='text' onChange={handleInput} placeholder='Subject' name='subject' className='form-control' />
                    </ToSubjectWrapper>
                    <MessegeWrapper className='w-100'>
                        <textarea onChange={handleInput} placeholder='Messege' name='messege' className='form-control' />
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
            </SendMailWrapper>
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