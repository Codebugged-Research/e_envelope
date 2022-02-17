import React, { useState } from 'react'
import styled from 'styled-components'
import PersonIcon from '@material-ui/icons/Person';
// import { Checkbox } from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';

const EmailItem = ({ starred, from, subject, message, received, read }) => {

    const [ star, setStar ] = useState(starred);

    return (
        <Wrapper>
            <PersonIcon htmlColor='#fff' />
            <IconButton onClick={()=> star ? setStar(false) : setStar(true)}>
                {   star ? (
                        <StarIcon htmlColor='#fff' />
                    ) : (
                        <StarBorderIcon htmlColor='#fff' />
                    )
                }
            </IconButton>
            <p className={ !read && 'unread'}>{from}</p>
            <div>
                <p className={!read && 'unread'}>{subject}</p> - <span>{message}</span>
            </div>
            <p className={!read && 'unread'}>{received}</p>
        </Wrapper>
    )
}

export default EmailItem

const Wrapper = styled.div`
    padding-left: 20px;
    border-bottom: 1px solid lightgray;
    display: grid;
    grid-template-columns: min-content min-content 120px auto min-content;
    align-items: center;
    background:linear-gradient(195deg,rgb(131 131 134),rgb(84 84 84));

    color:white !important;
    border-radius:1rem;
    margin-top:5px;
    cursor: pointer;
    padding-right: 20px;
    div {
        display: flex;

        span {
            color: white;
        }
    }

    .unread{
        color: black;
        font-weight: bolder;
    }
`