import {React,useState} from 'react'
import styled from 'styled-components'
import { Modal, Container, Row, Button } from 'react-bootstrap'


function LoginPage() {
    const [lgShow, setLgShow] = useState(false);


  return (
        <Row className=' col-12 vh-100'>
            <div className='col-4 d-flex flex-column justify-content-center shadow'>
            <form className='container text-center mx-1 px-5'>
            <h1 className='text-dark text-start'>Sign In</h1>
                <div>
                    <input placeholder='Username' className='form-control my-3' type='text'/>
                </div>
                <div>
                    <input placeholder='Password' className='form-control my-3' type='password'/>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <Button className="btn-dark">Sign In</Button>
                    <a href='#' className='text-decoration-none'>Forget Password</a>
                </div>
                <a className='text-primary float-end text-decoration-none' onClick={() => setLgShow(true)}>
                    Create an account?
                </a>
            </form>
            <Modal 
            className='vh-100 '
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >

            <Row className='col-12 '>
                <div className='col-5 shadow '></div>
          
          <div className='col-7'>
                 <Modal.Header closeButton>
                  </Modal.Header>
                <form className='d-flex flex-column justify-content-center'>
                    <h1>Lets get you Started!</h1>
                    <div className='d-flex flex-row justify-content-between align-items-center  my-3'>
                        <div className='mx-2'>
                            <label htmlFor='firstName'>First Name</label>
                            <input className='form-control' placeholder='john' name="firstName"/>
                        </div>
                        <div  className='mx-2'>
                            <label htmlFor='lastName'>Last Name</label>
                            <input placeholder='john' className='form-control' name="lastName"/>
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center my-3'>
                        <div  className='mx-2'>
                            <label htmlFor='email'>Email Address</label>
                            <input type='email' placeholder='john' className='form-control' name="email"/>
                        </div>
                        <div  className='mx-2'>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input placeholder='7007918XXX' type='tel' className='form-control' name="phoneNumber"/>
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center my-3'>
                        <div  className='mx-2'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='******' className='form-control' name="password"/>
                        </div>
                        <div  className='mx-2'>
                            <label htmlFor='repeatPassword'> Repeat Password </label>
                            <input placeholder='******' type='password' className='form-control' name="repeatPassword"/>
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center my-3'>
                      {/* checkboxes */}
                    </div>
                    <div className='d-flex flex-row justify-content-start align-items-center my-3'>
                    <Button className='btn-danger mx-3'>Sign Up</Button>
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
        </Row>
    )
}

export default LoginPage

