import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Person, Done } from '@material-ui/icons';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Other from '../assets/other.jpeg'
import Male1 from '../assets/male1.png'
import Male2 from '../assets/male2.jpg'
import Female1 from '../assets/female1.png'
import Female2 from '../assets/female2.jpg'

const ProfileView = () => {
    const navigate = useNavigate();
    const res = JSON.parse(sessionStorage.getItem('user'))
    const token = sessionStorage.getItem('token')
    const IMG = res.gender==="other" ? Other:(res.gender === 'male' ? (res.photoType===1?Male1:Male2):(res.photoType===1?Female1:Female2))
    const [profile, setProfile] = useState({
        email:res.email,
        name:res.name,
        phone:res.phone,
        password:'',
        subpassword:'',
        timmer:res.timmer,
    });
    const UpdateProfile = async (e) => {
        e.preventDefault();
        const dataObj = {
            email:profile.email,
            name:profile.name,
            phone:profile.phone,
            timmer:profile.timmer
        }
        if (profile.password!=='')
            dataObj.password = profile.password
        if (profile.subpassword!=='')
            dataObj.subpassword = profile.subpassword
        const newProfileData = await axios.put(axios.defaults.baseURL+`api/user/update/${user._id}`, dataObj, {"headers":{ 
            "x-access-token": token
          }})
          const newUser = JSON.parse(sessionStorage.getItem('user'));
          newUser.name = dataObj.name;
          newUser.phone = dataObj.phone;
          newUser.timmer = dataObj.timmer;
          sessionStorage.setItem('user', JSON.stringify(newUser));
          navigate('/profile');
          window.location.reload();
          console.log(newProfileData)
    }

    const HandleInput = (e) => {
        setProfile({...profile, [e.target.name]:e.target.value})
        console.log(profile)
    }

    const [user,setUser] = useState({});
    useEffect(() => {
        data();
    }, [])
    const data = () => {
        const res = JSON.parse(sessionStorage.getItem('user'))
        setUser(res);
        console.log(res)
        }

  return (
    <Wrapper className='container text-white'>
        <UserImageWrapper className="container d-flex flex-row justify-content-between shadow p-4 my-4">
            <div className='d-flex flex-row'>
            <UserImage>
                <img src={IMG} className="img-item mx-3 my-3 circle" />
                </UserImage>
            <UserDetails className="d-flex flex-column">
                <Name>{user.name}</Name>
                <AddressID>{user.email}</AddressID>
                <Gender>{user.gender}</Gender>
            </UserDetails>
            </div>
            <SaveButton href='#' type='submit' className='text-white text-decoration-none ' onClick={UpdateProfile} form='profile-form'> <Done className="save-button-icon" /></SaveButton>
        </UserImageWrapper>

        <ProfileWrapper id='profile-form' onSubmit={UpdateProfile} className='d-flex flex-column'>
            <NameWrapper className='profile-items my-1 d-flex flex-column flex-md-row'>
            <div className='mx-5 flex-fill'>
                <label htmlFor='firstName'>Name</label>
                <input className='form-control' onChange={HandleInput} value={profile.name} placeholder='' name="name"/>
            </div>
            <div  className='mx-5 flex-fill'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input type='tel' placeholder='' onChange={HandleInput} value={profile.phone} className='form-control' name="phone"/>
            </div>
            </NameWrapper>
            <EmailPasswordWrapper className='profile-items my-3 d-flex flex-column flex-md-row'>
            <div  className='mx-5  flex-fill'>
                <label htmlFor='password'>Login Password</label>
                <input type='password' placeholder='******' onChange={HandleInput} className='form-control' name="password"/>
            </div>
            <div  className='mx-5  flex-fill'>
                <label htmlFor='password'>Sub Password</label>
                <input type='password' placeholder='**' maxLength='2' onChange={HandleInput}  className='form-control' name="subpassword"/>
            </div>
            </EmailPasswordWrapper>
            <h6 className="form-check form-check-inline mx-5">Sub Password Activate Timer</h6>
            <div className='profile-items my-3 d-flex flex-column flex-md-row'>
                <div className="form-check form-check-inline mx-5">
                <input className="form-check-input" checked={profile.timmer==2} onChange={HandleInput} type="radio" name="timmer" id="2min" value={2}/>
                <label className="form-check-label" htmlFor="2min">2 minute</label>
                </div>
                <div className="form-check form-check-inline mx-5">
                <input className="form-check-input" checked={profile.timmer==5} onChange={HandleInput} type="radio" name="timmer" id="5min" value={5}/>
                <label className="form-check-label" htmlFor="5min">5 minute</label>
                </div>
            </div>
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
