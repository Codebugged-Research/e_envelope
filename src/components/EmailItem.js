import React, { useState } from 'react'
import styled from 'styled-components'
import PersonIcon from '@material-ui/icons/Person';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import axios from 'axios';

const EmailItem = ({id,  from, subject, body, createdAt}) => {
    createdAt = new Date(createdAt).toLocaleString()
    createdAt = createdAt.substr(0,8)
    const token = sessionStorage.getItem('token')
    const handleClick = async (e, data) => {
        console.log(data.label, data.id);
        let newMail = {
            lable: data.label,
        }
        await axios.put(axios.defaults.baseURL + `api/mail/${data.id}`, newMail, {
            "headers": {
                "x-access-token": token
            }
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
      }
    return (
        <>
    <ContextMenuTrigger id={id}>
        <Wrapper>
        <Link to={`/email/${id}`} className="main-msg d-flex flex-row text-white text-decoration-none">
            <p className={ 'text-truncate w-25 unread'}>{from}</p>
            <div className="d-flex flex-column w-25 ms-2 subject-msg">
            <p className={'unread text-truncate w-25'}>{subject}</p> 
            <p className={'unread text-truncate w-25'}>{body}</p> 
            </div>
            <p className={'unread'}>{createdAt}</p>
        </Link>
        </Wrapper>

      </ContextMenuTrigger>
        <ContextMenu id={id}>
        <MenuItem className="menu-item" data={{label:'inbox', id:id}} onClick={handleClick}>
          Move to Inbox
        </MenuItem>
        <MenuItem className="menu-item" data={{label:'trash', id:id}} onClick={handleClick}>
          Move to Trash
        </MenuItem>
        <MenuItem className="menu-item" data={{label:'stared', id:id}} onClick={handleClick}>
        Move to Starred
        </MenuItem>
        <MenuItem divider />
        <MenuItem className="menu-item" data={{label:'spam', id:id}} onClick={handleClick}>
        Move to Spam
        </MenuItem>
      </ContextMenu>
        </>
    )
}

export default EmailItem

const Wrapper = styled.div`
    padding-left: 5px;
    height:10vh;
    border-bottom: 1px solid lightgray;
    display: flex;
    flex-direction:row;
    background: linear-gradient(195deg,rgb(221 221 221),rgb(221 221 221));
    color:white !important;
    border-radius:0.25rem;
    margin-top:5px;
    cursor: pointer;
    padding-right: 5px;
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
        flex:1;
        max-width: 80vw;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: center;
            justify-content: space-evenly;
            align-items: center;
        .subject-msg{
        align-items: flex-start;
        }
    }
    .unread{
        color: black;
        font-weight: bolder;
    }
`