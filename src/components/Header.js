import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import Other from '../assets/other.jpeg';
import Male1 from '../assets/male1.png';
import Male2 from '../assets/male2.jpg';
import Female1 from '../assets/female1.png';
import Female2 from '../assets/female2.jpg';
import axios from 'axios';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
function Header() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [user, setUser] = useState({});
    const [userSearchList, setUserSearchList] = useState([]);
    const IMG = user.gender === "other" ? Other : (user.gender === 'male' ? (user.photoType === 1 ? Male1 : Male2) : (user.photoType === 1 ? Female1 : Female2));
    useEffect(() => {
        data();
    }, []);
    const data = () => {
        const res = JSON.parse(sessionStorage.getItem('user'))
        setUser(res);
    }
    const Logout = () => {
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('user', '');
        navigate('/')
    }
    const search = async (e) => {
        var value = e.target.value;
        var resp = await axios.post(`http://64.227.177.238/api/mail/searchquery`, { from: value, self: user.email },
            {
                headers: {
                    "x-access-token": token,
                },
            });
        var lis = [];
        resp.data.forEach(element => {
            lis.push({ "from": element.from, "to": element.to, "subject": element.subject, "body": element.body, "id": element._id });
        });
        setUserSearchList(lis);
    }
    return (
        <Wrapper>
            <LogoWrapper>
                <Logo><img src={logo} /></Logo>
                <Text className='text-dark d-none d-md-block'>E-Envelope</Text>
            </LogoWrapper>
            <SearchWrapper>
                <SearchBarWrapper className='text-dark mx-1 mx-md-3'>
                    <div style={{ width: "100%" }}>
                        <AutoComplete
                            id="autocompleteLocations"
                            options={userSearchList}
                            fullWidth
                            autoComplete="new-password"
                            getOptionLabel={option => option.from || ''}
                            renderOption={(option) => (
                                <div key={option._id}>
                                    <span style={{ display: 'block', textAlign: 'left' }}>{option.from}</span>
                                    <span style={{ display: 'block', textAlign: 'left', fontWeight: 'bold' }}>{'#'.repeat(option.subject.length)}</span>
                                </div>
                            )}
                            autoHighlight={false}
                            autoSelect={false}
                            clearOnEscape
                            onChange={(event, autocompleteValue) => {
                                console.log(autocompleteValue);
                                // jump to mail detail
                            }}
                            renderInput={params => <TextField {...params} label="" InputProps={{ ...params.InputProps, disableUnderline: true, className: "height: 40" }} size="small" className="" variant="filled" onChange={(e) => { search(e) }} />} />
                    </div>
                </SearchBarWrapper>
            </SearchWrapper>
            <UserWrapper>
                <AddressID className='text-dark d-none d-md-block'><span className='hashtag'>#</span>{sessionStorage.getItem('username')}<span className='EEcom'>EE.com</span></AddressID>
                <Link to='/profile' className='text-dark'><img src={IMG} className="img-item p-2 circle " /></Link>
                <ExitToAppIcon onClick={Logout} className='mx-2 p-0' />
            </UserWrapper>
        </Wrapper>
    )
}

export default Header

const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;    
    height:70px;
    width:100%;
    border-bottom:1px solid lightgray;
`
const LogoWrapper = styled.div`
    display:flex;    
    flex-direction:row;
    justify-content:center;
    align-items:center;
    .MuiSvgIcon-root{
        margin:0px 20px;
    }
    
`
const Logo = styled.div`
    display:grid;    
    img{
        width: 50px;
        height: 50px;
    }
`
// const MenuIcon = styled.div`
//     display:grid;    
// `
const Text = styled.div`
    color: darkgrey;
    font-weight:600;
    font-size:1.5rem;
`
const SearchWrapper = styled.div`
    flex-grow:2;
    display:flex;  
    
`


const SearchBarWrapper = styled.div`
    display:flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    // margin: 0px 30px;
    padding:5px;
    // background:linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));

    border-radius:5px;

    .MuiSvgIcon-root{
        margin-right:20px;
        margin-left:20px;
        cursor:pointer;
    }

    input{
        width:100%;
        height:30px;
        background:none;
        padding:5px;
        border:none;
        font-size:18px;
        color:black;
        :focus{
            outline:none;
        }
        ::placeholder{
            color:white;
        }
    }
`
// const SearchIconW = styled.div`
// display:grid;    
// `


const UserWrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:start;
    align-items:center;
    .MuiSvgIcon-root{
        // margin-right:20px;
        padding-right:5px;
        margin-left:10px;
    }
    
`


const AddressID = styled.div`
    color:darkgray;
    font-size:1rem;   
`