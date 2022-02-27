import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Person, Done } from '@material-ui/icons';
import { Button } from 'react-bootstrap';
const ProfileView = () => {

    const UpdateProfile = () => {}

    const [user,setUser] = useState({});
    useEffect(() => {
        data();
        console.log(user)
        
    }, [])
    const data = () => {
        const res = JSON.parse(sessionStorage.getItem('user'))
        setUser(res);
        
        }

  return (
    <Wrapper className='container text-white'>
        <UserImageWrapper className="container d-flex flex-row justify-content-between shadow p-4 my-4">
            <div className='d-flex flex-row'>
            <UserImage><Person/></UserImage>
            <UserDetails className="d-flex flex-column">
                <Name>{user.name}</Name>
                <AddressID>{user.email}</AddressID>
                <Gender>{user.gender}</Gender>
            </UserDetails>
            </div>
            <SaveButton href='#' className='text-white text-decoration-none '> <Done className="save-button-icon" /></SaveButton>
        </UserImageWrapper>

        <ProfileWrapper onSubmit={UpdateProfile} className='d-flex flex-column'>
            <NameWrapper className='profile-items my-1 d-flex flex-column flex-md-row'>
            <div className='mx-5 flex-fill'>
                <label htmlFor='firstName'>Name</label>
                <input className='form-control' value={user.name} placeholder='' name="Name"/>
            </div>
            <div  className='mx-5 flex-fill'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input type='tel' placeholder='' value={user.phoneNumber} className='form-control' name="phoneNumber"/>
            </div>
            </NameWrapper>
            <EmailPasswordWrapper className='profile-items my-3 d-flex flex-column flex-md-row'>
            <div  className='mx-5  flex-fill'>
                <label htmlFor='password'>Login Password</label>
                <input type='password' placeholder='******' className='form-control' name="password"/>
            </div>
            <div  className='mx-5  flex-fill'>
                <label htmlFor='password'>Sub Password</label>
                <input type='password' placeholder='**' maxLength='2'  className='form-control' name="subpassword"/>
            </div>
           
            </EmailPasswordWrapper>
        </ProfileWrapper>
    </Wrapper>
  )
}

export default ProfileView

const Wrapper = styled.div`
    height:  calc( 100vh - 70px );
    display:flex;
    flex-direction:column;
    width:80vw;
    background-color:white;
    border-left:3px solid white;
background:linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));

    `
const UserImageWrapper = styled.div`
 border-radius:1rem;
 background: linear-gradient(195deg,rgb(104 104 111),rgb(68 67 67));
`
const UserImage = styled.div``
const UserDetails = styled.div`` 
const Name = styled.h5`` 
const AddressID = styled.h6`` 
const ProfileWrapper = styled.form`
.profile-items{
    align-items:center;
    div input{
        margin-top:5px;
        background:transparent;
        border:2px solid white;
        color:white;
        
        ::placeholder{
            color:white;

        }
        :focus{
            outline:none;
            box-shadow:none;
            color:white;
        }
    }
}
` 
const NameWrapper = styled.div`` 
const EmailPasswordWrapper = styled.div`` 
const Gender = styled.i``
const SaveButton = styled.a`
    .save-button-icon{
        :hover{
            background:white;
            color:black;
            border-radius:5rem;
        }
    }
` 
