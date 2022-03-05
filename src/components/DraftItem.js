import React, { useState } from 'react'
import styled from 'styled-components'
import PersonIcon from '@material-ui/icons/Person';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import axios from 'axios';

const DraftItem = ({id, to, subject, body, createdAt, onClick}) => {
    const token = sessionStorage.getItem('token')
      const handleDraft = ()=>{
        console.log("clicked")
        let draftMail = {
            id:id,
            to:to,
            subject:subject,
            body:body,
        }
        sessionStorage.setItem('mail',JSON.stringify(draftMail));
        sessionStorage.setItem('openPostCard', JSON.parse(sessionStorage.getItem('openPostCard'))? false:true);
        console.log(JSON.parse(sessionStorage.getItem('openPostCard')))
        window.location.reload();
    }
    return (
        <>
        <Wrapper onClick={onClick}>
        <div id={id} className="main-msg d-flex flex-row text-white text-decoration-none">
            <p className={ 'unread'}>{to}</p>
            <div className="d-flex flex-column mx-3 subject-msg">
            <p className={'unread'}>{subject.substring(0,3)+'...'}</p> 
            <p className={'unread'}>{body.substring(0,3)+'...'}</p> 
            </div>
            <p className={'unread'}>{createdAt.substring(11,16)}</p>
        </div>
        </Wrapper>
        </>
    )
}

export default DraftItem

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
    .main-msg{
        flex:2;
        justify-content: space-between;
        align-items: center;
        .subject-msg{
            flex: 2;
        align-items: flex-start;
        }
    }
    .unread{
        color: black;
        font-weight: bolder;
    }
`