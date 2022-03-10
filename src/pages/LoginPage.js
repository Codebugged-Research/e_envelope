import {React,useState} from 'react'
import styled from 'styled-components'
import { Modal, Container, Row, Button, Alert } from 'react-bootstrap'
import SignUpImage from '../assets/logo.png'
import Logo from '../assets/logo.png'
import { Link, useNavigate  } from "react-router-dom";
import {loginValidate, SignUpValidate} from "../components/validation"
import axios from "axios";
import Male1 from '../assets/male1.png'
import Male2 from '../assets/male2.jpg'
import Female1 from '../assets/female1.png'
import Female2 from '../assets/female2.jpg'
import CloseIcon from '@material-ui/icons/Close';
import PasswordChecklist from "react-password-checklist"

axios.defaults.baseURL = 'https://electronic-envelope.com/';

function LoginPage() { 
    const navigate  = useNavigate ();
    let userObject = sessionStorage.getItem('user')
    let token = sessionStorage.getItem('token')
    if (userObject && token)
        navigate('/inbox/')
    const [lgShow, setLgShow] = useState(false);
    const[error,setError] = useState({
        loginEmail:'',
        loginPassword:'',
        firstName:"",
        lastName:"",
        gender:"",
        phoneNumber:"",
        email:"",
        password:false,
        subPassword:false,
        LoginAuthentication:false,
        SignupAuthentication:false,
    })
    // password.includes(x)
    const checkSubPassword = (pwd)=>{
        let valid = true;
        if(pwd.length<2)
            valid=false
        for (let i in pwd) {
            if(!signUpForm.password.includes(pwd[i]))
            {
                valid = false
          }  }
        if(valid)
            setError({...error, subPassword:true})
        else
            setError({...error, subPassword:false})

    }
    // LOGIN FUNCTIONALITIES
    const[loginForm, setLoginForm] = useState({
        loginEmail:'',
        loginPassword:'',
    });
    const HandleLoginInput = (e)=>{
        setLoginForm({...loginForm, [e.target.name]:e.target.value})
    }
    const submitLoginForm = async (e) => {
        e.preventDefault();
        let errors = loginValidate(loginForm).errors
        let isValid =  loginValidate(loginForm).isValid
        setError({...error, ['loginEmail']:errors.loginEmail, ['loginPassword']:errors.loginPassword })
        if(isValid){
            await axios.post('api/auth/login',
             {"email":loginForm.loginEmail, "password":loginForm.loginPassword})
             .then(response => {
                console.log(response)
                setError({...error, ['LoginAuthentication']:false})
                 sessionStorage.setItem('token', response.data.token)
                 sessionStorage.setItem('SubPassword', false)
                 sessionStorage.setItem('time', new Date().getTime())
                 sessionStorage.setItem('user', JSON.stringify(response.data.user))
                 let username = response.data.user.email.substring(1,response.data.user.email.length-6)
                 sessionStorage.setItem('username', username)
                 console.log(response)
                 navigate("/inbox")
             })
             .catch(err => setError({...error, ['LoginAuthentication']:true}))
        }
    }
    // SIGNUP FUNCTIONALITIES
    const [email, setEmail] = useState('')
    const[signUpForm, setSignUpForm] = useState({
        name:"",
        username:"",
        gender:"",
        photoType:0,
        phoneNumber:"",
        email:"",
        password:"",
        subPassword:"",
    });
    const HandleSignUpInput = (e)=>{
        console.log(signUpForm)
        setSignUpForm({...signUpForm, [e.target.name]:e.target.value})
        if(e.target.name==="subPassword")
            checkSubPassword(e.target.value)
        else
            checkSubPassword(signUpForm.subPassword)
    }
    const HandleUsernameInput = (e)=>{
        setSignUpForm({...signUpForm, [e.target.name]:e.target.value})
    }
    const onSubmitSignup = async (e) => {
        e.preventDefault();
        let data = {  
        "email":email,
        "password":signUpForm.password,
        "name":signUpForm.name,
        "gender":signUpForm.gender,
        "phone":signUpForm.phoneNumber,
        "subpassword":signUpForm.subPassword,
        "photoType":signUpForm.photoType
    }
    console.log(data)
    let isValid = SignUpValidate(data);
    console.log(isValid,error.password,error.subPassword,signUpForm.password,signUpForm.subPassword)
    if(isValid && error.password && signUpForm.password && error.subPassword && signUpForm.subPassword){
        await axios.post('api/auth/signup',
             data).then(response => {
                setError({...error, ['SignupAuthentication']:false})
                 console.log(response)
                 sessionStorage.setItem('token', response.data.token)
                 sessionStorage.setItem('user', JSON.stringify(response.data.user))
                 sessionStorage.setItem('SubPassword', false)
                 sessionStorage.setItem('time', new Date().getTime())
                 let username = response.data.user.email.substring(1,response.data.user.email.length-6)
                 sessionStorage.setItem('username', username)
                 console.log(response)
                 navigate("/inbox")

                })
             .catch(err => {
                 setError({...error, ['SignupAuthentication']:true})
             })
    }
    else {setError({...error, ['SignupAuthentication']:true})
}       
}

  return (
        <Wrapper className='row col-12 vh-100'>
            <div className='col-12 col-md-6 col-lg-5 d-flex flex-column justify-content-center shadow'>
                <div className='d-flex flex-row justify-content-center align-items-center my-4'>
                    <img src={Logo} className="img-fluid d-block img-50 "/>
                    <div>
                    <h3>E-envelope</h3>
                    <p><i>Simpler, Safer, Secure Mail Service</i></p>

                    </div>
                </div>
            <form id='loginForm' className='container text-center mx-1 px-5' onSubmit={submitLoginForm}>
            <h1 className='text-dark text-start'>Sign In</h1>
            {error.LoginAuthentication?<Alert variant='danger' className='p-2'>Unauthorised</Alert>:""}

                <div>
                    <input placeholder='Email Address'
                    autoComplete="new-password"
                    className='form-control mt-3 mb-1'
                    name='loginEmail'
                    value={loginForm.loginEmail}
                    onChange={HandleLoginInput}
                    type='text'/>
                    <p className='text-danger text-start fw-lighter f-13 m-0 fst-italic' >{error.loginEmail}</p>
                </div>
                <div>
                    <input autoComplete="new-password" placeholder='Password'
                        className='form-control mt-3 mb-1'
                        name='loginPassword'
                        value={loginForm.loginPassword}
                        onChange={HandleLoginInput}                    
                        type='password'/>
                        <p className='text-danger text-start fw-lighter f-13 m-0 mb-2 fst-italic' >{error.loginPassword}</p>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <Button type="submit" className="btn-dark">Sign In</Button>
                
                    <Link to='/forget' className='text-decoration-none'>Forget Password</Link>
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
                                <img src={SignUpImage} className="my-5rem w-100 img-fluid d-block"/>
                            </div>
                    
                    <div className='col-12 col-lg-7'>
                            <Modal.Header closeButton>

                            </Modal.Header>
                            <form id='signUpForm' onSubmit={onSubmitSignup} className='d-flex flex-column justify-content-center'>
                                <h1 className='text-center'>Lets get you Started!</h1>
            {error.SignupAuthentication?<Alert variant='danger' className='p-2 text-center'>Please Enter Valid Details To Sign Up</Alert>:""}
                                
                                <div className='d-flex flex-row justify-content-between align-items-center mx-2 my-3'>
                                    <div className='mx-2'>
                                        <label htmlFor='name'>Name</label>
                                        <input autoComplete="new-password"  className='form-control'
                                        onChange={HandleSignUpInput}
                                        placeholder='john' name="name"/>
                                    </div>
                                    <div  className='mx-2'>
                                        <label htmlFor='phoneNumber'>Phone Number</label>
                                        <input autoComplete="new-password" placeholder='7007918XXX' onChange={HandleSignUpInput} type='tel' className='form-control' name="phoneNumber"/>
                                    </div>
                                    
                                </div>
                                <div className='d-flex flex-row justify-content-between align-items-center mx-2 my-3'>
                                <div  className='mx-2'>
                                        <label htmlFor='username'>Username</label>
                                        <input autoComplete="new-password" placeholder='username'
                                        onChange={ e=>setEmail('#'+e.target.value+'EE.com')}
                                        className='form-control' name="username"/>
                                        <div className='my-1 fw-12'>  {email!=='#EE.com'? "Email:"+ email:''}</div>
                                    </div>
                                    <div  className='mx-2'>
                                        <label htmlFor='repeatPassword'> Sub Password </label>
                                        <input placeholder='******' autoComplete="new-password" onChange={HandleSignUpInput} type='password' maxLength='2' className='form-control' name="subPassword"/>
                                        {error.subPassword?'':<span className='text-danger fw-10'><CloseIcon/> Sub Password Invalid eg. v@, vk, v3</span>}
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-between align-items-center mx-2 my-3'>
                                    <div  className='mx-2'>
                                        <label htmlFor='password'>Password</label>
                                        <input type='password' autoComplete="new-password" onChange={HandleSignUpInput} placeholder='eg. Vivek@1234' className='form-control' name="password"/>
                                        <PasswordChecklist
                                            rules={["minLength","specialChar","number","capital","lowercase"]}
                                            minLength={6}
                                            value={signUpForm.password}
                                            onChange={(isValid) => {
                                                if (isValid)
                                                    setError({...error, password:true})
                                                else
                                                    setError({...error, password:false})
                                               }}
                                        />
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-start align-items-start mx-2 my-1'>
                                <div className="form-check form-check-inline mx-2">
                                    <input className="form-check-input" onChange={HandleSignUpInput} type="radio" name="gender" id="male" value="male"/>
                                    <label className="form-check-label" for="inlineRadio1">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline mx-2">
                                    <input className="form-check-input" onChange={HandleSignUpInput} type="radio" name="gender" id="female" value="female"/>
                                    <label className="form-check-label" for="inlineRadio2">Female</label>
                                    </div>
                                    <div className="form-check form-check-inline mx-2">
                                    <input className="form-check-input" onChange={HandleSignUpInput} type="radio" name="gender" id="other" value="other"/>
                                    <label className="form-check-label" for="inlineRadio2">Other</label>
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-start align-items-start my-3 mx-2'>
                                    {signUpForm.gender==='male' || signUpForm.gender==='female' ?<>
                                    <div className='d-flex flex-column justify-content-center align-items-center'> 
                                        <img src={signUpForm.gender==='male'? Male1 : Female1} className="img-item" />
                                        <div>
                                        <input className="form-check-input mx-1" onChange={HandleSignUpInput} type="radio" name="photoType" id="gender-dp-casual" value={1}/>
                                        <label> Formal </label>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column justify-content-center align-items-center mx-2'>
                                        <img src={signUpForm.gender==='male'? Male2 : Female2} className="img-item" />
                                        <div>
                                        <input className="form-check-input mx-1" onChange={HandleSignUpInput} type="radio" name="photoType" id="gender-dp-formal" value={2}/>
                                        <label> Casual </label>
                                        </div>
                                    </div>
                                    </>:null}
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
    
            <div className='col-md-6 col-lg-7 8 d-none d-md-flex flex-row justify-content-center align-items-center'>
                    <img src={Logo} className="img-fluid d-block w-75" />
            </div>
        </Wrapper>
    )
}

export default LoginPage

const Wrapper = styled.div`
`
