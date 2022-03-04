import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
function Header() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    if (!token) {
        navigate('/');
    }
    const [user, setUser] = useState({});
    const [userSearchList, setUserList] = useState([]);
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
    const search = async (value) => {
        var resp = await axios.get(`http://64.227.177.238/api/user/search/${value}`,
            {
                headers: {
                    "x-access-token": token,
                },
            });
        setUserList(resp.data);
    }

    const handleOnSearch = (string, results) => {
        search(string);
    }

    const handleOnHover = (result) => {
        // the item hovered
        // console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item);
    }

    const handleOnFocus = () => {
        // console.log('Focused')
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>id: {item.email}</span>
            </>
        )
    }


    return (
        <Wrapper>
            <LogoWrapper>
                <Logo><EmailIcon /></Logo>
                <Text className='text-dark d-none d-md-block'>E-Envelope</Text>
            </LogoWrapper>
            <SearchWrapper>
                <SearchBarWrapper className='text-dark mx-1 mx-md-3'>
                    <div style={{ width: "100%" }}>
                        <ReactSearchAutocomplete
                            items={userSearchList}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus
                            formatResult={formatResult}
                        />
                    </div>
                </SearchBarWrapper>
            </SearchWrapper>
            <UserWrapper>
                <AddressID className='text-dark d-none d-md-block'>{user.email}</AddressID>
                <Link to='/profile' className='text-dark'><PersonIcon className="mx-2 p-0" /></Link>
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

    .MuiSvgIcon-root{
        margin:0px 20px;
    }
    
`
const Logo = styled.div`
    display:grid;    
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