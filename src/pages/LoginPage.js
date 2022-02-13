import React from 'react'
import styled from 'styled-components'
import { Container, Row, Button } from 'react-bootstrap'


function LoginPage() {
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
                <a className='text-primary float-end text-decoration-none'>
                    Create an account?
                </a>
            </form>
            </div>
            <div className='col-8 text-center'>
                    <h1>Logo Here</h1>
            </div>
        </Row>
    )
}

export default LoginPage
