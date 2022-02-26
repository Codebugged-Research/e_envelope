import {React,useState} from 'react'
import styled from 'styled-components'
import { Modal, Container, Row, Button } from 'react-bootstrap'
import SignUpImage from './signup.jpeg'
import { useForm } from "react-hook-form";
import { Link, useNavigate  } from "react-router-dom";
import {loginValidate} from "../components/validation"


function LoginPage() { 
    const navigate  = useNavigate ();
    const [lgShow, setLgShow] = useState(false);
    const[error,setError] = useState({
        loginEmail:'',
        loginPassword:'',
        firstName:"",
        lastName:"",
        gender:"",
        phoneNumber:"",
        email:"",
        password:"",
        subPassword:"",
    })
    // LOGIN FUNCTIONALITIES
    const[loginForm, setLoginForm] = useState({
        loginEmail:'',
        loginPassword:'',
    });
    const HandleLoginInput = (e)=>{
        setLoginForm({...loginForm, [e.target.name]:e.target.value})
        // loginValidate();

    }
    const submitLoginForm = (e) => {
        e.preventDefault();
        let errors = loginValidate(loginForm).errors
        let isValid =  loginValidate(loginForm).isValid
        setError({...error, ['loginEmail']:errors.loginEmail, ['loginPassword']:errors.loginPassword })
        if(isValid){
            console.log("logged in",loginForm)
            navigate("/inbox")
        }
    }
    // SIGNUP FUNCTIONALITIES
    const[signUpForm, setSignUpForm] = useState({
        firstName:"",
        lastName:"",
        gender:"",
        phoneNumber:"",
        email:"",
        password:"",
        subPassword:"",
    });
    const HandleSignUpInput = (e)=>{
        setSignUpForm({...signUpForm, [e.target.name]:e.target.value})
    }
    const onSubmitSignup = (e) => {
        e.preventDefault();
        console.log(signUpForm);  
        navigate("/inbox")
    }  

  return (
        <Wrapper className='row col-12 vh-100'>
            <div className='col-12 col-md-6 col-lg-5 d-flex flex-column justify-content-center shadow'>
            <form id='loginForm' className='container text-center mx-1 px-5' onSubmit={submitLoginForm}>
            <h1 className='text-dark text-start'>Sign In</h1>
                <div>
                    <input placeholder='Email Address'
                    className='form-control mt-3 mb-1'
                    name='loginEmail'
                    value={loginForm.loginEmail}
                    onChange={HandleLoginInput}
                    type='text'/>
                    <p className='text-danger text-start fw-lighter f-13 m-0 fst-italic' >{error.loginEmail}</p>
                </div>
                <div>
                    <input placeholder='Password'
                        className='form-control mt-3 mb-1'
                        name='loginPassword'
                        value={loginForm.loginPassword}
                        onChange={HandleLoginInput}                    
                        type='password'/>
                        <p className='text-danger text-start fw-lighter f-13 m-0 mb-2 fst-italic' >{error.loginPassword}</p>
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
                        className='vh-100 modal-fullscreen-lg-down'
                    size="lg"
                    fullscreen="md-down"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    >

            <Row className='col-12 gx-0 radius-0'>
                            <div className='col-12 col-lg-5 d-none d-lg-block'>
                                <img src={SignUpImage} className="img-fluid w-100 d-block"/>
                            </div>
                    
                    <div className='col-12 col-lg-7'>
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <form id='signUpForm' onSubmit={onSubmitSignup} className='d-flex flex-column justify-content-center'>
                                <h1 className='text-center'>Lets get you Started!</h1>
                                <div className='d-flex flex-row justify-content-between align-items-center mx-2 my-3'>
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
                                <div className='d-flex flex-row justify-content-between align-items-center mx-2 my-3'>
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
                                <div className='d-flex flex-row justify-content-between align-items-center mx-2 my-3'>
                                    <div  className='mx-2'>
                                        <label htmlFor='password'>Password</label>
                                        <input type='password' onChange={HandleSignUpInput} placeholder='******' className='form-control' name="password"/>
                                    </div>
                                    <div  className='mx-2'>
                                        <label htmlFor='repeatPassword'> Sub Password </label>
                                        <input placeholder='******' onChange={HandleSignUpInput} type='password' maxLength='2' className='form-control' name="subPassword"/>
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-start align-items-start mx-2 my-1'>
                                <div className="form-check form-check-inline mx-2">
                                    <input className="form-check-input" onChange={HandleSignUpInput} type="radio" name="gender" id="inlineRadio1" value="male"/>
                                    <label className="form-check-label" for="inlineRadio1">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline mx-2">
                                    <input className="form-check-input" onChange={HandleSignUpInput} type="radio" name="gender" id="inlineRadio2" value="female"/>
                                    <label className="form-check-label" for="inlineRadio2">Female</label>
                                    </div>
                                </div>
                                <div className='d-flex flex-column justify-content-center align-items-start my-3 mx-2'>
                                {/* <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="showPassword"/>
                                    <label className="form-check-label" for="showPassword">
                                        Show Password
                                    </label>
                                    </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="loggedIn"  />
                                    <label className="form-check-label" for="loggedIn">
                                        Keep me logged in
                                    </label>
                                </div> */}
                                </div>
                                <div className='d-flex flex-row justify-content-start align-items-center my-3'>
                                <Button type="submit" className='btn-danger mx-3'>Sign Up</Button>
                                <div>Already have an account? <a href='' className='text-decoration-none' onClick={() => setLgShow(false)}>Sign In</a></div>
                                </div>
                                
                            </form>
                    
                    </div>
                </Row>
                </Modal>
            </div>
    
            <div className='col-md-6 col-lg-7 8 d-none d-md-block text-center'>
                    <h1>Logo Here</h1>
                    
            </div>
        </Wrapper>
    )
}

export default LoginPage

const Wrapper = styled.div`
`
