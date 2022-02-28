import React, { useState } from 'react'
import styled from 'styled-components'
import PersonIcon from '@material-ui/icons/Person';
// import { Checkbox } from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

// const EmailItem = ({ id,starred, from, subject, message, received, read }) => {
const SendItem = ({id, to, subject, body, createdAt}) => {

    // const [ star, setStar ] = useState(starred);

    return (
        <Wrapper>
            <div>
            {/* <IconButton onClick={()=> star ? setStar(false) : setStar(true)}>
                {   star ? (
                    <StarIcon htmlColor='#fff' />
                    ) : (
                        <StarBorderIcon htmlColor='#fff' />
                    )
                }
            </IconButton> */}
            </div>
        <Link to={`/email/${id}`} className="main-msg d-flex flex-row flex-wrap text-white text-decoration-none">
            <p className={ 'text-truncate w-25 unread'}>{to}</p>
            <div className="d-flex flex-column mx-3 w-25  subject-msg">
            <p className='unread'>{subject.substring(0,5)+'...'}</p> 
            <p className={'unread'}>{body.substring(0,5)+'...'}</p> 
            </div>
            <p className={'unread'}>{createdAt.substring(11,16)}</p>
        </Link>
        </Wrapper>
    )
}

export default SendItem

const Wrapper = styled.div`
    padding-left: 20px;
    height:10vh;
    border-bottom: 1px solid lightgray;
    display: flex;
    flex-direction:row;
    background: linear-gradient(195deg,rgb(221 221 221),rgb(221 221 221));
    color:white !important;
    border-radius:0.25rem;
    margin-top:5px;
    cursor: pointer;
    padding-right: 20px;
    div {
        display: flex;

        span {
            color: white;
        }
    }
    @media (max-width: 767.98px)  { 
    height:15vh;
    }
    .main-msg{
        flex:2;
        justify-content: space-between;
        align-items: center;
        .subject-msg{
            flex: 2;
        align-items: flex-start;
    }
        @media (max-width: 767.98px)  { 
        .subject-msg{
            flex: 1;
        }
    }
    }
    .unread{
        color: black;
        font-weight: bolder;
    }
`