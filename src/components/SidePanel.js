import Search from '@material-ui/icons/Search'
import React from 'react'
import styled from 'styled-components'
import sidebarItems from '../data/sidebarItems'
import CreateIcon from '@material-ui/icons/Create';

function SidePanel() {
  return (
    <Wrapper>
        <ComposeLetter>
            <CreateIcon/>
            Compose 
        </ComposeLetter>
        <SidebarButtonWrapper>
            {sidebarItems.map(item => (
                <SidebarButtonItem>{item.icon} {item.text}</SidebarButtonItem>
            ))}
        </SidebarButtonWrapper>

    </Wrapper>
  )
}

export default SidePanel

const Wrapper = styled.div`
    height:  calc( 100vh - 70px );
    display:flex;
    flex-direction:column;
    width:20%;
    background-color:lightgray;
    border-left:1px solid darkgray;
    `

const ComposeLetter = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin:10px 10px;
    font-size:18px;
    padding:10px 10px;
    border-bottom: 3px solid white;
    .MuiSvgIcon-root{
        margin:0px 10px;
    }
    :hover{
        font-size:20px;
        background-color:white;
    }
`

const SidebarButtonWrapper = styled.div`
display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const SidebarButtonItem = styled.div`
    display:flex;
    flex-direction:row;
    margin:10px 10px;
    font-size:18px;
    border-radius:0.5rem;
    background-color:lightgray;
    padding:5px 10px;
    .MuiSvgIcon-root{
        margin:0px 10px;
    }
    :hover{
        background-color:white;
    }
`

