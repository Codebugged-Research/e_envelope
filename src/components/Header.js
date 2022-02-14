import React from 'react'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';

function Header() {
  return (
    <Wrapper>
        <LogoWrapper>
            <Logo><MenuIcon/></Logo>
            <Text>E-Envelope</Text>
        </LogoWrapper>
        <SearchWrapper>
            <SearchBarWrapper>
                <SearchIcon/>
                <input placeholder='Search envelopes'/>
            </SearchBarWrapper>
        </SearchWrapper>
        <UserWrapper>
            <AddressID>UsernameEE.com</AddressID>
            <PersonIcon/>
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
    margin: 0px 30px;
    padding:5px;
    background-color:lightgray;
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
        :focus{
            outline:none;
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
        margin-right:20px;
        margin-left:20px;
    }
    
`


const AddressID = styled.div`
    color:darkgray;
    font-size:1rem;   
`