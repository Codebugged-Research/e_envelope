import {React,useState} from 'react'
import styled from 'styled-components'
import { Modal, Container, Row, Button } from 'react-bootstrap'
import SignUpImage from './signup.jpeg'
import { useForm } from "react-hook-form";
import { Link, useNavigate  } from "react-router-dom";



function LoginPage() {
    const navigate  = useNavigate ();
    const onSubmitSignup = (e) => {
        e.preventDefault();
        console.log(signUpForm);  
        navigate("/inbox")
    }  

    const [lgShow, setLgShow] = useState(false);

    const[loginUsername, setLoginUsername] = useState("");
    const[loginPassword, setLoginPassword] = useState("");

    const submitLoginForm = (e)=>{
        console.log("logged in")
        e.preventDefault();
        const newLoginEntry = {
            username:loginUsername,
            password:loginPassword
        };
        console.log(newLoginEntry)
        navigate("/inbox")
    }

    const[signUpForm, setSignUpForm] = useState({
        firstName:"",
        lastName:"",
        gender:"",
        phoneNumber:"",
        email:"",
        password:"",
        repeatPassword:"",
    });
        let name,value;
    const HandleSignUpInput = (e)=>{
        name = e.target.name;
        value = e.target.value;
        setSignUpForm({...signUpForm, [name]:value})
    }

  return (
        <Wrapper className='row col-12 vh-100'>
            <div className='col-4 d-flex flex-column justify-content-center shadow'>
            <form id='loginForm' className='container text-center mx-1 px-5' onSubmit={submitLoginForm}>
            <h1 className='text-dark text-start'>Sign In</h1>
                <div>
                    <input placeholder='Username'
                    className='form-control my-3'
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    type='text'/>
                </div>
                <div>
                    <input placeholder='Password'
                        className='form-control my-3'
                        value={loginPassword} 
                        onChange={(e) => setLoginPassword(e.target.value)}                    
                        type='password'/>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <Button type="submit" className="btn-dark">Sign In</Button>
                    <a href='#' className='text-decoration-none'>Forget Password</a>
                </div>
                <a className='text-primary float-end text-decoration-none' onClick={() => setLgShow(true)}>
                    Create an account?
                </a>
            </form>
                 <Modal 
                        className='vh-100'
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    >

            <Row className='col-12 radius-0'>
                            <div className='col-5 shadow '>
                                <img src={SignUpImage} className="img-fluid w-100 d-block"/>
                            </div>
                    
                    <div className='col-7'>
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <form id='signUpForm' onSubmit={onSubmitSignup} className='d-flex flex-column justify-content-center'>
                                <h1>Lets get you Started!</h1>
                                <div className='d-flex flex-row justify-content-between align-items-center  my-3'>
                                    <div className='mx-2'>
                                        <label htmlFor='firstName'>First Name</label>
                                        <input className='form-control'
                                        onChange={HandleSignUpInput}
                                        placeholder='john' name="firstName"/>
                                    </div>
                                    <div  className='mx-2'>
                                        <label htmlFor='lastName'>Last Name</label>
                                        <input placeholder='john'
                                        onChange={HandleSignUpInput}
                                        className='form-control' name="lastName"/>
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-between align-items-center my-3'>
                                    <div  className='mx-2'>
                                        <label htmlFor='email'>Email Address</label>
                                        <input type='email'
                                        onChange={HandleSignUpInput} placeholder='john' className='form-control' name="email"/>
                                    </div>
                                    <div  className='mx-2'>
                                        <label htmlFor='phoneNumber'>Phone Number</label>
                                        <input placeholder='7007918XXX' onChange={HandleSignUpInput} type='tel' className='form-control' name="phoneNumber"/>
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-between align-items-center my-3'>
                                    <div  className='mx-2'>
                                        <label htmlFor='password'>Password</label>
                                        <input type='password' onChange={HandleSignUpInput} placeholder='******' className='form-control' name="password"/>
                                    </div>
                                    <div  className='mx-2'>
                                        <label htmlFor='repeatPassword'> Repeat Password </label>
                                        <input placeholder='******' onChange={HandleSignUpInput} type='password' className='form-control' name="repeatPassword"/>
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-start align-items-start my-1'>
                                <div class="form-check form-check-inline mx-2">
                                    <input class="form-check-input" onChange={HandleSignUpInput} type="radio" name="gender" id="inlineRadio1" value="male"/>
                                    <label class="form-check-label" for="inlineRadio1">Male</label>
                                    </div>
                                    <div class="form-check form-check-inline mx-2">
                                    <input class="form-check-input" onChange={HandleSignUpInput} type="radio" name="gender" id="inlineRadio2" value="female"/>
                                    <label class="form-check-label" for="inlineRadio2">Female</label>
                                    </div>
                                </div>
                                <div className='d-flex flex-column justify-content-center align-items-start my-3 mx-2'>
                                {/* <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="showPassword"/>
                                    <label class="form-check-label" for="showPassword">
                                        Show Password
                                    </label>
                                    </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="loggedIn"  />
                                    <label class="form-check-label" for="loggedIn">
                                        Keep me logged in
                                    </label>
                                </div> */}
                                </div>
                                <div className='d-flex flex-row justify-content-start align-items-center my-3'>
                                <Button type="submit" className='btn-danger mx-3'>Sign Up</Button>
                                <div>Already have an account? <a href="#">Sign In</a></div>
                                </div>
                                
                            </form>
                    
                    </div>
                </Row>
                </Modal>
            </div>
    
            <div className='col-8 text-center'>
                    <h1>Logo Here</h1>
                    
            </div>
        </Wrapper>
    )
}

export default LoginPage

const Wrapper = styled.div`
`
